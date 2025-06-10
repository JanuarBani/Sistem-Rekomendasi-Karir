export default class AboutPage {
  async render() {
    return `
<div id="about-section" class="w-full flex flex-col space-y-12 px-6 md:px-12 lg:px-20 py-16">

  <!-- Intro Website Description -->
  <section aria-labelledby="about-heading"
           class="bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-14 px-8 rounded-3xl transition-colors duration-500"
           style="box-shadow: 0 0 20px rgba(37,99,235,0.4), 0 0 40px rgba(37,99,235,0.3);">
    <header class="max-w-4xl mx-auto text-center">
      <h2 id="about-heading" class="text-5xl font-extrabold text-blue-700 dark:text-blue-300 mb-6 tracking-tight">
        Tentang Website Ini
      </h2>
      <p class="text-gray-700 dark:text-gray-200 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
        Website ini membantu kamu menemukan karier impian dan jurusan kuliah tepat berdasarkan minat, bakat, serta preferensi pribadi menggunakan teknologi machine learning modern.  
        Cocok untuk pelajar, mahasiswa, dan profesional yang ingin membuat keputusan tepat untuk masa depan.
      </p>
    </header>
  </section>

  <!-- Tech Stack Section -->
<section aria-labelledby="techstack-heading"
         class="bg-gray-50 dark:bg-gray-800 rounded-3xl py-14 px-10 max-w-4xl mx-auto shadow-md"
         style="box-shadow: 0 0 20px rgba(59,130,246,0.3);">
  
  <h3 id="techstack-heading"
      class="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-8 text-center">
    Teknologi yang Digunakan
  </h3>
  
  <div class="flex flex-wrap justify-center gap-12 text-gray-700 dark:text-gray-300">
    ${techStack
      .map(({ image, name, description }) => {
        const safeId = `desc-${name.replace(/\s+/g, '-').toLowerCase()}`;
        return `
      <div class="relative group cursor-pointer flex flex-col items-center space-y-2"
           tabindex="0" aria-describedby="${safeId}">
        <img src="${image}" alt="${name} logo" class="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110" />
        <span class="font-semibold">${name}</span>
        <div role="tooltip" id="${safeId}"
             class="pointer-events-none absolute bottom-full mb-3 w-56 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 shadow-lg z-50">
          ${description}
        </div>
      </div>
      `;
      })
      .join('')}
  </div>
  
</section>


  <!-- Image Section -->
  <section aria-label="Gambar Karier Impian"
           class="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
    <img src="/images/karir.jpg" alt="Karier Impian" class="w-full h-auto object-cover" />
  </section>

  <!-- Fitur Utama -->
<section aria-labelledby="features-heading"
         class="bg-white dark:bg-gray-900 rounded-3xl py-14 px-10 shadow-md max-w-5xl mx-auto"
         style="box-shadow: 0 0 20px rgba(59,130,246,0.2);">
  <h3 id="features-heading" class="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-8 text-center">
    Fitur Utama
  </h3>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-800 dark:text-gray-200">
    <div class="p-4 rounded-lg bg-blue-50 dark:bg-gray-800 shadow hover:shadow-md transition">
      <h4 class="font-semibold text-lg mb-2">🎯 Prediksi Karier</h4>
      <p class="text-sm">Menentukan jalur karier terbaik berdasarkan minat, gaya kerja, dan preferensi personal.</p>
    </div>
    <div class="p-4 rounded-lg bg-blue-50 dark:bg-gray-800 shadow hover:shadow-md transition">
      <h4 class="font-semibold text-lg mb-2">🎓 Rekomendasi Jurusan</h4>
      <p class="text-sm">Menyarankan jurusan kuliah yang cocok berdasarkan keahlian dan tujuan jangka panjangmu.</p>
    </div>
    <div class="p-4 rounded-lg bg-blue-50 dark:bg-gray-800 shadow hover:shadow-md transition">
      <h4 class="font-semibold text-lg mb-2">🤖 Teknologi AI</h4>
      <p class="text-sm">Menggunakan TensorFlow.js dan model ML untuk personalisasi hasil secara real-time.</p>
    </div>
  </div>
</section>

<section aria-labelledby="goal-heading"
         class="bg-gray-100 dark:bg-gray-800 py-14 px-8 rounded-3xl max-w-5xl mx-auto">
  <h3 id="goal-heading" class="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6 text-center">
    Mengapa Menggunakan Website Ini?
  </h3>
  <ul class="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
    <li>✅ Bantu kamu memilih jurusan dengan lebih percaya diri.</li>
    <li>✅ Kenali karier yang sesuai dengan kepribadian dan minat kamu.</li>
    <li>✅ Teknologi prediktif yang cepat dan akurat langsung dari browser.</li>
  </ul>
</section>

<section aria-labelledby="stats-heading"
         class="bg-blue-50 dark:bg-gray-900 py-12 px-10 rounded-3xl max-w-5xl mx-auto text-center">
  <h3 id="stats-heading" class="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-10">Dampak & Capaian</h3>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-blue-800 dark:text-blue-300 text-xl font-semibold">
    <div>
      <div class="text-4xl">10K+</div>
      <div>Pengguna Terbantu</div>
    </div>
    <div>
      <div class="text-4xl">95%</div>
      <div>Tingkat Kepuasan</div>
    </div>
    <div>
      <div class="text-4xl">500+</div>
      <div>Prediksi Karier Akurat</div>
    </div>
  </div>
</section>

<section class="text-center py-12">
  <a href="#/karier"
     class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-lg">
    🎯 Coba Prediksi Kariermu Sekarang
  </a>
</section>


</div>
    `;
  }

  async afterRender() {
    // Jika mau tambahkan JS khusus, misal keyboard accessibility sudah disiapkan via tabindex & aria-describedby
  }
}

// Data Teknologi dan Deskripsinya
const techStack = [
  {
    image: '/images/htl.png',
    name: 'HTML5',
    description:
      'Bahasa markup standar untuk membuat struktur halaman web secara semantik dan responsif.',
  },
  {
    image: '/images/css.png',
    name: 'CSS3',
    description:
      'Bahasa untuk mendesain dan mengatur tampilan halaman web dengan berbagai efek dan layout modern.',
  },
  {
    image: '/images/js.png',
    name: 'JavaScript',
    description:
      'Bahasa pemrograman yang membuat halaman web interaktif dan dinamis di sisi klien.',
  },
  {
    image: '/images/tailwind.png',
    name: 'Tailwind CSS',
    description:
      'Framework CSS utility-first yang cepat dan mudah untuk membangun UI yang responsif dan modern.',
  },
  {
    image: '/images/node.png',
    name: 'Node.js',
    description:
      'Runtime JavaScript yang berjalan di server untuk membangun backend dan API yang scalable.',
  },
  {
    image: '/images/vite.png',
    name: 'Vite',
    description: 'Build tool modern yang cepat untuk pengembangan front-end berbasis modul ES.',
  },
  {
    image: '/images/tsjs.png',
    name: 'TensorFlow.js',
    description:
      'Library machine learning yang memungkinkan model ML dijalankan langsung di browser menggunakan JavaScript.',
  },
  {
    image: '/images/machinelearning.png',
    name: 'Machine Learning',
    description:
      'Teknologi yang memungkinkan komputer belajar dari data untuk membuat prediksi dan keputusan otomatis.',
  },
  {
    image: '/images/python.png',
    name: 'Python',
    description:
      'Bahasa pemrograman serbaguna yang populer dalam data science, backend development, dan machine learning.',
  },
];
