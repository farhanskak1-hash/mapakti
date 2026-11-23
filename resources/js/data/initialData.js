export const initialSiteSettings = {
  organizationName: 'MAPAKTI — Mahasiswa Pencinta Alam Universitas Pancasakti Tegal',
  shortName: 'MAPAKTI UPS Tegal',
  tagline: 'Lestari Alamku, Jaya MAPAKTI-ku — Eksplorasi, Konservasi, dan Persaudaraan Rimba',
  establishedYear: '1984',
  baseCampus: 'Universitas Pancasakti Tegal',
  logoUrl: '/images/logo-mapakti.png',

  // Pengaturan & Kustomisasi Menu Navigasi
  navMenus: [
    { id: 'home', label: 'Beranda', path: 'home', isEnabled: true, badge: '' },
    {
      id: 'profil',
      label: 'Profil',
      path: 'profil',
      isEnabled: true,
      badge: '',
      subMenu: [
        { id: 'sejarah', label: 'Sejarah & Visi Misi', path: 'profil', desc: 'Identitas, asas, dan lambang' },
        { id: 'kepengurusan', label: 'Struktur Kepengurusan', path: 'kepengurusan', desc: 'Pengurus per periode aktif' },
        { id: 'anggota', label: 'Data Anggota Publik', path: 'anggota', desc: 'Direktori anggota terverifikasi' }
      ]
    },
    {
      id: 'eksplorasi',
      label: 'Eksplorasi',
      path: 'divisi',
      isEnabled: true,
      badge: '',
      subMenu: [
        { id: 'divisi', label: '3 Divisi Operasional', path: 'divisi', desc: 'Hutan Gunung, RC & KSDA' },
        { id: 'proker', label: 'Program Kerja', path: 'proker', desc: 'Agenda dan realisasi kegiatan' },
        { id: 'kegiatan', label: 'Kegiatan & Ekspedisi', path: 'kegiatan', desc: 'Jadwal & pendaftaran terbuka' }
      ]
    },
    {
      id: 'publikasi',
      label: 'Publikasi',
      path: 'berita',
      isEnabled: true,
      badge: '',
      subMenu: [
        { id: 'berita', label: 'Warta & Berita Rimba', path: 'berita', desc: 'Kabar petualangan & opini' },
        { id: 'galeri', label: 'Galeri Dokumentasi', path: 'galeri', desc: 'Foto ekspedisi & kegiatan' },
        { id: 'diklatsar', label: 'Sejarah DIKLATSAR', path: 'diklatsar', desc: 'Arsip angkatan & pendidikan dasar' }
      ]
    },
    { id: 'prestasi', label: 'Prestasi', path: 'prestasi', isEnabled: true, badge: '' },
    { id: 'kontak', label: 'Kontak', path: 'kontak', isEnabled: true, badge: '' },
    { id: 'daftar-anggota', label: 'Daftar Anggota', path: 'daftar-anggota', isEnabled: true, badge: 'DIBUKA' }
  ],
  
  // Sambutan Ketua Umum (FR-01, FR-16)
  chairmanName: 'M. Bayu Dirgantara',
  chairmanTitle: 'Ketua Umum MAPAKTI Masa Bakti 2024/2025',
  chairmanNia: 'MPK-XXII-2021-118',
  chairmanGreeting: 'Salam Lestari! Selamat datang di situs resmi MAPAKTI Universitas Pancasakti Tegal. Sebagai wadah pembinaan generasi muda pecinta alam di pesisir utara Jawa Tengah, kami terus mengabdi melalui dedikasi konservasi lingkungan hidup, penempaan mental petualangan alam bebas, serta pengabdian masyarakat nyata. Mari bersama menjaga bumi dan menjunjung tinggi Kode Etik Pecinta Alam Indonesia.',
  chairmanPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',

  // Hero Headlines & Slides (NFR-02)
  heroHeadline: 'EKSPLORASI ALAM, KELOLA KELESTARIAN',
  heroSubheadline: 'Wadah pembentukan karakter tangguh, berwawasan ekologis, dan berintegritas tinggi di alam terbuka.',
  heroSlides: [
    {
      id: 'slide-1',
      title: 'Menembus Batas di Atap Slamet 3.428 MDPL',
      subtitle: 'Ekspedisi pendakian rimba gunung, navigasi darat ilmiah, dan manajemen ketahanan alam bebas Divisi Hutan Gunung.',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
      badge: 'Divisi Hutan Gunung'
    },
    {
      id: 'slide-2',
      title: 'Tegaknya Semangat di Tebing Karst Vertikal',
      subtitle: 'Penguasaan teknik tali-temali, safety rigging, dan pemanjatan tebing alam maupun dinding artifisial Divisi Rock Climbing.',
      imageUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1600&q=80',
      badge: 'Divisi Rock Climbing'
    },
    {
      id: 'slide-3',
      title: 'Menghijaukan Pesisir Pantura & Hutan Lereng',
      subtitle: 'Aksi nyata rehabilitasi 5.000 bibit mangrove dan pelestarian keanekaragaman hayati Divisi Konservasi Sumber Daya Alam.',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80',
      badge: 'Divisi Konservasi Sumber Daya Alam'
    }
  ],

  // Counter Angka Statistik Beranda
  stats: {
    activeMembers: '50+',
    membersLabel: 'Anggota & Kader',
    divisions: '3',
    divisionsLabel: 'Divisi Operasional',
    expeditions: '40+',
    expeditionsLabel: 'Ekspedisi Sukses',
    achievements: '15+',
    achievementsLabel: 'Rekor Prestasi'
  },

  // Running Ticker (FR-01)
  announcementTicker: 'PENGUMUMAN: Pendaftaran DIKLATSAR Calon Anggota Baru Gelombang I Tahun 2025 resmi DIBUKA! Pendaftaran online dapat diakses melalui menu "Pendaftaran Anggota". | Selamat atas suksesnya Ekspedisi Konservasi Mangrove Pesisir Tegal.',

  // Kontak Sekretariat (FR-15)
  secretariatAddress: 'Gedung Pusat Kegiatan Mahasiswa (PKM) Lt. 1, Universitas Pancasakti Tegal, Jl. Halmahera KM. 1, Mintaragen, Kec. Tegal Timur, Kota Tegal, Jawa Tengah 52121',
  email: 'sekretariat@mapakti.or.id',
  phone: '+62 858-7654-3210',
  whatsappNumber: '6285876543210',
  operationalHours: 'Senin - Sabtu: 10:00 - 21:00 WIB',
  socialMedia: {
    instagram: 'https://instagram.com/mapakti_upstegal',
    youtube: 'https://youtube.com/@mapakti_official',
    facebook: 'https://facebook.com/mapakti.upstegal',
    tiktok: 'https://tiktok.com/@mapakti_upstegal'
  },

  // Color Palette Theme (NFR-02)
  colors: {
    primaryYellow: '#F5C400',
    primaryNavy: '#102A56',
    darkBase: '#171717'
  },

  // Pendaftaran Calon Anggota (Google Form & Narahubung)
  registrationIsOpen: true,
  registrationTitle: 'Pendaftaran Calon Anggota & DIKLATSAR MAPAKTI',
  registrationSubtitle: 'Terbuka bagi seluruh mahasiswa aktif Universitas Pancasakti Tegal yang bertekad menempa diri di kawah candradimuka pecinta alam.',
  registrationGformUrl: 'https://forms.gle/mapakti-diklatsar-reg',
  registrationGuideText: 'Silakan isi formulir online resmi melalui tautan Google Form di bawah ini, kemudian konfirmasikan ke salah satu kontak narahubung (Contact Person) panitia.',
  registrationRequirements: [
    'Mahasiswa aktif Universitas Pancasakti Tegal (Semua Fakultas/Program Studi)',
    'Memiliki minat, komitmen, dan integritas tinggi terhadap pelestarian alam dan petualangan',
    'Sehat jasmani dan rohani untuk kegiatan alam bebas',
    'Mengisi formulir pendaftaran resmi melalui Google Form panitia',
    'Mengikuti seluruh rangkaian pengarahan (Technical Meeting) dan DIKLATSAR'
  ],
  registrationContactPersons: [
    {
      id: 'cp-1',
      name: 'Bayu Dirgantara',
      role: 'Ketua Umum MAPAKTI',
      phone: '085876543210',
      whatsapp: '6285876543210'
    },
    {
      id: 'cp-2',
      name: 'Rian Setiawan',
      role: 'Koordinator Pendaftaran & Diklat',
      phone: '081234567890',
      whatsapp: '6281234567890'
    }
  ],

  // SEO Settings (FR-18)
  metaTitle: 'MAPAKTI UPS Tegal — Mahasiswa Pencinta Alam Universitas Pancasakti Tegal',
  metaDescription: 'Website Resmi MAPAKTI Universitas Pancasakti Tegal. Pusat dokumentasi petualangan alam bebas, kegiatan konservasi, info DIKLATSAR, dan pendaftaran anggota baru.',
  metaKeywords: 'MAPAKTI, Mahasiswa Pencinta Alam, UPS Tegal, Diklatsar, Ekspedisi Gunung Slamet, Hutan Gunung, Rock Climbing, Konservasi Sumber Daya Alam, Tegal',

  // Kredensial Administrator (Dapat diubah via Panel Admin)
  adminAccount: {
    email: 'admin@mapakti.tegal',
    password: 'MAPAKTI17JULI',
    isCustom: false,
    updatedAt: 'Bawaan Default'
  }
};

