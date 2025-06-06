export default class JurusanPage {
  async render() {
    return `
      <div id="jurusan-section" class="w-full flex flex-col space-y-10 px-6 md:px-12 lg:px-20 py-16">
        <section aria-labelledby="form-section-heading"
                 class="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 md:p-12 transition-colors duration-500"
                 style="box-shadow: 0 0 20px rgba(59,130,246,0.2), 0 0 40px rgba(59,130,246,0.1);">
          <header class="mb-10 text-center">
            <h2 id="form-section-heading" class="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-4">
              Prediksi Jurusan Kuliah
            </h2>
            <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Isi beberapa pertanyaan berikut untuk mendapatkan rekomendasi jurusan kuliah yang sesuai.
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
              <form id="predictionForm">
                <!-- Step 1 -->
                <div class="form-step active" id="step1">
                  <h3 class="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Data Pribadi</h3>
                  <div class="input-group mb-4">
                    <label for="nama" class="text-gray-800 dark:text-gray-100">Nama Lengkap (Opsional)</label>
                    <input type="text" id="nama" name="nama"
                           class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  </div>
                  <div class="input-group mb-4">
                    <label for="usia" class="text-gray-800 dark:text-gray-100">Usia</label>
                    <input type="number" id="usia" name="usia" required
                           class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
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
                  </div>
                  <div class="flex justify-end">
                    <button type="button" class="next-step bg-blue-600 text-white px-4 py-2 rounded">
                      Lanjut <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                  </div>
                </div>

                <!-- Step 2 -->
                <div class="form-step hidden" id="step2">
                  <h3 class="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Minat & Pelajaran Favorit</h3>
                  <div class="input-group mb-4">
                    <label for="minat" class="text-gray-800 dark:text-gray-100">Minat Utama</label>
                    <input type="text" id="minat" name="minat" required
                           class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  </div>
                  <div class="input-group mb-4">
                    <label for="pelajaran_favorit" class="text-gray-800 dark:text-gray-100">Pelajaran Favorit</label>
                    <input type="text" id="pelajaran_favorit" name="pelajaran_favorit" required
                           class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
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
                  <h3 class="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Preferensi & Tujuan</h3>
                  <div class="input-group mb-4">
                    <label for="tujuan" class="text-gray-800 dark:text-gray-100">Tujuan Kuliah</label>
                    <select id="tujuan" name="tujuan" required
                            class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                      <option value="">Pilih Tujuan</option>
                      <option value="profesi">Menjadi Profesional</option>
                      <option value="wirausaha">Membangun Wirausaha</option>
                      <option value="penelitian">Penelitian</option>
                    </select>
                  </div>
                  <div class="input-group mb-4">
                    <label for="lokasi_kuliah" class="text-gray-800 dark:text-gray-100">Lokasi Kuliah yang Diinginkan</label>
                    <select id="lokasi_kuliah" name="lokasi_kuliah" required
                            class="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                      <option value="">Pilih Lokasi</option>
                      <option value="dalam_negeri">Dalam Negeri</option>
                      <option value="luar_negeri">Luar Negeri</option>
                    </select>
                  </div>
                  <div class="flex justify-between">
                    <button type="button" class="prev-step bg-gray-400 text-white px-4 py-2 rounded">
                      <i class="fas fa-arrow-left mr-2"></i> Kembali
                    </button>
                    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
                      Dapatkan Prediksi <i class="fas fa-paper-plane ml-2"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <!-- Hasil Prediksi -->
            <div id="resultPage" class="hidden max-w-4xl mx-auto mt-10 p-6 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <h3 class="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Hasil Prediksi Jurusan</h3>
              <div id="predictionResult"></div>
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

function setupFormSubmission() {
  const form = document.getElementById("predictionForm");
  const resultPage = document.getElementById("resultPage");
  const resultContainer = document.getElementById("predictionResult");
  const resetButton = document.getElementById("resetFormButton");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ambil data form
    const formData = new FormData(form);
    const usia = formData.get("usia");
    const minat = formData.get("minat").toLowerCase();
    const pelajaran = formData.get("pelajaran_favorit").toLowerCase();
    const tujuan = formData.get("tujuan");
    const lokasi = formData.get("lokasi_kuliah");

    // Contoh logika sederhana untuk prediksi jurusan
    let jurusanRekomendasi = "Ilmu Sosial";

    if (minat.includes("matematika") || pelajaran.includes("matematika")) {
      jurusanRekomendasi = "Matematika / Statistika";
    } else if (minat.includes("biologi") || pelajaran.includes("biologi")) {
      jurusanRekomendasi = "Biologi / Kedokteran";
    } else if (
      minat.includes("teknologi") ||
      pelajaran.includes("informatika") ||
      pelajaran.includes("komputer")
    ) {
      jurusanRekomendasi = "Teknologi Informasi / Ilmu Komputer";
    } else if (
      minat.includes("ekonomi") ||
      pelajaran.includes("ekonomi") ||
      pelajaran.includes("akuntansi")
    ) {
      jurusanRekomendasi = "Ekonomi / Akuntansi / Manajemen";
    }

    // Tampilkan hasil
    resultContainer.innerHTML = `
      <p>Usia: <strong>${usia}</strong></p>
      <p>Minat: <strong>${minat}</strong></p>
      <p>Pelajaran Favorit: <strong>${pelajaran}</strong></p>
      <p>Tujuan Kuliah: <strong>${tujuan}</strong></p>
      <p>Lokasi Kuliah: <strong>${lokasi}</strong></p>
      <hr />
      <h4 class="text-xl font-semibold mt-4">Rekomendasi Jurusan Kamu:</h4>
      <p class="mt-2 text-lg font-bold text-blue-700">${jurusanRekomendasi}</p>
    `;

    // Sembunyikan form, tampilkan hasil
    form.classList.add("hidden");
    resultPage.classList.remove("hidden");
  });

  resetButton.addEventListener("click", () => {
    // Reset form & tampilan
    form.reset();
    form.classList.remove("hidden");
    resultPage.classList.add("hidden");
  });
}
