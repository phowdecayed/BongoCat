# Dokumentasi Developer BongoCat

Ini adalah dokumentasi resmi untuk pengembang aplikasi BongoCat. Dokumentasi ini berisi panduan implementasi, arsitektur aplikasi, dan panduan kontribusi untuk membantu pengembang memahami dan bekerja dengan kode sumber BongoCat.

## Daftar Isi

1. [Arsitektur Aplikasi](./architecture.md)
2. [Sistem Terjemahan](./translation-system.md)
3. [Komponen UI](./ui-components.md)
4. [Integrasi Tauri](./tauri-integration.md)
5. [Panduan Kontribusi](./contributing.md)

## Tech Stack

BongoCat dibangun menggunakan teknologi modern:

- **Frontend**: Vue 3 + TypeScript + Pinia + UnoCSS
- **Desktop**: Tauri (Rust)
- **UI Library**: Ant Design Vue
- **Internasionalisasi**: Vue I18n

## Setup Pengembangan

### Prasyarat

- Node.js (versi 18+)
- PNPM
- Rust dan toolchainnya
- Tauri CLI

### Instalasi

```bash
# Mengkloning repositori
git clone https://github.com/ayangweb/BongoCat.git
cd BongoCat

# Menginstal dependensi
pnpm install

# Menjalankan mode pengembangan
pnpm tauri dev

# Build untuk produksi
pnpm tauri build
```

## Struktur Proyek

```
BongoCat/
├── src/                  # Kode sumber frontend (Vue)
│   ├── assets/           # Aset statis (gambar, CSS)
│   ├── components/       # Komponen Vue yang dapat digunakan kembali
│   ├── composables/      # Komposisi Vue untuk logika yang dapat digunakan kembali
│   ├── constants/        # Konstanta aplikasi
│   ├── i18n/             # Sistem terjemahan
│   │   ├── locales/      # File bahasa
│   ├── pages/            # Halaman aplikasi
│   ├── plugins/          # Plugin Vue
│   ├── router/           # Router Vue
│   ├── stores/           # Pinia stores
│   └── utils/            # Fungsi utilitas
├── src-tauri/            # Kode sumber backend (Rust/Tauri)
├── docs/                 # Dokumentasi
├── public/               # File statis
└── scripts/              # Script build dan utilitas
```

## Link Berguna

- [Tauri Documentation](https://tauri.app/docs/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue I18n Documentation](https://vue-i18n.intlify.dev/)
- [Ant Design Vue Documentation](https://antdv.com/docs/vue/introduce) 