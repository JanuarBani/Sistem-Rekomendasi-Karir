import HomePresenter from './home-presenter.js';

export default class HomePage {
  #presenter = null;

  async render() {
    return `
<div id="career-major-section" class="w-full flex flex-col space-y-10 px-6 md:px-12 lg:px-20 py-16">

  <!-- Section: Intro Career --> 
<section aria-labelledby="career-heading"
         class="neon-box bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-16 px-6 md:px-16 rounded-3xl transition-colors duration-500">
  <div class="flex flex-col-reverse md:flex-row items-center gap-12">

    <!-- Teks -->
    <div class="flex-1 text-center md:text-left" data-aos="fade-right">
      <header>
        <h2 id="career-heading" class="text-5xl font-extrabold text-blue-700 dark:text-blue-300 mb-4 tracking-tight">
          Karier Impianmu
        </h2>
        <p class="text-gray-700 dark:text-gray-200 text-lg md:text-xl mb-8 leading-relaxed">
          Temukan berbagai pilihan karier yang sesuai dengan <span class="font-medium text-blue-600 dark:text-blue-400">minat</span>, <span class="font-medium text-blue-600 dark:text-blue-400">bakat</span>, dan potensi terbaik dalam dirimu.
        </p>
      </header>
      <a href="#/prediksi-karier"
         role="button"
         class="neon-btn inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full transition duration-300"
      >
        <i class="fas fa-bullseye mr-2"></i> Prediksi Karier Kamu
      </a>
    </div>

    <!-- Gambar -->
    <div class="flex-1" data-aos="fade-left">
      <div class="neon-box overflow-hidden rounded-2xl transition transform hover:scale-105"
           style="box-shadow: 0 0 12px rgba(37,99,235,0.5), 0 0 25px rgba(37,99,235,0.4);">
        <img src="/images/karir.jpg" alt="Karier Impian" class="w-full h-auto object-cover" />
      </div>
    </div>

  </div>
</section>

<!-- Section: Intro Jurusan -->
<section aria-labelledby="major-heading"
         class="neon-box bg-gray-50 dark:bg-gray-700 py-14 text-center rounded-2xl transition-colors duration-300"
>
  <header>
    <h2 id="major-heading" class="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-4">Pilih Jurusan Tepat</h2>
    <p class="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-6">
      Dapatkan rekomendasi jurusan kuliah yang mendukung tujuan kariermu dan sesuai dengan kepribadian serta kemampuanmu.
    </p>
  </header>

  <!-- Tambah gambar di sini -->
  <div class="max-w-md mx-auto mb-6 rounded-2xl overflow-hidden neon-box" style="box-shadow: 0 0 10px #2563eb;">
    <img src="/images/wisuda.jpg" alt="Pilih Jurusan" class="w-full h-auto object-cover" />
  </div>

  <a href="#/prediksi-jurusan"
     role="button"
     class="neon-btn inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full transition duration-300"
  >
    <i class="fas fa-graduation-cap mr-2"></i> Prediksi Jurusan Kamu
  </a>
</section>


  <!-- Section: Navigasi dan Konten -->
  <section aria-label="Navigasi dan Hasil Rekomendasi"
           class="neon-box min-h-screen bg-gray-100 dark:bg-gray-900 py-12 rounded-2xl transition-colors duration-300"
  >
    <nav aria-label="Navigasi Tab Karier dan Jurusan" class="flex justify-center gap-8 text-xl font-semibold text-gray-700 dark:text-gray-200 mb-10">
      <button id="careerNav" class="nav-btn text-blue-600 border-b-2 border-blue-600 pb-1 transition" aria-current="true">Career</button>
      <button id="majorNav" class="nav-btn hover:text-blue-600 hover:border-blue-600 pb-1 border-b-2 border-transparent transition">Jurusan</button>
    </nav>

    <div id="content-loading-container" class="mb-6" role="status" aria-live="polite"></div>
    <article id="content" class="space-y-14 animate-fadeIn min-h-[300px] mx-10" aria-live="polite"></article>
  </section>

</div>
  `;
  }

  async afterRender() {
    try {
      this.showLoading();

      this.#presenter = new HomePresenter({
        view: this,
      });

