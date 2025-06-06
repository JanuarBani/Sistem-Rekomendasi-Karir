export default class KarirPage {
  async render() {
    return `
  <div id="career-major-section" class="w-full flex flex-col space-y-10 px-6 md:px-12 lg:px-20 py-16">
    <section aria-labelledby="form-section-heading"
             class="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 md:p-12 transition-colors duration-500"
             style="box-shadow: 0 0 20px rgba(37,99,235,0.2), 0 0 40px rgba(37,99,235,0.1);">
      <header class="mb-10 text-center">
        <h2 id="form-section-heading" class="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-4">
          Rekomendasi Karier & Jurusan
        </h2>
        <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Jawab pertanyaan berikut untuk mendapatkan rekomendasi berdasarkan minat, bakat, dan preferensi kamu.
        </p>
      </header>

      <div id="formSection" class="w-full">
        <div id="formContainer" class="step-container max-w-4xl mx-auto">

          <!-- Progress Bar -->
          <div class="progress-bar flex justify-between mb-6">
            <div class="progress-step active" data-step="1">1</div>
            <div class="progress-step" data-step="2">2</div>
            <div class="progress-step" data-step="3">3</div>
          </div>

          <!-- Form -->
          <form id="recommendationForm">
            <!-- Step 1 -->
            <div class="form-step active" id="step1">
              <h3 class="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Data Diri</h3>
              <div class="input-group mb-4">
                <label for="nama" class="text-gray-800 dark:text-gray-100">Nama Lengkap (Opsional)</label>
                <input type="text" id="nama" name="nama"
                       class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              </div>
              <div class="input-group mb-4">
                <label for="usia" class="text-gray-800 dark:text-gray-100">Usia</label>
                <input type="number" id="usia" name="usia" required
                       class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <div class="error-message hidden text-red-500 text-sm" id="error-usia"></div>
              </div>
              <div class="input-group mb-4">
                <label for="pendidikan_terakhir" class="text-gray-800 dark:text-gray-100">Pendidikan Terakhir</label>
                <select id="pendidikan_terakhir" name="pendidikan_terakhir" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Pendidikan</option>
                  <option value="SMA">SMA</option>
                  <option value="SMK">SMK</option>
                  <option value="Universitas">Universitas</option>
                </select>
                <div class="error-message hidden text-red-500 text-sm" id="error-pendidikan_terakhir"></div>
              </div>
              <div class="input-group mb-4">
                <label for="jurusan_sebelumnya" class="text-gray-800 dark:text-gray-100">Jurusan Sebelumnya (Jika Ada)</label>
                <input type="text" id="jurusan_sebelumnya" name="jurusan_sebelumnya"
                       class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              </div>
              <div class="flex justify-end">
                <button type="button" class="next-step bg-blue-600 text-white px-4 py-2 rounded">
                  Lanjut <i class="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="form-step hidden" id="step2">
              <h3 class="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Penilaian Kecerdasan Majemuk</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">Nilai kemampuan Anda dari 0-20 untuk setiap aspek berikut:</p>
              
              <div class="input-group mb-4">
                <label for="Linguistic" class="text-gray-800 dark:text-gray-100">Linguistik (Kemampuan Bahasa)</label>
                <select id="Linguistic" name="Linguistic" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="0">0 - Sangat Rendah</option>
                  <option value="5">5 - Rendah</option>
                  <option value="10">10 - Sedang</option>
                  <option value="15">15 - Tinggi</option>
                  <option value="20">20 - Sangat Tinggi</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="Musical" class="text-gray-800 dark:text-gray-100">Musikal</label>
                <select id="Musical" name="Musical" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="0">0 - Sangat Rendah</option>
                  <option value="5">5 - Rendah</option>
                  <option value="10">10 - Sedang</option>
                  <option value="15">15 - Tinggi</option>
                  <option value="20">20 - Sangat Tinggi</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="Bodily" class="text-gray-800 dark:text-gray-100">Kinestetik (Kemampuan Fisik)</label>
                <select id="Bodily" name="Bodily" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="0">0 - Sangat Rendah</option>
                  <option value="5">5 - Rendah</option>
                  <option value="10">10 - Sedang</option>
                  <option value="15">15 - Tinggi</option>
                  <option value="20">20 - Sangat Tinggi</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="Logical - Mathematical" class="text-gray-800 dark:text-gray-100">Logis-Matematis</label>
                <select id="Logical - Mathematical" name="Logical - Mathematical" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="0">0 - Sangat Rendah</option>
                  <option value="5">5 - Rendah</option>
                  <option value="10">10 - Sedang</option>
                  <option value="15">15 - Tinggi</option>
                  <option value="20">20 - Sangat Tinggi</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="Spatial-Visualization" class="text-gray-800 dark:text-gray-100">Spasial-Visual</label>
                <select id="Spatial-Visualization" name="Spatial-Visualization" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="0">0 - Sangat Rendah</option>
                  <option value="5">5 - Rendah</option>
                  <option value="10">10 - Sedang</option>
                  <option value="15">15 - Tinggi</option>
                  <option value="20">20 - Sangat Tinggi</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="Interpersonal" class="text-gray-800 dark:text-gray-100">Interpersonal (Kemampuan Sosial)</label>
                <select id="Interpersonal" name="Interpersonal" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="0">0 - Sangat Rendah</option>
                  <option value="5">5 - Rendah</option>
                  <option value="10">10 - Sedang</option>
                  <option value="15">15 - Tinggi</option>
                  <option value="20">20 - Sangat Tinggi</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="Intrapersonal" class="text-gray-800 dark:text-gray-100">Intrapersonal (Pemahaman Diri)</label>
                <select id="Intrapersonal" name="Intrapersonal" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="0">0 - Sangat Rendah</option>
                  <option value="5">5 - Rendah</option>
                  <option value="10">10 - Sedang</option>
                  <option value="15">15 - Tinggi</option>
                  <option value="20">20 - Sangat Tinggi</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="Naturalist" class="text-gray-800 dark:text-gray-100">Naturalis</label>
                <select id="Naturalist" name="Naturalist" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="0">0 - Sangat Rendah</option>
                  <option value="5">5 - Rendah</option>
                  <option value="10">10 - Sedang</option>
                  <option value="15">15 - Tinggi</option>
                  <option value="20">20 - Sangat Tinggi</option>
                </select>
              </div>
              <div class="flex justify-between">
                <button type="button" class="prev-step bg-gray-400 text-white px-4 py-2 rounded">
                  <i class="fas fa-arrow-left mr-2"></i> Kembali
                </button>
                <button type="button" class="next-step bg-blue-600 text-white px-4 py-2 rounded">
                  Lanjut <i class="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="form-step hidden" id="step3">
              <h3 class="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Nilai Akademik & Kegiatan Belajar</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">Masukkan nilai akademik (0-100) dan informasi studi Anda:</p>

              <div class="input-group mb-4">
                <label for="math_score" class="text-gray-800 dark:text-gray-100">Nilai Matematika</label>
                <select id="math_score" name="math_score" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="60">60-69 (Cukup)</option>
                  <option value="70">70-79 (Baik)</option>
                  <option value="80">80-89 (Sangat Baik)</option>
                  <option value="90">90-100 (Istimewa)</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="physics_score" class="text-gray-800 dark:text-gray-100">Nilai Fisika</label>
                <select id="physics_score" name="physics_score" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="60">60-69 (Cukup)</option>
                  <option value="70">70-79 (Baik)</option>
                  <option value="80">80-89 (Sangat Baik)</option>
                  <option value="90">90-100 (Istimewa)</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="biology_score" class="text-gray-800 dark:text-gray-100">Nilai Biologi</label>
                <select id="biology_score" name="biology_score" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="60">60-69 (Cukup)</option>
                  <option value="70">70-79 (Baik)</option>
                  <option value="80">80-89 (Sangat Baik)</option>
                  <option value="90">90-100 (Istimewa)</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="english_score" class="text-gray-800 dark:text-gray-100">Nilai Bahasa Inggris</label>
                <select id="english_score" name="english_score" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="60">60-69 (Cukup)</option>
                  <option value="70">70-79 (Baik)</option>
                  <option value="80">80-89 (Sangat Baik)</option>
                  <option value="90">90-100 (Istimewa)</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="history_score" class="text-gray-800 dark:text-gray-100">Nilai Sejarah</label>
                <select id="history_score" name="history_score" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="60">60-69 (Cukup)</option>
                  <option value="70">70-79 (Baik)</option>
                  <option value="80">80-89 (Sangat Baik)</option>
                  <option value="90">90-100 (Istimewa)</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="chemistry_score" class="text-gray-800 dark:text-gray-100">Nilai Kimia</label>
                <select id="chemistry_score" name="chemistry_score" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="60">60-69 (Cukup)</option>
                  <option value="70">70-79 (Baik)</option>
                  <option value="80">80-89 (Sangat Baik)</option>
                  <option value="90">90-100 (Istimewa)</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="geography_score" class="text-gray-800 dark:text-gray-100">Nilai Geografi</label>
                <select id="geography_score" name="geography_score" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Nilai</option>
                  <option value="60">60-69 (Cukup)</option>
                  <option value="70">70-79 (Baik)</option>
                  <option value="80">80-89 (Sangat Baik)</option>
                  <option value="90">90-100 (Istimewa)</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="weekly_self_study_hours" class="text-gray-800 dark:text-gray-100">Jam Belajar Mandiri per Minggu</label>
                <select id="weekly_self_study_hours" name="weekly_self_study_hours" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Jam Belajar</option>
                  <option value="1">1-5 jam</option>
                  <option value="6">6-10 jam</option>
                  <option value="11">11-15 jam</option>
                  <option value="16">16-20 jam</option>
                  <option value="21">>20 jam</option>
                </select>
              </div>

              <div class="input-group mb-4">
                <label for="absence_days" class="text-gray-800 dark:text-gray-100">Jumlah Hari Tidak Hadir</label>
                <select id="absence_days" name="absence_days" required
                        class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">Pilih Jumlah Hari</option>
                  <option value="0">0 hari</option>
                  <option value="1">1-3 hari</option>
                  <option value="4">4-7 hari</option>
                  <option value="8">8-14 hari</option>
                  <option value="15">>14 hari</option>
                </select>
              </div>
              <div class="flex justify-between">
                <button type="button" class="prev-step bg-gray-400 text-white px-4 py-2 rounded">
                  <i class="fas fa-arrow-left mr-2"></i> Kembali
                </button>
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
                  Dapatkan Rekomendasi <i class="fas fa-paper-plane ml-2"></i>
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Hasil Rekomendasi -->
        <div id="resultPage" class="hidden max-w-4xl mx-auto mt-10 p-6 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          <h3 class="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Hasil Rekomendasi</h3>
          <div id="recommendationResult"></div>
          <button type="button" id="resetFormButton" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Isi Form Lagi
          </button>
        </div>
      </div>
    </section>
  </div>
  `;
  }

  async afterRender() {
    setupStepNavigation();
    setupFormSubmission();
  }
}

