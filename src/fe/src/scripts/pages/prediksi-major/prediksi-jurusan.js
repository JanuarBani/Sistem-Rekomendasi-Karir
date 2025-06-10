export default class JurusanPage {
  async render() {
    return `
    <div id="jurusan-section" class="w-full flex flex-col space-y-10 px-6 md:px-12 lg:px-20 py-16">
      <section class="neon-box bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12">
        <header class="mb-10 text-center">
          <h2 class="neon-text text-4xl font-bold text-blue-700 dark:text-blue-400 mb-4">Prediksi Jurusan Kuliah</h2>
          <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Isi data berikut untuk mendapatkan rekomendasi jurusan yang sesuai dengan minat dan kemampuan Anda.
          </p>
        </header>

        <form id="predictionForm" class="max-w-4xl mx-auto space-y-6">
          <!-- Nama -->
          <div>
            <label for="nama" class="block text-gray-800 dark:text-gray-100 font-medium">Nama Lengkap</label>
            <input type="text" id="nama" name="nama" placeholder="Contoh: Risna Dwi" required
              class="neon-input w-full rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          </div>

          <!-- Kelompok Ujian -->
          <div>
            <label for="kelompok_ujian" class="block text-gray-800 dark:text-gray-100 font-medium">Kelompok Ujian</label>
            <select id="kelompok_ujian" name="kelompok_ujian" required
              class="neon-select w-full rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <option value="">Pilih Kelompok</option>
              <option value="saintek">Saintek</option>
              <option value="soshum">Soshum</option>
            </select>
          </div>

          <!-- TPS -->
          <div>
            <h4 class="neon-text font-semibold text-blue-700 dark:text-blue-300">Nilai TPS (Tes Potensi Skolastik)</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Wajib diisi oleh semua peserta.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label class="block text-sm text-gray-800 dark:text-gray-100 mb-1">Penalaran Umum (KPU)</label>
                <input type="number" name="kpu" placeholder="Contoh: 85" required class="neon-input p-2 rounded w-full">
              </div>
              <div>
                <label class="block text-sm text-gray-800 dark:text-gray-100 mb-1">Kemampuan Kuantitatif (KUA)</label>
                <input type="number" name="kua" placeholder="Contoh: 80" required class="neon-input p-2 rounded w-full">
              </div>
              <div>
                <label class="block text-sm text-gray-800 dark:text-gray-100 mb-1">Pemahaman Umum (PPU)</label>
                <input type="number" name="ppu" placeholder="Contoh: 78" required class="neon-input p-2 rounded w-full">
              </div>
              <div>
                <label class="block text-sm text-gray-800 dark:text-gray-100 mb-1">Membaca & Menulis (KMB)</label>
                <input type="number" name="kmb" placeholder="Contoh: 82" required class="neon-input p-2 rounded w-full">
              </div>
            </div>
          </div>

          <!-- TKA -->
          <div>
            <h4 class="neon-text font-semibold text-blue-700 dark:text-blue-300">Nilai TKA (Tes Kemampuan Akademik)</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Muncul sesuai kelompok ujian.</p>
            <div id="tkaSection" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <!-- Dinamis berdasarkan kelompok -->
            </div>
          </div>

          <!-- Submit -->
          <div class="text-center pt-4">
            <button type="submit" class="neon-btn rounded px-6 py-2">Dapatkan Prediksi</button>
          </div>
        </form>

        <!-- Hasil -->
        <div id="resultPage" class="hidden max-w-4xl mx-auto mt-10 p-6 neon-box rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          <h3 class="neon-text text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">Hasil Prediksi Jurusan</h3>
          <div id="predictionResult"></div>
          <button type="button" id="resetFormButton" class="neon-btn mt-4 rounded px-4 py-2">Isi Form Lagi</button>
        </div>
      </section>
    </div>
  `;
  }

  async afterRender() {
    setupTKAInputHandler();
    setupFormSubmission();
  }
}

function setupTKAInputHandler() {
  const kelompokSelect = document.getElementById("kelompok_ujian");
  const tkaSection = document.getElementById("tkaSection");

  const saintekFields = [
    { name: "mat", placeholder: "Matematika" },
    { name: "fis", placeholder: "Fisika" },
    { name: "kim", placeholder: "Kimia" },
    { name: "bio", placeholder: "Biologi" },
  ];

  const soshumFields = [
    { name: "mat", placeholder: "Matematika" },
    { name: "geo", placeholder: "Geografi" },
    { name: "sej", placeholder: "Sejarah" },
    { name: "sos", placeholder: "Sosiologi" },
    { name: "eko", placeholder: "Ekonomi" },
  ];

  kelompokSelect.addEventListener("change", () => {
    const selected = kelompokSelect.value;
    let fields = [];

    if (selected === "saintek") fields = saintekFields;
    else if (selected === "soshum") fields = soshumFields;

    tkaSection.innerHTML = fields
      .map(
        (f) => `
          <div>
            <label class="block text-sm text-gray-800 dark:text-gray-100 mb-1">${f.placeholder}</label>
            <input type="number" name="${f.name}" placeholder="${f.placeholder}" required
              class="neon-input p-2 rounded w-full">
          </div>
        `
      )
      .join("");
  });
}


function setupFormSubmission() {
  const form = document.getElementById("predictionForm");
  const resultPage = document.getElementById("resultPage");
  const resultContainer = document.getElementById("predictionResult");
  const resetButton = document.getElementById("resetFormButton");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const nama = formData.get("nama");
    const kelompok = formData.get("kelompok_ujian");

    const tps = {
      kpu: formData.get("kpu"),
      kua: formData.get("kua"),
      ppu: formData.get("ppu"),
      kmb: formData.get("kmb"),
    };

    let tka = {};
    if (kelompok === "saintek") {
      tka = {
        mat: formData.get("mat"),
        fis: formData.get("fis"),
        kim: formData.get("kim"),
        bio: formData.get("bio"),
      };
    } else {
      tka = {
        mat: formData.get("mat"),
        geo: formData.get("geo"),
        sej: formData.get("sej"),
        sos: formData.get("sos"),
        eko: formData.get("eko"),
      };
    }

    // Logika prediksi dummy
    let jurusan = "Belum Ditentukan";
    if (kelompok === "saintek") {
      if (tka.mat > 80 && tka.fis > 75) jurusan = "Teknik / Sains";
      else jurusan = "Kedokteran / Biologi";
    } else {
      if (tka.eko > 80 && tka.mat > 75) jurusan = "Ekonomi / Manajemen";
      else jurusan = "Ilmu Sosial / Politik";
    }

    resultContainer.innerHTML = `
      <p>Nama: <strong>${nama}</strong></p>
      <p>Kelompok Ujian: <strong>${kelompok}</strong></p>
      <p><strong>Nilai TPS:</strong> KPU: ${tps.kpu}, Kua: ${tps.kua}, PPU: ${
      tps.ppu
    }, KMB: ${tps.kmb}</p>
      <p><strong>Nilai TKA:</strong> ${Object.entries(tka)
        .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
        .join(", ")}</p>
      <hr class="my-3"/>
      <p class="text-lg font-bold text-blue-700">Rekomendasi Jurusan: ${jurusan}</p>
    `;

    form.classList.add("hidden");
    resultPage.classList.remove("hidden");
  });

  resetButton.addEventListener("click", () => {
    form.reset();
    document.getElementById("tkaSection").innerHTML = "";
    form.classList.remove("hidden");
    resultPage.classList.add("hidden");
  });
}
