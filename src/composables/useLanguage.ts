import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue'

type Language = 'en' | 'id' | 'zh-CN'

const currentLanguage = ref<Language>('id') // Default to Bahasa Indonesia

export function useLanguage() {
  const { locale } = useI18n()

  // Initialize the language
  const initLanguage = (savedLanguage?: Language) => {
    const lang = savedLanguage || currentLanguage.value
    setLanguage(lang)
  }

  // Set the application language
  const setLanguage = (lang: Language) => {
    locale.value = lang
    currentLanguage.value = lang
  }

  // Watch for language changes to apply them globally
  watch(currentLanguage, (newLang) => {
    locale.value = newLang
  })

  return {
    currentLanguage,
    initLanguage,
    setLanguage
  }
} 