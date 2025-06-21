from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import joblib
import os

app = Flask(__name__)

MODEL_PATH = "quantized_model_dynamic_range.tflite"
SCALER_PATH = "scaler.pkl"
MAJORS_DATA_PATH = "majors (1).csv"
UNIVERSITIES_DATA_PATH = "universities (1).csv"

tflite_interpreter = None 
input_details = None
output_details = None
scaler = None
major_univ = None
resources_loaded_successfully = False 

# --- Fungsi Pemuatan Sumber Daya ---
def load_resources():
    global tflite_interpreter, input_details, output_details, scaler, major_univ, resources_loaded_successfully
    
    print("Mencoba memuat sumber daya...")

    # Memuat Model TensorFlow Lite
    if not os.path.exists(MODEL_PATH):
        print(f"ERROR: Model '{MODEL_PATH}' tidak ditemukan.")
        raise FileNotFoundError(f"Model '{MODEL_PATH}' tidak ditemukan. Pastikan ada di folder 'model/'.")
    try:

        tflite_interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
        tflite_interpreter.allocate_tensors()
        
        # Dapatkan detail input dan output
        input_details = tflite_interpreter.get_input_details()
        output_details = tflite_interpreter.get_output_details()

        print(f"Model TFLite berhasil dimuat dari {MODEL_PATH}")
        

    except Exception as e:
        print(f"ERROR: Gagal memuat model TFLite dari {MODEL_PATH}: {e}")
        raise Exception(f"Gagal memuat model TFLite dari {MODEL_PATH}: {e}")

    # Memuat Scaler
    if not os.path.exists(SCALER_PATH):
        print(f"ERROR: Scaler '{SCALER_PATH}' tidak ditemukan.")
        raise FileNotFoundError(f"Scaler '{SCALER_PATH}' tidak ditemukan. Pastikan ada di folder 'model/'.")
    try:
        scaler = joblib.load(SCALER_PATH)
        print(f"Scaler berhasil dimuat dari {SCALER_PATH}")
    except Exception as e:
        print(f"ERROR: Gagal memuat scaler dari {SCALER_PATH}: {e}")
        raise Exception(f"Gagal memuat scaler dari {SCALER_PATH}: {e}")

    # Memuat Data Major dan Univ
    if not os.path.exists(MAJORS_DATA_PATH) or not os.path.exists(UNIVERSITIES_DATA_PATH):
        print(f"ERROR: File data '{MAJORS_DATA_PATH}' atau '{UNIVERSITIES_DATA_PATH}' tidak ditemukan.")
        raise FileNotFoundError(f"File data '{MAJORS_DATA_PATH}' atau '{UNIVERSITIES_DATA_PATH}' tidak ditemukan. Pastikan ada di folder 'data/'.")
    try:
        major_df = pd.read_csv(MAJORS_DATA_PATH, index_col=0)
        univ_df = pd.read_csv(UNIVERSITIES_DATA_PATH, index_col=0)

        # Normalisasi dan pemetaan tipe (sesuai streamlit)
        major_df['type'] = major_df['type'].astype(str).str.lower().str.strip()
        major_df['type'] = major_df['type'].replace({'saintek': 'science', 'soshum': 'humanities'})
        
        # Gunakan .astype(int) untuk memastikan tipe data integer
        major_df['utbk_capacity'] = (0.4 * major_df['capacity']).astype(int) 
        major_df['passed_count'] = 0 
        major_univ = pd.merge(major_df, univ_df, on='id_university', how='left')
        major_univ.set_index('id_major', inplace=True)
        print(f"Data jurusan dan universitas berhasil dimuat.")
        resources_loaded_successfully = True 
    except Exception as e:
        print(f"ERROR: Gagal memuat atau memproses data jurusan/universitas: {e}")
        raise Exception(f"Gagal memuat atau memproses data jurusan/universitas: {e}")

# Panggil fungsi load_resources
try:
    load_resources()
except Exception as e:
    print(f"Server tidak dapat memulai sepenuhnya karena kesalahan: {e}")
    
# --- Endpoint Utama ---
@app.route('/')
def home():
    if not resources_loaded_successfully:
        return "API Rekomendasi Jurusan UTBK: Gagal memuat sumber daya awal. Periksa log server.", 500
    return "API Rekomendasi Jurusan UTBK sedang berjalan!"

