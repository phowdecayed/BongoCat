# Sistem Terjemahan (i18n)

BongoCat menggunakan Vue I18n untuk menangani internasionalisasi aplikasi. Dokumentasi ini menjelaskan cara sistem terjemahan diimplementasikan dan cara menambahkan terjemahan baru.

## Struktur Sistem Terjemahan

```
src/i18n/
├── index.ts            # Konfigurasi utama i18n
└── locales/            # File bahasa
    ├── en.ts           # Terjemahan Bahasa Inggris
    ├── id.ts           # Terjemahan Bahasa Indonesia
    └── zh-CN.ts        # Terjemahan Bahasa Mandarin (Simplified)
```

## Konfigurasi

Konfigurasi utama Vue I18n berada di file `src/i18n/index.ts`:

```typescript
import { createI18n } from 'vue-i18n'

// Import locales
import id from './locales/id'
import en from './locales/en'
import zhCN from './locales/zh-CN'

// Type untuk terjemahan strongly-typed
export type MessageSchema = typeof zhCN

const i18n = createI18n<[MessageSchema], 'en' | 'id' | 'zh-CN'>({
  legacy: false,
  locale: 'id', // Default ke Bahasa Indonesia
  fallbackLocale: 'en',
  messages: {
    'en': en,
    'id': id,
    'zh-CN': zhCN
  }
})

export default i18n
```

## File Terjemahan

Setiap file terjemahan mengikuti struktur objek yang sama dengan kunci yang seragam. Berikut contoh struktur di semua file:

```typescript
export default {
  common: {
    loading: 'Loading...' // Atau terjemahan yang sesuai
  },
  main: {
    redrawing: 'Redrawing...' // Atau terjemahan yang sesuai
  },
  // ... Dan seterusnya
}
```

## State Bahasa dan Reaktivitas

BongoCat menggunakan Pinia store untuk menyimpan preferensi bahasa (lihat `src/stores/language.ts`):

```typescript
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

## Composable Bahasa

File `src/composables/useLanguage.ts` menyediakan fungsi yang membantu untuk pengaturan bahasa:

```typescript
import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue'

type Language = 'en' | 'id' | 'zh-CN'

const currentLanguage = ref<Language>('id') // Default ke Bahasa Indonesia

export function useLanguage() {
  const { locale } = useI18n()

  // Inisialisasi bahasa
  const initLanguage = (savedLanguage?: Language) => {
    const lang = savedLanguage || currentLanguage.value
    setLanguage(lang)
  }

  // Set bahasa aplikasi
  const setLanguage = (lang: Language) => {
    locale.value = lang
    currentLanguage.value = lang
  }

  // Watch perubahan bahasa untuk diterapkan secara global
  watch(currentLanguage, (newLang) => {
    locale.value = newLang
  })

  return {
    currentLanguage,
    initLanguage,
    setLanguage
  }
}
```

## Penggunaan Terjemahan

Untuk menggunakan terjemahan di komponen Vue:

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    {{ t('common.loading') }}
  </div>
</template>
```

## Menu Tray dan Perubahan Bahasa

Sistem terjemahan terhubung ke menu tray aplikasi untuk memastikan menu berubah bahasa saat pengguna mengubah bahasa. Perhatikan implementasi di files:

- `src/composables/useTray.ts`
- `src/composables/useSharedMenu.ts`

Keduanya menggunakan watcher untuk melakukan pembaruan menu tray saat bahasa berubah.

## Menambahkan Bahasa Baru

Untuk menambahkan bahasa baru:

1. Buat file baru di `src/i18n/locales/` (contoh: `fr.ts` untuk Bahasa Perancis)
2. Salin struktur dari file bahasa yang sudah ada dan terjemahkan semua nilai
3. Update type signature di `src/i18n/index.ts`:

```typescript
const i18n = createI18n<[MessageSchema], 'en' | 'id' | 'zh-CN' | 'fr'>({
  // ...
  messages: {
    'en': en,
    'id': id,
    'zh-CN': zhCN,
    'fr': fr // Tambahkan import dan bahasa baru
  }
})
```

4. Tambahkan opsi bahasa baru di UI pemilihan bahasa (`src/pages/preference/components/general/index.vue`)

## Tips Terjemahan

- Pertahankan kunci yang sama di semua file bahasa
- Gunakan sistem hierarki kunci untuk memudahkan organisasi (contoh: `menu.file.open`)
- Pastikan semua string UI diterjemahkan, termasuk tooltip, placeholder, dan pesan error
- Untuk string kompleks dengan variabel, gunakan format Vue I18n: `t('greeting', { name: 'User' })` 