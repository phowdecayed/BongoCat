export default {
  common: {
    loading: 'Memuat...'
  },
  main: {
    redrawing: 'Menggambar ulang...'
  },
  preference: {
    menus: {
      cat: 'Pengaturan Kucing',
      general: 'Pengaturan Umum',
      model: 'Manajemen Model',
      about: 'Tentang'
    }
  },
  cat: {
    opacity: 'Tidak Transparan',
    mirrorMode: 'Mode Cermin',
    scale: 'Ukuran',
    scaleDescription: 'Masukkan nilai ukuran antara {min} sampai {max}',
    penetrable: 'Penetrasi Jendela',
    penetrableDescription: 'Saat diaktifkan, jendela tidak menghalangi interaksi dengan aplikasi lain',
    backgroundImage: 'Gambar Latar',
    reset: 'Reset',
    choose: 'Pilih',
    clearImage: 'Hapus Gambar',
    modeSettings: 'Pengaturan Mode',
    windowSettings: 'Pengaturan Jendela',
    selectMode: 'Pilih Mode',
    modes: {
      standard: 'Mode Standar',
      keyboard: 'Mode Keyboard'
    },
    singleModeDescription: 'Jika diaktifkan, setiap tangan hanya akan menampilkan satu tombol terakhir yang ditekan'
  },
  general: {
    section: {
      application: 'Pengaturan Aplikasi',
      updates: 'Pengaturan Pembaruan'
    },
    alwaysOnTop: 'Selalu di Atas',
    launchAtLogin: 'Mulai Saat Login',
    hideWindowOnStartup: 'Sembunyikan Jendela Saat Startup',
    autoCheckUpdates: 'Periksa Pembaruan Otomatis',
    language: {
      title: 'Bahasa',
      options: {
        en: 'English',
        id: 'Bahasa Indonesia',
        'zh-CN': '简体中文'
      }
    },
    permissions: {
      title: 'Pengaturan Izin',
      authorized: 'Diizinkan',
      authorize: 'Berikan Izin',
      inputMonitoring: {
        title: 'Izin Pemantauan Input',
        description: 'Aktifkan izin pemantauan input untuk menerima kejadian keyboard dan mouse sistem sebagai respons terhadap tindakan Anda.',
        instructions: 'Jika izin sudah diaktifkan, pilih terlebih dahulu dan klik tombol "-" untuk menghapusnya, lalu tambahkan kembali secara manual, dan restart aplikasi untuk memastikan izin berlaku.',
        openSettings: 'Buka Pengaturan'
      }
    }
  },
  model: {
    management: 'Manajemen Model',
    selected: 'Model Terpilih',
    addModel: 'Tambah Model',
    removeModel: 'Hapus Model',
    modelInfo: 'Informasi Model',
    noModelSelected: 'Tidak Ada Model Dipilih',
    comingSoon: 'Segera Hadir',
    author: 'Penulis',
    description: 'Deskripsi',
    modelName: 'Nama Model',
    preview: 'Pratinjau',
    modelFiles: 'Berkas Model',
    uploadPreview: 'Unggah Pratinjau',
    uploadFiles: 'Unggah Berkas',
    confirmDelete: 'Konfirmasi Penghapusan',
    deleteWarning: 'Model yang dihapus tidak dapat dipulihkan. Lanjutkan?',
    selectedSuccess: 'Model berhasil dipilih',
    addSuccess: 'Model berhasil ditambahkan',
    deleteSuccess: 'Model berhasil dihapus',
    deleteError: 'Gagal menghapus model. Model default tidak dapat dihapus.',
    formError: 'Harap isi semua bidang yang diperlukan',
    uploadSuccess: 'Berkas berhasil diunggah',
    modelNamePlaceholder: 'Masukkan nama model',
    authorPlaceholder: 'Masukkan nama penulis',
    descriptionPlaceholder: 'Masukkan deskripsi model',
    noModelFound: 'Tidak ada model ditemukan'
  },
  about: {
    version: 'Versi',
    checkForUpdates: 'Periksa Pembaruan',
    github: 'GitHub',
    license: 'Lisensi',
    aboutApp: 'Tentang Aplikasi',
    openSource: 'Alamat Open Source',
    reportIssue: 'Laporkan Masalah'
  },
  updateApp: {
    newVersion: 'Versi Baru Tersedia',
    currentVersion: 'Versi Saat Ini',
    description: 'Catatan Rilis',
    download: 'Unduh dan Pasang',
    later: 'Nanti',
    updateDate: 'Tanggal Pembaruan',
    updateNotes: 'Catatan Pembaruan',
    updateVersion: 'Versi Pembaruan',
    updateFound: 'Pembaruan Ditemukan',
    alreadyLatest: 'Sudah Versi Terbaru',
    updating: 'Memperbarui...'
  },
  tray: {
    preferences: 'Pengaturan...',
    showCat: 'Tampilkan Kucing',
    hideCat: 'Sembunyikan Kucing',
    catMode: 'Mode Kucing',
    opacity: 'Transparansi',
    restart: 'Mulai Ulang Aplikasi',
    quit: 'Keluar Aplikasi',
    version: 'Versi',
    shortcuts: {
      title: 'Pintasan Keyboard',
      preferences: 'Pengaturan (Ctrl+,)',
      show_hide: 'Tampilkan/Sembunyikan Kucing (Ctrl+H)',
      std_mode: 'Mode Standar (Ctrl+1)',
      kbd_mode: 'Mode Keyboard (Ctrl+2)',
      penetrable: 'Mode Tembus (Ctrl+P)',
      mirror: 'Mode Cermin (Ctrl+M)',
      updates: 'Periksa Pembaruan (Ctrl+U)',
      github: 'Buka GitHub (Ctrl+G)',
      restart: 'Mulai Ulang (Ctrl+R)',
      quit: 'Keluar (Ctrl+Q)'
    }
  }
} 