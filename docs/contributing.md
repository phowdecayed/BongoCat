# Panduan Kontribusi

Terima kasih atas minat Anda untuk berkontribusi pada proyek BongoCat! Dokumen ini berisi panduan untuk berkontribusi ke codebase BongoCat.

## Alur Kerja Kontribusi

1. **Fork Repositori**: Fork repositori BongoCat ke akun GitHub Anda
2. **Clone Repositori**: Clone fork ke mesin lokal Anda
3. **Buat Branch**: Buat branch baru untuk fitur atau perbaikan Anda
4. **Implementasi Perubahan**: Buat perubahan yang diperlukan
5. **Uji Perubahan**: Uji perubahan secara menyeluruh
6. **Commit Perubahan**: Commit dengan pesan yang jelas dan deskriptif
7. **Push ke Fork**: Push perubahan ke fork Anda
8. **Buat Pull Request**: Buat PR dari fork Anda ke repositori utama

## Konvensi Kode

### Gaya Kode

- Gunakan TypeScript untuk semua file JavaScript
- Ikuti ESLint/Prettier config yang ada di project
- Gunakan 2 spasi untuk indentasi
- Hindari penggunaan `any` sebisa mungkin

### Penamaan

- **File**: Gunakan `kebab-case` untuk nama file (contoh: `language-selector.vue`)
- **Komponen**: Gunakan `PascalCase` untuk nama komponen (contoh: `LanguageSelector`)
- **Variabel & Fungsi**: Gunakan `camelCase` untuk variabel dan fungsi (contoh: `getLanguage()`)
- **Konstanta**: Gunakan `UPPER_SNAKE_CASE` untuk konstanta (contoh: `MAX_RETRY_COUNT`)

### Struktur Komponen Vue

- Gunakan Composition API dengan `<script setup>` untuk komponen Vue
- Grup imports dengan urutan yang konsisten:
  1. Vue dan Framework imports
  2. Third-party libraries
  3. Imports internal
- Pisahkan props, composables, dan reactive state dengan baris kosong

```vue
<script setup lang="ts">
// Vue and framework imports
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

// Third-party libraries
import { Button } from 'ant-design-vue'

// Internal imports
import { useLanguageStore } from '@/stores/language'

// Composables & stores
const languageStore = useLanguageStore()
const { t } = useI18n()

// Reactive state
const counter = ref(0)

// Computed properties
const isActive = computed(() => counter.value > 0)

// Methods
function increment() {
  counter.value++
}
</script>
```

## Struktur Folder

Pertahankan struktur folder yang ada. Tambahkan kode baru di:

- `src/components/`: Untuk komponen UI yang dapat digunakan kembali
- `src/composables/`: Untuk logika yang dapat digunakan kembali
- `src/stores/`: Untuk Pinia stores
- `src/pages/`: Untuk halaman aplikasi
- `src/utils/`: Untuk fungsi utilitas

## Commit Messages

Gunakan format berikut untuk pesan commit:

```
<type>(<scope>): <subject>
```

Dimana:
- `<type>`: Jenis perubahan (feat, fix, docs, style, refactor, test, chore)
- `<scope>`: Area yang diubah (opsional)
- `<subject>`: Deskripsi singkat perubahan

Contoh:
```
feat(i18n): add Indonesian translation
fix(tray): fix tray menu not updating on language change
docs: update README with setup instructions
```

## Sistem Terjemahan

Saat menambahkan string UI baru:
1. Tambahkan kunci di semua file bahasa (`src/i18n/locales/`)
2. Gunakan fungsi `t()` untuk menampilkan string

```typescript
const message = t('common.loading')
```

## Tests

Untuk perubahan yang signifikan, tambahkan tests untuk memastikan fungsi berjalan sebagaimana mestinya.

## Dokumentasi

- Perbarui file README jika perlu
- Tambahkan JSDoc pada fungsi publik
- Perbarui dokumentasi di folder `docs/` jika membuat perubahan arsitektur

## Proses Review

1. Maintainer akan mereview PR Anda
2. PR mungkin memerlukan perubahan sebelum dapat digabungkan
3. Setelah disetujui, PR akan digabungkan ke branch utama

## Setup Development

```bash
# Clone repositori
git clone https://github.com/yourusername/BongoCat.git
cd BongoCat

# Install dependencies
pnpm install

# Run development server
pnpm tauri dev
```

## Laporan Bug & Fitur Baru

- Gunakan GitHub Issues untuk melaporkan bug
- Sebelum mengimplementasikan fitur baru, buat Issue untuk mendiskusikan fitur tersebut 