export const initialProfile = {
  headerBadge: 'Profil Resmi Organisasi',
  title: 'Sejarah, Visi, Misi & Falsafah MAPAKTI',
  subtitle: 'Mengenal jati diri Mahasiswa Pencinta Alam Universitas Pancasakti Tegal sebagai wadah pembinaan generasi muda rimbawan sejak 1984.',
  historyBadge: 'Kilas Sejarah',
  historyHeadline: 'Empat Dekade Mengabdi untuk Alam & Almamater',
  historyShortDesc: 'Didirikan di Kampus Universitas Pancasakti Tegal dengan semangat Tri Dharma Perguruan Tinggi dan Kode Etik Pecinta Alam Indonesia.',
  establishedYear: '1996',
  campusBase: 'UPS Tegal',
  logoUrl: '/images/logo-mapakti.png',
  history: `MAPAKTI (Mahasiswa Pencinta Alam Universitas Pancasakti Tegal) didirikan atas inisiatif sekelompok mahasiswa yang memiliki kecintaan mendalam terhadap kelestarian alam dan hasrat bereksplorasi di alam bebas. Sejak diresmikan di lingkungan kampus Universitas Pancasakti Tegal, MAPAKTI telah menjadi kawah candradimuka penempaan karakter kepemimpinan, kepedulian ekologis, dan ketangguhan fisik serta mental bagi ribuan kader.

Melalui perjalanan empat dekade, MAPAKTI telah menjelajahi puncak-puncak gunung di seantero Nusantara, menembus lorong karst bawah tanah, menaklukkan tebing terjal alam bebas, serta mengarungi sungai-sungai berarus deras. Lebih dari sekadar petualangan, MAPAKTI senantiasa konsisten hadir di garda terdepan aksi kemanusiaan SAR kebencanaan dan program konservasi pesisir pantai utara Jawa Tengah.`,
  
  vision: 'Terwujudnya insan akademis pencinta alam yang bertaqwa, berwawasan lingkungan hidup, berjiwa ksatria, berintegritas tinggi, dan berkontribusi nyata bagi kelestarian alam serta masyarakat dalam bingkai Tri Dharma Perguruan Tinggi.',
  
  missions: [
    'Menumbuhkembangkan kesadaran, kepedulian, dan aksi nyata dalam menjaga kelestarian alam dan lingkungan hidup.',
    'Mengembangkan keilmuan dan ketrampilan petualangan alam terbuka secara ilmiah, etis, aman, dan bertanggung jawab.',
    'Menyelenggarakan sistem kaderisasi berjenjang (DIKLATSAR) yang disiplin, humanis, dan berkesinambungan.',
    'Berperan aktif dalam mitigasi bencana, operasi Search and Rescue (SAR), serta pengabdian kepada masyarakat luas.',
    'Mempererat persaudaraan antar pencinta alam di tingkat universitas, regional, maupun nasional.'
  ],

  ethicsTitle: 'KODE ETIK PECINTA ALAM',
  ethicsPreamble: `Pecinta Alam Indonesia sadar bahwa alam beserta isinya adalah ciptaan Tuhan Yang Maha Esa.
Pecinta Alam Indonesia sebagai bagian dari masyarakat Indonesia sadar akan tanggungjawab terhadap Tuhan, Bangsa, dan Tanah Air.
Pecinta Alam Indonesia sadar bahwa segenap Pecinta Alam adalah saudara, sebagai mahluk yang mencintai alam sebagai anugerah Tuhan Yang Maha Esa.
Sesuai dengan hakekat diatas kami dengan kesadaran menyatakan sebagai berikut:`,

  codeOfEthics: [
    'Mengabdi kepada Tuhan Yang Maha Esa.',
    'Memelihara alam beserta isinya, serta menggunakan sumber alam sesuai batas kebutuhan.',
    'Mengabdi kepada Bangsa dan Tanah Air.',
    'Menghormati tata kehidupan yang berlaku pada masyarakat sekitarnya, serta menghargai manusia sesuai martabatnya.',
    'Berusaha mempererat tali persaudaraan sesama Pecinta Alam, sesuai dengan asas dan tujuan Pecinta Alam.',
    'Berusaha saling membantu dan saling menghargai dalam pelaksanaan pengabdian terhadap Tuhan, Bangsa dan Tanah Air.',
    'Selesai.'
  ],

  ethicsRatification: `Disahkan dalam\nForum Gladian IV di Ujung Pandang,\nTanggal 28 Januari 1974\nPukul 01.00 WITA`,

  symbolMeaning: [
    { 
      label: 'Bintang Mata Angin Merah Putih (8 Penjuru)', 
      desc: 'Melambangkan pedoman navigasi arah hidup, kompas moral dan intelektual ke delapan penjuru mata angin, yang berlandaskan jiwa nasionalisme Merah Putih membela keutuhan NKRI.' 
    },
    { 
      label: 'Lingkaran Kuning (UKM MAPAKTI ★ UPS TEGAL)', 
      desc: 'Wadah persatuan, kejayaan, optimisme, dan kecerdasan intelektual keluarga besar Unit Kegiatan Mahasiswa Pencinta Alam di bawah naungan Universitas Pancasakti Tegal.' 
    },
    { 
      label: 'Siluet Gunung Hijau', 
      desc: 'Melambangkan keagungan alam, keteguhan tekad yang kokoh menjulang tinggi, serta komitmen menjaga kelestarian bumi dan rimba belantara nusantara.' 
    },
    { 
      label: 'Tapak Kaki (Footprint)', 
      desc: 'Filosofi luhur penggiat alam bebas: "Hanya meninggalkan jejak, hanya mengambil gambar, dan hanya membunuh waktu", sekaligus simbol langkah nyata pengabdian di setiap medan.' 
    }
  ]
};

