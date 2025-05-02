# Komponen UI

BongoCat menggunakan kombinasi komponen UI khusus dan komponen dari library Ant Design Vue. Dokumen ini memberikan gambaran tentang komponen UI utama yang digunakan dalam aplikasi.

## Struktur Komponen

```
src/components/
├── pro-list/            # Komponen daftar khusus
├── pro-list-item/       # Item untuk komponen daftar
└── update-app/          # Komponen dialog pembaruan aplikasi
```

## Komponen Kustom

### ProList

Komponen container untuk menampilkan daftar pengaturan atau item dengan judul bagian.

**File**: `src/components/pro-list/index.vue`

**Properti**:
- `title`: String - Judul bagian

**Penggunaan**:
```vue
<ProList :title="t('general.section.application')">
  <!-- Item ProList masuk di sini -->
</ProList>
```

### ProListItem

Komponen item untuk digunakan di dalam ProList, menampilkan pengaturan dengan label dan kontrol.

**File**: `src/components/pro-list-item/index.vue`

**Properti**:
- `title`: String (opsional) - Judul item
- `description`: String (opsional) - Deskripsi tambahan
- `icon`: String (opsional) - Nama kelas ikon
- `vertical`: Boolean (opsional) - Jika true, tampilan akan vertical

**Slots**:
- `default`: Kontrol (tombol, switch, dll.)
- `icon`: Slot khusus untuk ikon
- `description`: Slot khusus untuk deskripsi

**Penggunaan**:
```vue
<ProListItem :title="t('general.alwaysOnTop')">
  <Switch v-model:checked="generalStore.alwaysOnTop" />
</ProListItem>

<ProListItem 
  :title="t('general.alwaysOnTop')" 
  :description="t('general.alwaysOnTopDesc')"
>
  <Switch v-model:checked="generalStore.alwaysOnTop" />
</ProListItem>

<ProListItem vertical>
  <Select
    v-model:value="languageStore.language"
    :options="languageOptions"
    style="width: 100%"
  />
</ProListItem>
```

### UpdateApp

Komponen modal dialog yang menampilkan informasi pembaruan dan kontrol untuk mengunduh.

**File**: `src/components/update-app/index.vue`

**Fungsionalitas**:
- Memeriksa pembaruan
- Menampilkan catatan rilis
- Mengunduh dan memasang pembaruan

**Penggunaan**:
```vue
<UpdateApp />
```

## Komponen Ant Design Vue

BongoCat menggunakan beberapa komponen Ant Design Vue seperti:

### Flex

Komponen untuk layout fleksibel.

```vue
<Flex vertical gap="small">
  <!-- Konten -->
</Flex>

<Flex align="center" justify="space-between">
  <!-- Konten -->
</Flex>
```

### Switch

Komponen toggle switch untuk pengaturan boolean.

```vue
<Switch v-model:checked="generalStore.alwaysOnTop" />
```

### Select

Komponen dropdown untuk pemilihan dari opsi.

```vue
<Select
  v-model:value="languageStore.language"
  :options="languageOptions"
  style="width: 100%"
/>
```

### Slider

Komponen slider untuk nilai numerik.

```vue
<Slider v-model:value="catStore.opacity" class="m-0!" />
```

### Button

Tombol untuk aksi.

```vue
<Button type="primary" @click="handleUpdate">
  {{ t('about.checkForUpdates') }}
</Button>
```

### Modal

Dialog modal untuk interaksi pengguna.

```vue
<Modal
  v-model:open="state.open"
  :cancel-text="t('updateApp.later')"
  centered
  :closable="false"
  :mask-closable="false"
  :title="t('updateApp.updateFound')"
  @ok="handleOk"
>
  <!-- Konten modal -->
</Modal>
```

## Icon System

BongoCat menggunakan UnoCSS dengan Iconify untuk sistem ikon.

**Contoh penggunaan**:
```vue
<div class="i-solar:cat-bold" />
<div class="i-solar:settings-minimalistic-bold" />
```

## Styling

Aplikasi menggunakan kombinasi:
- UnoCSS untuk utility classes
- SCSS untuk style tambahan
- Style scoped di komponen Vue

**Contoh style**:
```vue
<style lang="scss" scoped>
.update-note {
  :not(a) {
    all: revert;
  }
}
</style>
```

## Praktik Terbaik

1. **Konsistensi**: Gunakan komponen yang sama untuk fungsi yang sama di seluruh aplikasi
2. **Internasionalisasi**: Selalu gunakan terjemahan (`t()`) untuk teks UI
3. **Reaktivitas**: Manfaatkan Vue reactivity untuk UI yang responsif
4. **Responsif**: Pastikan komponen bekerja pada berbagai ukuran layar
5. **Aksesibilitas**: Ikuti praktik aksesibilitas untuk pengalaman pengguna yang lebih baik 