      await this.#presenter.init();
      this.setupNavListeners();
    } catch (error) {
      console.error('afterRender: error saat inisialisasi:', error);
      this.showError('Gagal memuat data awal. Silakan coba lagi nanti.');
    } finally {
      this.hideLoading();
    }
  }

  setupNavListeners() {
    const careerBtn = document.getElementById('careerNav');
    const majorBtn = document.getElementById('majorNav');

    if (careerBtn) {
      careerBtn.addEventListener('click', () => {
        this.setActiveTab('careerNav');
        this.#presenter.loadCareer();
      });
    }

    if (majorBtn) {
      majorBtn.addEventListener('click', () => {
        this.setActiveTab('majorNav');
        this.#presenter.loadMajor();
      });
    }
  }

  setActiveTab(activeId) {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach((btn) => {
      btn.classList.remove('text-blue-600', 'border-blue-600');
      btn.classList.add('text-gray-700', 'dark:text-gray-300', 'border-transparent');
    });

    const activeBtn = document.getElementById(activeId);
    if (activeBtn) {
      activeBtn.classList.add('text-blue-600', 'border-blue-600');
      activeBtn.classList.remove('text-gray-700', 'dark:text-gray-300', 'border-transparent');
    }
  }

  showLoading() {
    const container = document.getElementById('content-loading-container');
    if (container) {
      container.innerHTML = `
        <div class="flex justify-center items-center h-16">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      `;
    }
  }

  hideLoading() {
    const container = document.getElementById('content-loading-container');
    if (container) container.innerHTML = '';
  }

  showError(message) {
    const container = document.getElementById('content');
    if (container) {
      container.innerHTML = `<p class="text-red-600 font-semibold">${message}</p>`;
    }
  }

  populateCareerList(groupedCareers) {
    const container = document.getElementById('content');
    if (!container) return;

    if (!Array.isArray(groupedCareers) || groupedCareers.length === 0) {
      container.innerHTML = `<p class="text-gray-500 dark:text-gray-400 italic text-center mt-10">Belum ada data karier.</p>`;
      return;
    }

    container.innerHTML = groupedCareers
      .map(
        ({ industry, careers }) => `
    <section class="mb-20 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800 shadow transition-colors duration-300">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white inline-block border-b-4 border-blue-600 pb-2 mb-8">
        ${industry}
      </h2>

      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        ${careers
          .map(
            ({ name, description, image }) => `
          <li class="neon-box bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-8 shadow-sm transform transition duration-300 hover:shadow-lg hover:scale-105 cursor-pointer text-center flex flex-col items-center">
            <img src="${image}" alt="${name}" class="w-32 h-32 object-cover rounded-xl mb-6 shadow-sm transition-transform duration-300" />
            <h3 class="text-blue-700 dark:text-blue-400 font-semibold text-xl mb-2">${name}</h3>
            <p class="text-gray-600 dark:text-gray-300 text-base leading-relaxed">${description}</p>
          </li>
        `,
          )
          .join('')}
      </ul>
    </section>
  `,
      )
      .join('');
  }

  populateMajorList(majors) {
    const container = document.getElementById('content');
    if (!container) return;

    if (!Array.isArray(majors) || majors.length === 0) {
      container.innerHTML = `<p class="text-gray-500 dark:text-gray-400 italic text-center mt-10">Belum ada data jurusan.</p>`;
      return;
    }

    container.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-900 dark:text-white text-center inline-block border-b-4 border-blue-600 pb-2 mb-10">
      Daftar Jurusan Populer
    </h2>

    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      ${majors
        .map(
          ({ name, description, image }) => `
        <li class="neon-box group bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-8 shadow-sm hover:shadow-md hover:bg-blue-50 dark:hover:bg-gray-600 transition duration-300 cursor-pointer flex flex-col items-center text-center">
          <img src="${image}" alt="${name}" class="w-32 h-32 object-cover rounded-xl mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300" />
          <h3 class="text-gray-900 dark:text-white font-semibold text-xl mb-3">${name}</h3>
          <p class="text-gray-600 dark:text-gray-300 text-base leading-relaxed">${description}</p>
        </li>
      `,
        )
        .join('')}
    </ul>
  `;
  }

  populateMajorListError(message) {
    const container = document.getElementById('content');
    if (container) {
      container.innerHTML = `
        <p class="text-red-600 font-semibold">Gagal memuat jurusan: ${message}</p>
      `;
    }
  }
}
