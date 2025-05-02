<script setup lang="ts">
import { disable, enable, isEnabled } from '@tauri-apps/plugin-autostart'
import { Select, Switch } from 'ant-design-vue'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import ProList from '@/components/pro-list/index.vue'
import ProListItem from '@/components/pro-list-item/index.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useTray } from '@/composables/useTray'
import { useGeneralStore } from '@/stores/general'
import { Language, useLanguageStore } from '@/stores/language'

const generalStore = useGeneralStore()
const languageStore = useLanguageStore()
const { setLanguage } = useLanguage()
const { t } = useI18n()
const { updateTrayMenu } = useTray()

// Gunakan computed agar opsi bahasa aktif berubah saat bahasa berubah
const languageOptions = computed(() => [
  { value: 'en', label: t('general.language.options.en') },
  { value: 'id', label: t('general.language.options.id') },
  { value: 'zh-CN', label: t('general.language.options.zh-CN') }
])

watch(() => generalStore.autostart, async (value) => {
  const enabled = await isEnabled()

  if (value && !enabled) {
    return enable()
  }

  if (!value && enabled) {
    disable()
  }
})

const handleLanguageChange = async (value: Language) => {
  languageStore.setLanguage(value)
  setLanguage(value)
  
  // Perbarui menu tray setelah perubahan bahasa
  setTimeout(() => {
    updateTrayMenu()
  }, 100)
}
</script>

<template>
  <ProList :title="t('general.section.application')">
    <ProListItem :title="t('general.alwaysOnTop')">
      <Switch v-model:checked="generalStore.alwaysOnTop" />
    </ProListItem>
    <ProListItem :title="t('general.launchAtLogin')">
      <Switch v-model:checked="generalStore.autostart" />
    </ProListItem>
    <ProListItem :title="t('general.hideWindowOnStartup')">
      <Switch v-model:checked="generalStore.hideWindowOnStartup" />
    </ProListItem>
  </ProList>

  <ProList :title="t('general.language.title')">
    <ProListItem>
      <Select
        v-model:value="languageStore.language"
        :options="languageOptions"
        style="width: 100%"
        @change="handleLanguageChange"
      />
    </ProListItem>
  </ProList>

  <ProList :title="t('general.section.updates')">
    <ProListItem :title="t('general.autoCheckUpdates')">
      <Switch v-model:checked="generalStore.autoCheckUpdate" />
    </ProListItem>
  </ProList>
</template>
