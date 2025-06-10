export default class CareerModel {
  static async getTrendingCareersByIndustry() {
    return [
      {
        industry: "Teknologi",
        careers: [
          {
            name: "Software Engineer",
            description: "Mengembangkan perangkat lunak dan aplikasi.",
            image: "/images/software-engineer.jpg"
          },
          {
            name: "UI/UX Designer",
            description: "Merancang antarmuka pengguna yang menarik dan mudah digunakan.",
            image: "/images/ui-ux-designer.jpg"
          },
          {
            name: "Data Scientist",
            description: "Menganalisis data untuk mendukung pengambilan keputusan.",
            image: "/images/data-scientist.jpg"
          },
          // ... Tambahkan karier lainnya dengan format yang sama
        ]
      },
      {
        industry: "Kesehatan",
        careers: [
          {
            name: "Perawat",
            description: "Memberikan perawatan medis dan dukungan kepada pasien.",
            image: "/images/perawat.jpg"
          },
          {
            name: "Dokter Umum",
            description: "Mendiagnosa dan mengobati berbagai kondisi kesehatan umum.",
            image: "/images/dokter-umum.jpg"
          },
          // ... dan seterusnya
        ]
      },
      {
        industry: "Keuangan",
        careers: [
          {
            name: "Analis Keuangan",
            description: "Menganalisis kondisi keuangan perusahaan atau individu.",
            image: "/images/analis-keuangan.jpg"
          },
          {
            name: "Akuntan",
            description: "Mencatat dan menyusun laporan keuangan.",
            image: "/images/akuntan.jpg"
          },
          // ... dan lainnya
        ]
      }
    ];
  }
}