export const initialDivisions = [
  {
    id: 'div-hg',
    name: 'Divisi Hutan Gunung',
    code: 'HG',
    tagline: 'Ketinggian Mengajarkan Kerendahan Hati di Hadapan Semesta',
    shortDesc: 'Fokus pada eksplorasi rimba gunung hutan tropis, navigasi darat ilmiah (peta topografi, kompas bidik, resection), manajemen logistik survival, bivak, dan mitigasi bahaya alam bebas.',
    mainTasks: [
      'Penyusunan rute ekspedisi dan pembacaan peta kontur topografi ketinggian pegunungan.',
      'Pelatihan teknik survival hutan hujan tropis dan navigasi darat (NAVDRAT).',
      'Manajemen ketahanan fisik dan penanganan hipotermia / mountain sickness.',
      'Operasi bantuan SAR (Search and Rescue) di jalur pendakian rimba pegunungan.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    stats: { expeditions: 48, activeMembers: 22 }
  },
  {
    id: 'div-rc',
    name: 'Divisi Rock Climbing',
    code: 'RC',
    tagline: 'Genggaman Kuat di Dinding Terjal Tanpa Keraguan',
    shortDesc: 'Mengembangkan ketangkasan panjat tebing alami dan dinding artifisial, teknik penambatan (belaying & anchoring), vertical rescue, serta pemeliharaan sarana wall climbing kampus UPS Tegal.',
    mainTasks: [
      'Latihan rutin bouldering, lead climbing, dan speed climbing di wall climbing kampus.',
      'Eksplorasi tebing alam (natural rock) di kawasan tebing kapur dan andesit nusantara.',
      'Sertifikasi rigging tali-temali, instalasi anchor, dan standar keselamatan pemanjatan tinggi.',
      'Pembinaan atlet mahasiswa untuk kejuaraan panjat tebing regional dan nasional.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1000&q=80',
    stats: { expeditions: 36, activeMembers: 18 }
  },
  {
    id: 'div-ksda',
    name: 'Divisi Konservasi Sumber Daya Alam',
    code: 'KSDA',
    tagline: 'Satu Pohon Menyelamatkan Nafas Masa Depan Bumi',
    shortDesc: 'Garda konservasi MAPAKTI dalam rehabilitasi lahan kritis, penghijauan pesisir mangrove Pantura Tegal, konservasi mata air lereng gunung, dan advokasi pelestarian lingkungan hidup.',
    mainTasks: [
      'Pengadaan bibit dan penanaman mangrove di pesisir Pantura Muarareja Kota Tegal.',
      'Aksi konservasi lereng Gunung Slamet untuk mencegah tanah longsor dan menjaga kelestarian mata air.',
      'Pendidikan sadar konservasi sumber daya alam ke sekolah-sekolah dan masyarakat pesisir.',
      'Riset keanekaragaman hayati (biodiversitas) flora-fauna serta kampanye cinta bumi.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    stats: { expeditions: 52, activeMembers: 25 }
  }
];

export const initialPeriods = [
  {
    id: 'period-2024-2025',
    name: 'Periode 2024 / 2025',
    theme: 'Sinergi Rimbawan Berintegritas & Berdaya Saing',
    status: 'Aktif',
    members: [
      { id: 'peng-1', name: 'M. Bayu Dirgantara', position: 'Ketua Umum', division: 'Hutan Gunung', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', faculty: 'Fakultas Teknik' },
      { id: 'peng-2', name: 'Dian Permatasari', position: 'Wakil Ketua Umum', division: 'Konservasi Sumber Daya Alam', photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80', faculty: 'Fakultas Keguruan dan Ilmu Pendidikan' },
      { id: 'peng-3', name: 'Rangga Aditya Pratama', position: 'Sekretaris Umum', division: 'Rock Climbing', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', faculty: 'Fakultas Hukum' },
      { id: 'peng-4', name: 'Anisa Cindy Larasati', position: 'Bendahara Umum', division: 'Hutan Gunung', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', faculty: 'Fakultas Ekonomi dan Bisnis' },
      { id: 'peng-5', name: 'Gilang Ramadhan', position: 'Koordinator Divisi Hutan Gunung', division: 'Hutan Gunung', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', faculty: 'Fakultas Perikanan dan Ilmu Kelautan' },
      { id: 'peng-6', name: 'Bagas Prasetyo', position: 'Koordinator Divisi Rock Climbing', division: 'Rock Climbing', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80', faculty: 'Fakultas Teknik' },
      { id: 'peng-7', name: 'Fajar Tri Wicaksono', position: 'Koordinator Divisi Konservasi Sumber Daya Alam', division: 'Konservasi Sumber Daya Alam', photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80', faculty: 'Fakultas Ilmu Sosial dan Ilmu Politik' }
    ]
  },
  {
    id: 'period-2023-2024',
    name: 'Periode 2023 / 2024',
    theme: 'Membangkitkan Semangat Pengembara Menembus Tantangan',
    status: 'Arsip',
    members: [
      { id: 'peng-old-1', name: 'Arief Kurniawan', position: 'Ketua Umum', division: 'Hutan Gunung', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80', faculty: 'Fakultas Teknik' },
      { id: 'peng-old-2', name: 'Maya Anggraini', position: 'Sekretaris Umum', division: 'Konservasi Sumber Daya Alam', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80', faculty: 'Fakultas Hukum' }
    ]
  }
];

export const initialMembers = [
  {
    id: 'mem-1',
    name: 'M. Bayu Dirgantara',
    nia: 'MPK-XXII-2021-118',
    generation: 'Angkatan XXII - Tapak Rimba',
    joinYear: 2021,
    faculty: 'Fakultas Teknik',
    membershipStatus: 'Anggota Tetap',
    specializationDivision: 'Hutan Gunung',
    isPublished: true, // Sesuai FR-04: hanya yang true ditampilkan di publik
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    achievements: 'Pimpinan Ekspedisi Puncak Slamet & Sumbing 2023',
    phone: '085876543210',
    email: 'bayu.dirgantara@mail.com'
  },
  {
    id: 'mem-2',
    name: 'Dian Permatasari',
    nia: 'MPK-XXII-2021-124',
    generation: 'Angkatan XXII - Tapak Rimba',
    joinYear: 2021,
    faculty: 'Fakultas Keguruan dan Ilmu Pendidikan',
    membershipStatus: 'Anggota Tetap',
    specializationDivision: 'Konservasi Sumber Daya Alam',
    isPublished: true,
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    achievements: 'Koordinator Riset Rehabilitasi Mangrove Muarareja',
    phone: '081234567891',
    email: 'dian.permatasari@mail.com'
  },
  {
    id: 'mem-3',
    name: 'Rangga Aditya Pratama',
    nia: 'MPK-XXIII-2022-135',
    generation: 'Angkatan XXIII - Badai Karst',
    joinYear: 2022,
    faculty: 'Fakultas Hukum',
    membershipStatus: 'Anggota Tetap',
    specializationDivision: 'Rock Climbing',
    isPublished: true,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    achievements: 'Juara 2 Lead Climbing Antar Perguruan Tinggi Jateng 2024',
    phone: '089876543210',
    email: 'rangga.aditya@mail.com'
  },
  {
    id: 'mem-4',
    name: 'Anisa Cindy Larasati',
    nia: 'MPK-XXIII-2022-140',
    generation: 'Angkatan XXIII - Badai Karst',
    joinYear: 2022,
    faculty: 'Fakultas Ekonomi dan Bisnis',
    membershipStatus: 'Anggota Luar Biasa',
    specializationDivision: 'Hutan Gunung',
    isPublished: true,
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    achievements: 'Tim Navigasi Darat Ekspedisi Gunung Slamet 2023',
    phone: '082134567890',
    email: 'anisa.cindy@mail.com'
  },
  {
    id: 'mem-5',
    name: 'Fahrur Rozi (Internal Privat)',
    nia: 'MPK-XXIV-2023-151',
    generation: 'Angkatan XXIV - Kabut Lembah',
    joinYear: 2023,
    faculty: 'Fakultas Teknik',
    membershipStatus: 'Anggota Muda',
    specializationDivision: 'Rock Climbing',
    isPublished: false, // PRIVAT SESUAI PRD FR-04: Tidak boleh tampil di publik
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    achievements: 'Lulusan Terbaik DIKLATSAR Lapangan XXIV',
    phone: '081398765432',
    email: 'rozi.privat@mail.com'
  },
  {
    id: 'mem-6',
    name: 'Luthfi Hakim',
    nia: 'MPK-XXIV-2023-155',
    generation: 'Angkatan XXIV - Kabut Lembah',
    joinYear: 2023,
    faculty: 'Fakultas Keguruan dan Ilmu Pendidikan',
    membershipStatus: 'Anggota Tetap',
    specializationDivision: 'Konservasi Sumber Daya Alam',
    isPublished: true,
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    achievements: 'Koordinator Lapangan Konservasi Mangrove Pantura',
    phone: '085712345678',
    email: 'luthfi.hakim@mail.com'
  }
];

export const initialWorkPrograms = [
  {
    id: 'proker-1',
    name: 'DIKLATSAR (Pendidikan dan Pelatihan Dasar) XXX',
    divisionOrField: 'Bidang Kaderisasi & Organisasi',
    targetAudience: 'Mahasiswa Baru & Anggota Calon UPS Tegal',
    timeline: 'November - Desember 2024',
    output: 'Lulusnya 30 kader muda pecinta alam berintegritas dan siap tempur',
    budgetEstimated: 'Rp 14.500.000',
    status: 'Sedang Berjalan'
  },
  {
    id: 'proker-2',
    name: 'Ekspedisi Konservasi & Penanaman 5.000 Mangrove',
    divisionOrField: 'Divisi Konservasi Sumber Daya Alam',
    targetAudience: 'Masyarakat Pesisir Muarareja & Pelajar',
    timeline: 'Februari 2025',
    output: 'Tanam 5.000 bibit mangrove dan zonasi pemantauan abrasi',
    budgetEstimated: 'Rp 18.000.000',
    status: 'Rencana'
  },
  {
    id: 'proker-3',
    name: 'Kompetisi Panjat Dinding Mahasiswa MAPAKTI Cup IV',
    divisionOrField: 'Divisi Rock Climbing',
    targetAudience: 'Mapala & Sispala Se-Jawa Tengah',
    timeline: 'April 2025',
    output: 'Menghadirkan 120 atlet boulder & lead climbing kategori umum',
    budgetEstimated: 'Rp 22.000.000',
    status: 'Rencana'
  },
  {
    id: 'proker-4',
    name: 'Bakti Lingkungan & Mitigasi Jalur Pendakian Guci Slamet',
    divisionOrField: 'Divisi Hutan Gunung',
    targetAudience: 'Pendaki Umum & Warga Kawasan Guci Tegal',
    timeline: 'Agustus 2024',
    output: 'Pemasangan rambu evakuasi, pembersihan 300kg sampah di Pos 1-4',
    budgetEstimated: 'Rp 6.800.000',
    status: 'Terlaksana'
  },
  {
    id: 'proker-5',
    name: 'Ekspedisi Survival & Penjelajahan Rimba Hutan Ciremai',
    divisionOrField: 'Divisi Hutan Gunung',
    targetAudience: 'Anggota Muda & BPH MAPAKTI',
    timeline: 'September 2024',
    output: 'Penguasaan bivak survival dan navigasi resection malam hari',
    budgetEstimated: 'Rp 9.200.000',
    status: 'Terlaksana'
  }
];

export const initialActivities = [
  {
    id: 'act-1',
    name: 'Ekspedisi Atap Jawa Tengah: Gunung Slamet 3.428 MDPL',
    type: 'Ekspedisi',
    description: 'Pendakian jalur eksplorasi lereng utara Guci - Permadi, latihan navigasi darat malam hari (night navigation), serta pengambilan sampel vegetasi cantigi gunung.',
    location: 'Gunung Slamet via Guci, Tegal - Pemalang',
    startDate: '2024-12-14',
    endDate: '2024-12-17',
    pic: 'Gilang Ramadhan (Kabid Operasional)',
    committeeSummary: '16 panitia logistik, medis lapangan, dan navigator bersertifikat.',
    budget: 'Rp 8.500.000',
    status: 'Akan Datang',
    isRegistrationOpen: true, // FR-08: Pendaftaran dibuka
    maxParticipants: 25,
    registeredCount: 14,
    documentationImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'
    ],
    reportSummary: 'Persiapan fisik dan briefing perlengkapan standar packing telah mencapai 85%. Jalur pendakian dalam status aman terkendali.'
  },
  {
    id: 'act-2',
    name: 'Workshop Navigasi Darat & Vertical Rescue Mapala',
    type: 'Pelatihan',
    description: 'Pelatihan intensif membaca peta topografi Bakosurtanal, pemanfaatan GPS alam bebas, serta teknik evakuasi korban jatuh dari tebing terjal.',
    location: 'Wall Climbing Kampus 1 UPS Tegal & Hutan Kota',
    startDate: '2024-11-28',
    endDate: '2024-11-29',
    pic: 'Rangga Aditya (Divisi RC)',
    committeeSummary: 'Instruktur bersertifikasi FPTI dan Basarnas Jawa Tengah.',
    budget: 'Rp 4.200.000',
    status: 'Akan Datang',
    isRegistrationOpen: true,
    maxParticipants: 40,
    registeredCount: 32,
    documentationImages: [
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80'
    ],
    reportSummary: 'Terbuka untuk anggota muda dan mahasiswa umum yang berminat mendalami safety rigging.'
  },
  {
    id: 'act-3',
    name: 'Aksi Bersih Pantai & Tanam 1.000 Mangrove Muarareja',
    type: 'Bakti Sosial & Konservasi',
    description: 'Kolaborasi penanaman bibit mangrove jenis Rhizophora mucronata guna menahan gelombang pasang air laut rob di pesisir utara Tegal.',
    location: 'Pantai Muarareja, Kota Tegal',
    startDate: '2024-09-22',
    endDate: '2024-09-22',
    pic: 'Dian Permatasari (Kabid KSDA)',
    committeeSummary: 'Melibatkan 120 relawan mahasiswa dan nelayan setempat.',
    budget: 'Rp 7.000.000',
    status: 'Selesai',
    isRegistrationOpen: false, // FR-08: Pendaftaran ditutup
    maxParticipants: 100,
    registeredCount: 112,
    documentationImages: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80'
    ],
    reportSummary: 'Sukses menanam 1.250 bibit dengan tingkat kelulushidupan mencapai 92% setelah pemantauan 30 hari pertama.'
  },
  {
    id: 'act-4',
    name: 'Ekspedisi Pemanjatan Tebing Karst Parang Ciamis',
    type: 'Ekspedisi',
    description: 'Pemanjatan tebing alam multi-pitch, pemasangan anchor pengaman vertikal, dan simulasi vertical rescue Divisi Rock Climbing.',
    location: 'Tebing Karst Parang, Ciamis Jawa Barat',
    startDate: '2024-08-10',
    endDate: '2024-08-11',
    pic: 'Bagas Prasetyo (Divisi Rock Climbing)',
    committeeSummary: 'Dikelola bersama Federasi Panjat Tebing Indonesia (FPTI).',
    budget: 'Rp 6.300.000',
    status: 'Selesai',
    isRegistrationOpen: false,
    maxParticipants: 18,
    registeredCount: 18,
    documentationImages: [
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80'
    ],
    reportSummary: 'Seluruh peserta berhasil menuntaskan pemanjatan dengan standar keselamatan tinggi.'
  }
];

export const initialActivityRegistrations = [
  {
    id: 'act-reg-1',
    activityId: 'act-1',
    activityName: 'Ekspedisi Atap Jawa Tengah: Gunung Slamet 3.428 MDPL',
    participantName: 'Bagus Setiawan',
    identityNumber: '642210041',
    institution: 'Fakultas Teknik UPS Tegal',
    phone: '081234567811',
    email: 'bagus.setiawan@gmail.com',
    registeredAt: '2024-11-10 14:20',
    attendanceStatus: 'Hadir'
  },
  {
    id: 'act-reg-2',
    activityId: 'act-1',
    activityName: 'Ekspedisi Atap Jawa Tengah: Gunung Slamet 3.428 MDPL',
    participantName: 'Nurul Hidayah',
    identityNumber: '642210089',
    institution: 'FKIP UPS Tegal',
    phone: '085799887766',
    email: 'nurul.hidayah@gmail.com',
    registeredAt: '2024-11-12 09:15',
    attendanceStatus: 'Belum Hadir'
  },
  {
    id: 'act-reg-3',
    activityId: 'act-2',
    activityName: 'Workshop Navigasi Darat & Vertical Rescue Mapala',
    participantName: 'Alif Kurnia',
    identityNumber: '642310012',
    institution: 'Fakultas Hukum UPS Tegal',
    phone: '087811223344',
    email: 'alif.kurnia@gmail.com',
    registeredAt: '2024-11-15 16:45',
    attendanceStatus: 'Belum Hadir'
  }
];

export const initialMemberRegistrations = [
  // Sesuai FR-14: 5 field (Nama lengkap, NIM, Fakultas, Nomor HP, Alasan bergabung)
  {
    id: 'reg-1',
    fullName: 'Arya Surya Pratama',
    nim: '642420015',
    faculty: 'Fakultas Teknik',
    phone: '085812345678',
    reason: 'Ingin mendalami ilmu navigasi darat rimba, survival pegunungan, dan memperluas relasi persaudaraan sesama pecinta alam di kampus.',
    createdAt: '2024-11-14 11:32',
    status: 'Menunggu Tinjauan'
  },
  {
    id: 'reg-2',
    fullName: 'Rizka Nur Azizah',
    nim: '642410098',
    faculty: 'Fakultas Keguruan dan Ilmu Pendidikan',
    phone: '081399881122',
    reason: 'Memiliki ketertarikan tinggi pada pelestarian hutan mangrove dan ingin aktif dalam ekspedisi lapangan konservasi pesisir.',
    createdAt: '2024-11-15 14:10',
    status: 'Terverifikasi'
  },
  {
    id: 'reg-3',
    fullName: 'Dimas Wahyu Nugroho',
    nim: '642430044',
    faculty: 'Fakultas Ekonomi dan Bisnis',
    phone: '087755443322',
    reason: 'Ingin mengasah mental kepemimpinan, fisik, serta belajar teknik panjat tebing wall and rock climbing secara profesional.',
    createdAt: '2024-11-16 08:45',
    status: 'Dihubungi'
  }
];

export const initialNews = [
  {
    id: 'news-1',
    title: 'Pendaftaran DIKLATSAR Calon Anggota Baru MAPAKTI Gelombang I Resmi Dibuka',
    slug: 'pendaftaran-diklatsar-calon-anggota-baru-gelombang-1',
    category: 'DIKLATSAR',
    author: 'Humas MAPAKTI',
    publishedDate: '15 November 2024',
    summary: 'Kesempatan emas bagi seluruh mahasiswa Universitas Pancasakti Tegal untuk bergabung dengan kawah candradimuka penempaan pecinta alam sejati.',
    content: `Universitas Pancasakti Tegal — Pengurus Harian Mahasiswa Pencinta Alam Universitas Pancasakti Tegal (MAPAKTI) secara resmi membuka pendaftaran Pendidikan dan Pelatihan Dasar (DIKLATSAR) Calon Anggota Baru Gelombang I.

Pendaftaran terbuka bagi seluruh mahasiswa aktif Universitas Pancasakti Tegal dari berbagai fakultas. DIKLATSAR merupakan gerbang pembinaan komprehensif yang memadukan materi ruangan (teori navigasi darat, mountaineering, survival, tali-temali, dan kode etik pecinta alam) dengan simulasi aplikasi lapangan di alam bebas lereng Gunung Slamet.

Calon peserta dapat mengisi formulir registrasi online secara langsung melalui laman website resmi pada menu "Pendaftaran Anggota". Tahapan seleksi awal akan mencakup pemeriksaan kelengkapan administrasi dan tes kesehatan fisik guna menjamin keselamatan setiap peserta.

"DIKLATSAR bukan sekadar latihan fisik, melainkan pembentukan mental kepemimpinan, kepedulian ekologis, dan persaudaraan tanpa batas," tegas Teguh Prasetyo, Ketua Pelaksana DIKLATSAR.`,
    coverImageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80',
    tags: ['DIKLATSAR', 'Pendaftaran', 'Kaderisasi', 'UPS Tegal'],
    isDraft: false // FR-09: status draft/published
  },
  {
    id: 'news-2',
    title: 'Sukseskan Aksi Pesisir: MAPAKTI Tanam 1.250 Bibit Mangrove di Pantai Muarareja',
    slug: 'sukseskan-aksi-pesisir-mapakti-tanam-mangrove-muarareja',
    category: 'Konservasi',
    author: 'Divisi KSDA',
    publishedDate: '24 September 2024',
    summary: 'Aksi nyata pencegahan abrasi pesisir Pantura Tegal melibatkan ratusan relawan mahasiswa, dinas lingkungan hidup, dan komunitas nelayan lokal.',
    content: `Kota Tegal — Gelombang pasang dan ancaman abrasi pesisir pantai utara Jawa Tengah mendorong Mahasiswa Pencinta Alam Universitas Pancasakti Tegal (MAPAKTI) menginisiasi program penghijauan pesisir di Pantai Muarareja.

Sebanyak 1.250 bibit mangrove jenis Rhizophora mucronata berhasil ditanam di lahan seluas 1,5 hektar. Kegiatan ini turut didukung oleh civitas akademika Universitas Pancasakti Tegal, Dinas Lingkungan Hidup Kota Tegal, serta puluhan relawan dari organisasi mahasiswa pencinta alam se-Karesidenan Pekalongan.

Melalui pendampingan warga pesisir, bibit yang ditanam akan dipantau perkembangannya secara berkala setiap bulan untuk memastikan bibit dapat tumbuh kokoh menjadi sabuk hijau penahan gelombang laut.`,
    coverImageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    tags: ['Konservasi', 'Mangrove', 'Pantura', 'Hari Bumi'],
    isDraft: false
  },
  {
    id: 'news-3',
    title: 'Atlet Rock Climbing MAPAKTI Boyong Trofi Perak di Kejurda Climbing Jateng 2024',
    slug: 'atlet-climbing-mapakti-boyong-trofi-kejurda-jateng',
    category: 'Prestasi',
    author: 'Divisi Rock Climbing',
    publishedDate: '18 Oktober 2024',
    summary: 'Rangga Aditya Pratama sukses meraih peringkat kedua dalam kategori Lead Mahasiswa Putra pada Kejurda Panjat Dinding Jawa Tengah.',
    content: `Semarang — Prestasi membanggakan kembali dipersembahkan oleh punggawa Mahasiswa Pencinta Alam Universitas Pancasakti Tegal (MAPAKTI). Rangga Aditya Pratama berhasil meraih medali perak pada kategori Lead Mahasiswa Putra.

Kompetisi bergengsi ini mempertemukan lebih dari 80 atlet panjat tebing mahasiswa dari universitas ternama se-Jawa Tengah. Melalui teknik pemanjatan yang tenang, daya cengkeram akurat, serta efisiensi gerak pada dinding setinggi 15 meter dengan overhang ekstrem, Rangga membuktikan keunggulan kualitas latihan atlet MAPAKTI.

"Hasil ini merupakan buah dari disiplin latihan intensif di wall climbing kampus serta doa keluarga besar MAPAKTI UPS Tegal," ungkap Rangga usai menerima medali.`,
    coverImageUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1000&q=80',
    tags: ['Prestasi', 'Rock Climbing', 'Kejurda', 'FPTI'],
    isDraft: false
  },
  {
    id: 'news-4',
    title: '[DRAFT] Laporan Rencana Ekspedisi Puncak Cartensz Pyramid 2026',
    slug: 'draft-laporan-rencana-ekspedisi-cartensz-pyramid',
    category: 'Ekspedisi',
    author: 'Tim Ekspedisi Khusus',
    publishedDate: '10 November 2024',
    summary: 'Rencana jangka panjang pendakian puncak salju abadi Papua dalam rangka peringatan Dies Natalis MAPAKTI ke-42.',
    content: `Draft perencanaan teknis ekspedisi Cartensz Pyramid Papua. Dokumen ini masih dalam tahap peninjauan internal tim operasional dan dewan alumni sebelum dipublikasikan secara resmi ke publik.`,
    coverImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    tags: ['Ekspedisi', 'Internal', 'Draft'],
    isDraft: true // FR-09: Tidak boleh muncul di publik
  }
];

export const initialGallery = [
  {
    id: 'gal-1',
    title: 'Kibaran Merah Putih di Puncak Slamet 3.428 MDPL',
    category: 'Hutan Gunung',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    date: '17 Agustus 2024',
    location: 'Puncak Gunung Slamet, Jawa Tengah',
    description: 'Upacara peringatan HUT Kemerdekaan RI di bibir kawah Gunung Slamet oleh kontingen ekspedisi MAPAKTI.'
  },
  {
    id: 'gal-2',
    title: 'Aksi Pemanjatan Tebing Karst Vertikal',
    category: 'Rock Climbing',
    imageUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1000&q=80',
    date: '05 Mei 2024',
    location: 'Tebing Kapur Ciampea',
    description: 'Pemanjat divisi rock climbing MAPAKTI mempraktikkan teknik lead climbing dan placing protection tebing alam.'
  },
  {
    id: 'gal-3',
    title: 'Navigasi Rimba & Manajemen Bivak Hutan Lembah',
    category: 'Hutan Gunung',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
    date: '19 Juni 2024',
    location: 'Hutan Lereng Slamet Utara',
    description: 'Praktek membaca peta kontur topografi dan mendirikan bivak darurat di tengah lebatnya vegetasi tropis.'
  },
  {
    id: 'gal-4',
    title: 'Latihan Rutin Bouldering Wall Climbing Kampus',
    category: 'Rock Climbing',
    imageUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1000&q=80',
    date: '14 Juli 2024',
    location: 'Wall Climbing PKM UPS Tegal',
    description: 'Pengasahan teknik footwork, finger grip, dan kelenturan tubuh atlet panjat tebing MAPAKTI.'
  },
  {
    id: 'gal-5',
    title: 'Penanaman Bibit Mangrove Pesisir Pantai Tegal',
    category: 'Konservasi',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    date: '22 September 2024',
    location: 'Pesisir Muarareja Tegal',
    description: 'Aksi gotong royong anggota MAPAKTI bersama masyarakat menanam bibit bakau penahan rob.'
  },
  {
    id: 'gal-6',
    title: 'Upacara Pembaiatan & Penyematan Slayer DIKLATSAR',
    category: 'Diklatsar',
    imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80',
    date: '28 Januari 2024',
    location: 'Hutan Pinus Lereng Slamet Guci',
    description: 'Momen sakral pengukuhan anggota muda setelah menuntaskan 7 hari pengembaraan rimba belantara.'
  }
];

export const initialDiklatsarEvents = [
  // Sesuai FR-11: Sejarah dan dokumentasi foto DIKLATSAR
  {
    id: 'dks-26',
    batchNumber: 'XXVI',
    batchName: 'Angkatan Darpa Anargya',
    year: '2025',
    location: 'Lereng Gunung Slamet',
    graduatedCount: 13,
    historyNotes: 'DARPA ANARGYA merupakan nama Angkatan XXVI UKM MAPAKTI yang memiliki arti Kebanggaan yang Tak Terhingga Nilainya. Nama ini menjadi identitas sekaligus simbol kebanggaan atas perjalanan, perjuangan, dan ikatan persaudaraan yang terjalin, serta pengingat untuk terus menjaga nilai-nilai kepecintaalaman dalam keluarga besar MAPAKTI.',
    coverImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'dks-25',
    batchNumber: 'XXV',
    batchName: 'Angkatan Surya Rimba',
    year: '2024',
    location: 'Hutan Wisata Guci & Lereng Slamet',
    graduatedCount: 20,
    historyNotes: 'Pendidikan dasar pengembaraan rimba dan pendakian orientasi navigasi darat dengan rute pengembaraan sepanjang 40 kilometer melintasi jalur punggungan.',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'dks-24',
    batchNumber: 'XXIV',
    batchName: 'Angkatan Kabut Lembah',
    year: '2023',
    location: 'Hutan Pendidikan Guci & Lereng Gunung Slamet',
    graduatedCount: 22,
    historyNotes: 'DIKLATSAR XXIV menempuh rute pengembaraan sepanjang 45 kilometer melintasi perbukitan karst dan punggungan hutan basah. Diuji dengan cuaca badai hujan lebat dan navigasi malam, angkatan ini membuktikan ketangguhan mental serta solidaritas tanpa pamrih.',
    coverImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'dks-23',
    batchNumber: 'XXIII',
    batchName: 'Angkatan Badai Karst',
    year: '2022',
    location: 'Kawasan Karst Gombong & Kawasan Hutan Wisata Guci',
    graduatedCount: 19,
    historyNotes: 'DIKLATSAR XXIII berfokus pada penguasaan medan perbukitan terjal dan teknik rock climbing dasar. Melahirkan kader-kader yang kini menjadi tulang punggung divisi teknis hutan gunung dan panjat tebing.',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'dks-22',
    batchNumber: 'XXII',
    batchName: 'Angkatan Tapak Rimba',
    year: '2021',
    location: 'Kawasan Konservasi Hutan Slamet Utara',
    graduatedCount: 26,
    historyNotes: 'DIKLATSAR pasca-pandemi yang membangkitkan kembali semangat eksplorasi penuh. Angkatan ini berhasil melahirkan kepengurusan BPH yang solid dan inovatif.',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const initialAchievements = [
  // Sesuai FR-12: Prestasi Organisasi
  {
    id: 'ach-1',
    title: 'Juara 2 Lead Climbing Kejuaraan Panjat Dinding Mahasiswa Jawa Tengah',
    category: 'Rock Climbing',
    level: 'Tingkat Jawa Tengah',
    year: 2024,
    recipient: 'Rangga Aditya Pratama (Divisi RC)',
    certificateImageUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80',
    description: 'Meraih medali perak kategori Lead Mahasiswa dalam kompetisi yang diikuti oleh perwakilan 28 perguruan tinggi se-Jawa Tengah.'
  },
  {
    id: 'ach-2',
    title: 'Penghargaan Komunitas Peduli Pesisir & Lingkungan Hidup Kota Tegal',
    category: 'Konservasi Lingkungan',
    level: 'Tingkat Kota Tegal',
    year: 2024,
    recipient: 'Divisi KSDA MAPAKTI UPS Tegal',
    certificateImageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    description: 'Dianugerahi oleh Walikota Tegal atas dedikasi konsisten dalam rehabilitasi hutan mangrove di pesisir utara Tegal selama 5 tahun berturut-turut.'
  },
  {
    id: 'ach-3',
    title: 'Juara 1 Lomba Navigasi Darat (NAVDRAT) Rimba Belantara Mapala Regional',
    category: 'Mountaineering & Navigasi',
    level: 'Tingkat Regional Jateng-DIY',
    year: 2023,
    recipient: 'Tim Navigasi MAPAKTI (Bayu Dirgantara & Gilang R.)',
    certificateImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    description: 'Berhasil mencatatkan waktu tercepat dan ketepatan koordinat plotting 100% pada rute medan ekstrem 20 km lereng Gunung Merbabu.'
  },
  {
    id: 'ach-4',
    title: 'Apresiasi Operasi Kemanusiaan SAR Evakuasi Bencana Tanah Longsor',
    category: 'Search & Rescue (SAR)',
    level: 'Tingkat Karesidenan Pekalongan',
    year: 2022,
    recipient: 'Tim Reaksi Cepat SAR MAPAKTI UPS Tegal',
    certificateImageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80',
    description: 'Piagam penghargaan dari Basarnas Pos SAR Brebes-Tegal atas partisipasi aktif dalam operasi pertolongan korban bencana alam.'
  }
];

export const initialAlumni = [
  // Sesuai FR-13: Data Alumni yang diizinkan untuk dipublikasikan
  {
    id: 'alm-1',
    name: 'Ir. Hendro Wicaksono, M.T.',
    nia: 'MPK-V-1994-028',
    batchNumber: 'V (Angkatan Badai Rimba)',
    graduationYear: 1998,
    currentCareer: 'Senior Environmental Consultant & QHSE Manager',
    companyOrInstitution: 'PT Petrochemical Nusatama',
    testimony: 'Kawah candradimuka MAPAKTI mengajarkan saya kepemimpinan di bawah tekanan ekstrem dan kecintaan tulus terhadap alam semesta. Bekal berharga yang mengantar karier saya hingga kini.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    isPublished: true
  },
  {
    id: 'alm-2',
    name: 'dr. Ratna Kartika, Sp.A.',
    nia: 'MPK-VIII-1997-049',
    batchNumber: 'VIII (Angkatan Cakrawala)',
    graduationYear: 2002,
    currentCareer: 'Dokter Spesialis Anak & Relawan Medis Kebencanaan',
    companyOrInstitution: 'RSUD Kardinah Kota Tegal',
    testimony: 'Di MAPAKTI saya belajar arti persaudaraan sejati tanpa sekat. Ketika turun ke medan bencana alam, solidaritas rimbawan selalu terbukti paling tangguh dan ikhlas.',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    isPublished: true
  },
  {
    id: 'alm-3',
    name: 'Bambang Triyono, S.H.',
    nia: 'MPK-XII-2004-073',
    batchNumber: 'XII (Angkatan Tapak Karst)',
    graduationYear: 2008,
    currentCareer: 'Advokat Lingkungan & Pemerhati Hukum Agraria',
    companyOrInstitution: 'Kantor Hukum Triyono & Partners',
    testimony: 'Semangat membela kelestarian alam terus hidup di ruang sidang hukum. MAPAKTI menempa nurani untuk tidak pernah gentar membela yang hak.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    isPublished: true
  },
  {
    id: 'alm-4',
    name: 'Surya Dharma (Alumni Privat)',
    nia: 'MPK-XIV-2006-088',
    batchNumber: 'XIV',
    graduationYear: 2010,
    currentCareer: 'Wirausahawan Outdoor Gear',
    companyOrInstitution: 'Sinar Rimba Adventure',
    testimony: 'Alumni privat yang belum menandai izin publikasi data.',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    isPublished: false // PRIVAT SESUAI PRD FR-13: Hanya tampil jika isPublished = true
  }
];

export const initialAuditLogs = [
  // Sesuai FR-20: Audit Log aktivitas admin
  {
    id: 'log-1',
    timestamp: '2024-11-16 09:30',
    user: 'admin@mapakti.tegal',
    action: 'CREATE',
    module: 'Kegiatan & Ekspedisi',
    details: 'Menambahkan kegiatan baru "Ekspedisi Atap Jawa Tengah: Gunung Slamet 3.428 MDPL"'
  },
  {
    id: 'log-2',
    timestamp: '2024-11-15 14:15',
    user: 'admin@mapakti.tegal',
    action: 'UPDATE',
    module: 'Pendaftaran Anggota',
    details: 'Memverifikasi calon pendaftar atas nama Rizka Nur Azizah (NIM: 642410098)'
  },
  {
    id: 'log-3',
    timestamp: '2024-11-14 16:40',
    user: 'admin@mapakti.tegal',
    action: 'PUBLISH',
    module: 'Berita & Publikasi',
    details: 'Menerbitkan berita "Pendaftaran DIKLATSAR Calon Anggota Baru Gelombang I"'
  },
  {
    id: 'log-4',
    timestamp: '2024-11-12 11:20',
    user: 'admin@mapakti.tegal',
    action: 'PRIVACY_TOGGLE',
    module: 'Data Anggota',
    details: 'Mengubah izin publikasi anggota Fahrur Rozi menjadi PRIVAT'
  }
];

export const initialNotifications = [
  // Sesuai FR-19: Notifikasi Dashboard Admin
  {
    id: 'notif-1',
    title: 'Pendaftaran Anggota Baru',
    message: 'Arya Surya Pratama (Fakultas Teknik) baru saja mengisi formulir pendaftaran calon anggota.',
    type: 'registration',
    createdAt: '14 Nov 2024, 11:32',
    isRead: false
  },
  {
    id: 'notif-2',
    title: 'Peserta Kegiatan Baru',
    message: 'Alif Kurnia mendaftar pada Workshop Navigasi Darat & Vertical Rescue.',
    type: 'activity_reg',
    createdAt: '15 Nov 2024, 16:45',
    isRead: false
  },
  {
    id: 'notif-3',
    title: 'Pendaftaran Calon Anggota',
    message: 'Dimas Wahyu Nugroho (Fakultas Ekonomi dan Bisnis) mendaftar keanggotaan baru.',
    type: 'registration',
    createdAt: '16 Nov 2024, 08:45',
    isRead: false
  }
];
