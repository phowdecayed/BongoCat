# Integrasi Tauri

BongoCat menggunakan Tauri sebagai framework desktop untuk menjalankan aplikasi Vue di platform desktop. Dokumen ini menjelaskan integrasi Tauri dalam aplikasi dan berbagai fitur yang digunakan.

## Struktur Integrasi Tauri

```
src-tauri/              # Kode backend Tauri (Rust)
├── Cargo.toml          # Konfigurasi Rust package
├── tauri.conf.json     # Konfigurasi Tauri
└── src/                # Kode sumber Rust untuk backend
```

## Plugin Tauri yang Digunakan

BongoCat menggunakan beberapa plugin Tauri untuk menambahkan fungsionalitas desktop:

### @tauri-apps/plugin-autostart
Memungkinkan aplikasi memulai secara otomatis saat sistem boot.

```typescript
import { disable, enable, isEnabled } from '@tauri-apps/plugin-autostart'

// Memeriksa status
const enabled = await isEnabled()

// Mengaktifkan autostart
await enable()

// Menonaktifkan autostart
await disable()
```

### @tauri-apps/plugin-log
Sistem logging desktop.

```typescript
import { error } from '@tauri-apps/plugin-log'

// Mencatat error
error('Error message')
```

### @tauri-apps/plugin-updater
Fungsionalitas update aplikasi.

```typescript
import { check } from '@tauri-apps/plugin-updater'

// Memeriksa update
const update = await check()

if (update) {
  // Unduh dan pasang update
  await update.downloadAndInstall()
}
```

### @tauri-apps/plugin-opener
Membuka URL atau file menggunakan aplikasi default sistem.

```typescript
import { openUrl } from '@tauri-apps/plugin-opener'

// Membuka URL
openUrl('https://github.com/ayangweb/BongoCat')
```

### @tauri-apps/plugin-process
Mengelola proses aplikasi.

```typescript
import { exit, relaunch } from '@tauri-apps/plugin-process'

// Restart aplikasi
relaunch()

// Keluar aplikasi
exit(0)
```

## Tauri Windows API

Aplikasi menggunakan Tauri Window API untuk mengelola jendela aplikasi:

```typescript
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'

// Mendapatkan window saat ini
const appWindow = getCurrentWebviewWindow()

// Mengatur window untuk mengabaikan event kursor
appWindow.setIgnoreCursorEvents(true)

// Memulai dragging window
appWindow.startDragging()
```

## Menu Tray

BongoCat mengimplementasikan menu tray dengan Tauri API:

```typescript
import { Menu, MenuItem } from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'

// Membuat menu
const menu = await Menu.new({
  items: [
    // Item menu
  ]
})

// Membuat tray icon
const tray = await TrayIcon.new({
  menu,
  icon: iconPath,
  id: 'TRAY_ID',
  tooltip: 'BongoCat'
})
```

Implementasi lengkap ada di file `src/composables/useTray.ts`.

## Persistent Storage dengan Tauri Store

BongoCat menggunakan `@tauri-store/pinia` untuk menyimpan state secara persisten:

```typescript
import { createPlugin } from '@tauri-store/pinia'
import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(createPlugin({ saveOnChange: true }))
```

Pinia store harus menyediakan metode `$tauri.start()` untuk mendukung integrasi ini:

```typescript
export const useLanguageStore = defineStore('language', () => {
  // state dan actions...
  
  return {
    // state dan methods...
    $tauri: {
      start() {
        return Promise.resolve()
      }
    }
  }
})
```

## Tauri Events

BongoCat menggunakan sistem event Tauri untuk komunikasi antara proses:

```typescript
import { emit } from '@tauri-apps/api/event'

// Mengirim event
emit('event-name', payload)
```

Komposabel `useTauriListen` digunakan untuk mendengarkan event:

```typescript
import { useTauriListen } from '@/composables/useTauriListen'

useTauriListen('event-name', ({ payload }) => {
  // Handler event
})
```

## Tauri Path API

Digunakan untuk resolusi path file:

```typescript
import { resolveResource } from '@tauri-apps/api/path'

// Mendapatkan path resource
const iconPath = await resolveResource('assets/tray.png')
```

## Konfigurasi Tauri

Konfigurasi Tauri ada di file `src-tauri/tauri.conf.json`. Beberapa konfigurasi penting meliputi:

1. **Windows** - Konfigurasi jendela aplikasi
2. **Allowlist** - API Tauri yang diizinkan untuk diakses
3. **Bundle** - Konfigurasi untuk bundling aplikasi

## Praktik Terbaik

1. **Security**: Selalu batasi allowlist API hanya yang diperlukan
2. **Error Handling**: Tangani error dari API Tauri dengan baik
3. **Permissions**: Perhatikan izin yang diminta dari pengguna

## Penggunaan dalam Development

Untuk menjalankan aplikasi dengan Tauri:

```bash
# Mode development
pnpm tauri dev

# Build untuk produksi
pnpm tauri build
``` 