<script setup lang="ts">
import { Flex } from 'ant-design-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import About from './components/about/index.vue'
import Cat from './components/cat/index.vue'
import General from './components/general/index.vue'
import Model from './components/model/index.vue'

import UpdateApp from '@/components/update-app/index.vue'
import { useTray } from '@/composables/useTray'
import { useAppStore } from '@/stores/app'
import { useLanguageStore } from '@/stores/language'
import { isMac } from '@/utils/platform'

const { createTray, updateTrayMenu } = useTray()
const appStore = useAppStore()
const languageStore = useLanguageStore()
const current = ref(0)
const { t, locale } = useI18n()

onMounted(async () => {
  await createTray()
})

// Watch untuk perubahan bahasa
watch(() => languageStore.language, () => {
  updateTrayMenu()
}, { immediate: true })

const menus = computed(() => [
  {
    label: t('preference.menus.cat'),
    icon: 'i-solar:cat-bold',
    component: Cat,
  },
  {
    label: t('preference.menus.general'),
    icon: 'i-solar:settings-minimalistic-bold',
    component: General,
  },
  {
    label: t('preference.menus.model'),
    icon: 'i-solar:magic-stick-3-bold',
    component: Model,
  },
  {
    label: t('preference.menus.about'),
    icon: 'i-solar:info-circle-bold',
    component: About,
  },
])

const currentComponent = computed(() => {
  return menus.value[current.value].component
})
</script>

<template>
  <Flex class="preference-container">
    <div
      class="preference-sidebar"
      :class="[isMac ? 'pt-8' : 'pt-4']"
      data-tauri-drag-region
    >
      <div class="preference-logo">
        <div class="preference-logo-image">
          <img
            class="preference-logo-img"
            src="/images/logo.png"
          >
        </div>

        <span class="preference-app-name">{{ appStore.name }}</span>
      </div>

      <div class="preference-menu">
        <div
          v-for="(item, index) in menus"
          :key="item.label"
          class="preference-menu-item"
          :class="{ 'preference-menu-item-active': current === index }"
          @mousedown="current = index"
        >
          <div
            class="preference-menu-icon"
            :class="item.icon"
          />

          <span class="preference-menu-label">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <div
      class="preference-content"
      data-tauri-drag-region
    >
      <component :is="currentComponent" />
    </div>
  </Flex>

  <UpdateApp />
</template>

<style scoped>
.preference-container {
  height: 100vh;
}

.preference-sidebar {
  height: 100%;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(to bottom, var(--ant-color-primary-1), rgba(0, 0, 0, 0.01));
}

.preference-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.preference-logo-image {
  border: 1px solid var(--ant-color-border);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preference-logo-img {
  width: 60px;
  height: 60px;
}

.preference-app-name {
  font-weight: bold;
}

.preference-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 0 0.5rem;
}

.preference-menu-item {
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.65);
  transition: all 0.3s;
}

.preference-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.preference-menu-item-active {
  background-color: white !important;
  color: var(--ant-color-primary-5);
  font-weight: bold;
}

.preference-menu-icon {
  width: 2rem;
  height: 2rem;
}

.preference-menu-label {
  text-align: center;
  white-space: normal;
  font-size: 0.875rem;
  padding: 0 0.25rem;
}

.preference-content {
  flex: 1;
  background-color: #f5f5f5;
  padding: 1rem;
  overflow: auto;
}
</style>
