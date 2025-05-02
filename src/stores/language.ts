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