function setupFormSubmission() {
  // Setup validasi real-time untuk input
  const numberInputs = document.querySelectorAll('input[type="number"][required]');
  
  numberInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const value = e.target.value.trim();
      const errorDiv = document.getElementById(`error-${e.target.name}`);
      
      // Tentukan batas nilai berdasarkan jenis input
      const isAcademicScore = ['history_score', 'chemistry_score', 'geography_score'].includes(e.target.name);
      const minValue = 0;
      const maxValue = isAcademicScore ? 100 : 20;
      const errorMessage = isAcademicScore ? 'Masukkan nilai antara 0-100' : 'Masukkan nilai antara 0-20';
      
      if (value === '' || isNaN(value) || value < minValue || value > maxValue) {
        input.classList.add('border-red-500');
        if (errorDiv) {
          errorDiv.textContent = errorMessage;
          errorDiv.classList.remove('hidden');
        }
      } else {
        input.classList.remove('border-red-500');
        if (errorDiv) {
          errorDiv.classList.add('hidden');
        }
      }
    });
  });

  const form = document.getElementById('recommendationForm');
  const resultPage = document.getElementById('resultPage');
  const recommendationResult = document.getElementById('recommendationResult');
  const resetFormButton = document.getElementById('resetFormButton');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validasi input sebelum submit
    const inputs = form.querySelectorAll('input[type="number"][required]');
    let isValid = true;
    
    inputs.forEach(input => {
      const value = input.value.trim();
      const isAcademicScore = ['history_score', 'chemistry_score', 'geography_score'].includes(input.name);
      const minValue = 0;
      const maxValue = isAcademicScore ? 100 : 20;
      const errorMessage = isAcademicScore ? 'Masukkan nilai antara 0-100' : 'Masukkan nilai antara 0-20';

      if (value === '' || isNaN(value) || value < minValue || value > maxValue) {
        input.classList.add('border-red-500');
        const errorDiv = document.getElementById(`error-${input.name}`);
        if (errorDiv) {
          errorDiv.textContent = errorMessage;
          errorDiv.classList.remove('hidden');
        }
        isValid = false;
      } else {
        input.classList.remove('border-red-500');
        const errorDiv = document.getElementById(`error-${input.name}`);
        if (errorDiv) {
          errorDiv.classList.add('hidden');
        }
      }
    });

    if (!isValid) {
      return;
    }
    
    // Kumpulkan data form
    const formData = {
      // Data kecerdasan majemuk
      Linguistic: parseInt(form.Linguistic.value),
      Musical: parseInt(form.Musical.value),
      Bodily: parseInt(form.Bodily.value),
      'Logical - Mathematical': parseInt(form['Logical - Mathematical'].value),
      'Spatial-Visualization': parseInt(form['Spatial-Visualization'].value),
      Interpersonal: parseInt(form.Interpersonal.value),
      Intrapersonal: parseInt(form.Intrapersonal.value),
      Naturalist: parseInt(form.Naturalist.value),
      
      // Data akademik
      math_score: parseInt(form.math_score.value),
      physics_score: parseInt(form.physics_score.value),
      biology_score: parseInt(form.biology_score.value),
      english_score: parseInt(form.english_score.value),
      history_score: parseInt(form.history_score.value),
      chemistry_score: parseInt(form.chemistry_score.value),
      geography_score: parseInt(form.geography_score.value),
      
      // Data studi
      weekly_self_study_hours: parseInt(form.weekly_self_study_hours.value),
      absence_days: parseInt(form.absence_days.value)
    };

    try {
      // Import fungsi predictCareer
      const { predictCareer } = await import('../../data/api.js');
      
      // Kirim data ke backend
      console.log('Sending form data:', formData);
      const result = await predictCareer(formData);
      console.log('Received response:', result);

      // Tampilkan hasil rekomendasi
      form.classList.add('hidden');
      resultPage.classList.remove('hidden');
      
      // Format hasil rekomendasi
      const recommendations = result.recommendedProfessions;
      const confidence = result.confidence;
        
        let htmlResult = '<div class="space-y-4">';
        recommendations.forEach((profession, index) => {
          const confidencePercent = (confidence[index] * 100).toFixed(1);
          htmlResult += `
            <div class="p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div class="flex justify-between items-center">
                <h4 class="text-xl font-semibold text-blue-700 dark:text-blue-300">${profession}</h4>
                <span class="text-sm font-medium text-blue-600 dark:text-blue-400">${confidencePercent}% Kecocokan</span>
              </div>
            </div>
          `;
        });
        htmlResult += '</div>';
        
        recommendationResult.innerHTML = htmlResult;
      if (!recommendations || !confidence) {
        throw new Error('Format response tidak valid');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan: ' + error.message);
    }
  });

  // Reset form dan tampilkan kembali form input
  resetFormButton.addEventListener('click', () => {
    form.reset();
    form.classList.remove('hidden');
    resultPage.classList.add('hidden');
  });

}

function setupStepNavigation() {
  const nextButtons = document.querySelectorAll(".next-step");
  const prevButtons = document.querySelectorAll(".prev-step");
  const steps = document.querySelectorAll(".form-step");
  const progressSteps = document.querySelectorAll(".progress-step");

  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle("hidden", i !== index);
      step.classList.toggle("active", i === index);
    });
    progressSteps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
    });
  }

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  showStep(currentStep); 
}
