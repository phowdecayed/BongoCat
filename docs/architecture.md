# Arsitektur Aplikasi

BongoCat menggunakan arsitektur modern berbasis komponen dengan Vue 3 Composition API dan Tauri sebagai framework desktop. Dokumen ini menjelaskan arsitektur dan alur kerja aplikasi BongoCat.

## Diagram Arsitektur

```
+------------------------------------------+
|                                          |
|               Interface Layer            |
|                                          |
|  +----------+  +----------+  +--------+  |
|  |   Pages  |  |Components|  |  Views |  |
|  +----------+  +----------+  +--------+  |
|                                          |
+------------------+---------------------^-+
                   |                     |
                   v                     |
+------------------------------------------+
|                                          |
|            Application Layer             |
|                                          |
|  +----------+  +----------+  +--------+  |
|  |  Stores  |  |Composables|  | Router |  |
|  +----------+  +----------+  +--------+  |
|                                          |
+------------------+---------------------^-+
                   |                     |
                   v                     |
+------------------------------------------+
|                                          |
|              Platform Layer              |
|                                          |
|  +----------+  +----------+  +--------+  |
|  |  Tauri   |  |  APIs    |  | Utils  |  |
|  +----------+  +----------+  +--------+  |
|                                          |
+------------------------------------------+
```

## Layer Aplikasi

### 1. Interface Layer
Level teratas, berisi komponen yang terlihat oleh pengguna:
- **Pages**: Tampilan utama aplikasi (`src/pages/`)
- **Components**: Komponen yang dapat digunakan kembali (`src/components/`)
- **Views**: Tampilan khusus atau kombinasi komponen

### 2. Application Layer
Layer menengah, menangani logika bisnis dan state:
- **Stores**: Pinia stores untuk state management (`src/stores/`)
- **Composables**: Logika yang dapat digunakan kembali dengan Composition API (`src/composables/`)
- **Router**: Vue Router untuk navigasi (`src/router/`)

### 3. Platform Layer
Layer terbawah, berinteraksi dengan sistem operasi:
- **Tauri**: Framework desktop untuk akses API native
- **APIs**: Utilitas untuk komunikasi dengan backend
- **Utils**: Fungsi-fungsi utilitas dan helper

## Aliran Data

BongoCat menggunakan pola aliran data unidirectional:
1. **Aksi Pengguna** → dipicu dari Interface Layer
2. **Perubahan State** → dikelola di Application Layer (Stores)
3. **Rendering UI** → UI diperbarui berdasarkan perubahan state

## State Management

Aplikasi menggunakan Pinia untuk manajemen state, dengan beberapa store utama:
- `useAppStore`: Informasi umum aplikasi
- `useCatStore`: State untuk tampilan kucing
- `useGeneralStore`: Pengaturan umum
- `useModelStore`: Manajemen model kucing
- `useLanguageStore`: Manajemen bahasa

### Contoh Store:

```typescript
// src/stores/language.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Language = 'en' | 'id' | 'zh-CN'

export const useLanguageStore = defineStore('language', () => {
  const language = ref<Language>('id')

  function setLanguage(newLanguage: Language) {
    language.value = newLanguage
  }

  return {
    language,
    setLanguage,
    $tauri: {
      start() {
        return Promise.resolve()
      }
    }
  }
})
```

## Reactive Patterns

BongoCat menggunakan pola reaktif Vue 3 untuk memastikan UI selalu sinkron dengan state:

1. **Computed Properties**: Untuk nilai turunan yang recalculated saat dependencies berubah
2. **Watchers**: Untuk efek samping saat state berubah
3. **Refs & Reactives**: Untuk state yang dapat diubah

### Contoh Reactivity:

```typescript
// Computed untuk menu yang reaktif terhadap perubahan bahasa
const menus = computed(() => [
  {
    label: t('preference.menus.cat'),
    icon: 'i-solar:cat-bold',
    component: Cat,
  },
  // ... item lainnya
])
```

## Integrasi Tauri

Aplikasi menggunakan Tauri untuk fitur desktop:
- **Menu Tray**: Diimplementasikan di `src/composables/useTray.ts`
- **Window Management**: Dikelola melalui Tauri window API
- **Plugin Tauri**: Seperti autostart, updater, dll.

## Persistensi Data

Data persistensi dikelola oleh Tauri API dan Pinia stores yang dikonfigurasi dengan `@tauri-store/pinia`.

## Arsitektur Komponen

Komponen dirancang mengikuti prinsip atomik desain:
- **Atomic Components**: Komponen dasar seperti button, input
- **Molekul**: Kombinasi dari atomic components (ProListItem)
- **Organisme**: Komponen kompleks seperti formulir
- **Templates**: Struktur halaman
- **Pages**: Halaman lengkap

### Contoh Arsitektur Komponen:
- `ProList` adalah parent komponen
- `ProListItem` adalah child komponen yang digunakan di dalam ProList

## Sistem Event

Aplikasi menggunakan kombinasi:
- Reactive state Pinia untuk UI state
- Tauri event system untuk komunikasi desktop
- Emitted events Vue untuk komunikasi antar komponen

## Ekstensibilitas

Arsitektur BongoCat dirancang untuk ekstensibilitas:
- Mudah menambahkan bahasa baru
- Komponen yang modular
- Separation of concerns yang jelas 