# --- Endpoint Prediksi/Rekomendasi ---
@app.route('/recommend', methods=['POST'])
def recommend():
    # Cek apakah semua sumber daya sudah dimuat dengan sukses
    if not resources_loaded_successfully:
        return jsonify({"error": "Sumber daya awal (model, scaler, data) gagal dimuat. Periksa log server."}), 500

    try:
        # Menerima data JSON dari permintaan POST
        data = request.get_json(force=True)

        # Validasi input dasar
        required_keys = ['scores', 'test_type']
        for key in required_keys:
            if key not in data:
                return jsonify({"error": f"Kunci '{key}' hilang dari input JSON."}), 400
        
        input_scores = data['scores']
        student_test_type_str = data['test_type'].lower().strip() # 'science' atau 'humanities'

        # Validasi skor TPS
        tps_keys = ['score_kpu', 'score_kua', 'score_ppu', 'score_kmb']
        for key in tps_keys:
            if key not in input_scores:
                return jsonify({"error": f"Kunci '{key}' hilang dari skor TPS."}), 400
            # Pastikan skor adalah numerik
            if not isinstance(input_scores[key], (int, float)):
                return jsonify({"error": f"Nilai '{key}' harus berupa angka."}), 400
        
        # Hitung skor rata-rata berdasarkan input
        general_score_rec = np.mean([
            input_scores['score_kpu'], 
            input_scores['score_kua'], 
            input_scores['score_ppu'], 
            input_scores['score_kmb']
        ])
        
        specialize_score_rec = 0.0 
        tka_scores = []
        if student_test_type_str == 'science':
            tka_keys = ['score_mat_tka', 'score_fis', 'score_kim', 'score_bio']
            for key in tka_keys:
                if key not in input_scores: return jsonify({"error": f"Kunci '{key}' hilang dari skor TKA Saintek."}), 400
                if not isinstance(input_scores[key], (int, float)): return jsonify({"error": f"Nilai '{key}' harus berupa angka."}), 400
                tka_scores.append(input_scores[key])
            specialize_score_rec = np.mean(tka_scores)
            
        elif student_test_type_str == 'humanities':
            tka_keys = ['score_mat_tka', 'score_geo', 'score_sej', 'score_sos', 'score_eko']
            for key in tka_keys:
                if key not in input_scores: return jsonify({"error": f"Kunci '{key}' hilang dari skor TKA Soshum."}), 400
                if not isinstance(input_scores[key], (int, float)): return jsonify({"error": f"Nilai '{key}' harus berupa angka."}), 400
                tka_scores.append(input_scores[key])
            specialize_score_rec = np.mean(tka_scores)
        else:
            return jsonify({"error": "Tipe tes tidak valid. Harus 'science' atau 'humanities'."}), 400

        all_scores_flat = list(input_scores.values())
        score_mean_rec = np.mean(all_scores_flat)

        test_type_encoded = 0 if student_test_type_str == 'science' else 1

        recommendations = []
        # Filter jurusan berdasarkan tipe tes siswa
        filtered_majors = major_univ[major_univ['type'] == student_test_type_str].copy()

        if filtered_majors.empty:
            return jsonify({"message": f"Tidak ada jurusan '{student_test_type_str}' yang ditemukan di dataset untuk direkomendasikan."}), 200
        
        # Iterasi dan prediksi untuk setiap jurusan yang cocok
        for index, row in filtered_majors.iterrows():
            id_major_candidate = index
            id_university_candidate = row['id_university']

            simulated_input_features = np.array([[
                id_major_candidate,
                id_university_candidate,
                id_major_candidate, 
                id_university_candidate,
                general_score_rec,
                specialize_score_rec,
                score_mean_rec,
                test_type_encoded
            ]], dtype=np.float32) 

            # Scaling input
            scaled_input = scaler.transform(simulated_input_features)

            tflite_interpreter.set_tensor(input_details[0]['index'], scaled_input)
            
            # Jalankan inferensi
            tflite_interpreter.invoke()

            # Dapatkan hasil output
            prob_pass = tflite_interpreter.get_tensor(output_details[0]['index'])[0][0]

            recommendations.append({
                "id_major": id_major_candidate,
                "major_name": row['major_name'],
                "university_name": row['university_name'],
                "prob_pass": float(prob_pass), # Konversi ke float biasa untuk JSON
                "capacity": int(row['capacity']),
                "utbk_capacity": int(row['utbk_capacity'])
            })

        recom_df = pd.DataFrame(recommendations)
        threshold_rekomendasi = 0.5 

        final_recommendations = recom_df[recom_df['prob_pass'] >= threshold_rekomendasi].sort_values(by='prob_pass', ascending=False)
        
        if not final_recommendations.empty:
            # Mengubah DataFrame ke format list of dicts untuk JSON
            result = final_recommendations[[
                'major_name', 
                'university_name', 
                'prob_pass', 
                'utbk_capacity'
            ]].head(15).to_dict(orient='records')
            
            return jsonify({
                "status": "success",
                "message": "Rekomendasi jurusan berhasil ditemukan.",
                "recommendations": result
            }), 200
        else:
            return jsonify({
                "status": "no_recommendations",
                "message": f"Maaf, tidak ada jurusan yang direkomendasikan dengan probabilitas kelulusan di atas {threshold_rekomendasi:.0%} untuk jenis tes yang Anda pilih.",
                "recommendations": []
            }), 200

    except Exception as e:
        print(f"ERROR: Terjadi kesalahan di endpoint /recommend: {e}")
        return jsonify({"error": f"Terjadi kesalahan internal pada server: {str(e)}", "detail": "Pastikan format input JSON dan nilai-nilai yang diberikan sudah benar."}), 500

if __name__ == '__main__':

    app.run(debug=True, port=5000)