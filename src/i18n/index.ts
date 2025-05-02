import { createI18n } from 'vue-i18n'

// Import locales
import id from './locales/id'
import en from './locales/en'
import zhCN from './locales/zh-CN'

// Type for strongly-typed translations
export type MessageSchema = typeof zhCN

const i18n = createI18n<[MessageSchema], 'en' | 'id' | 'zh-CN'>({
  legacy: false,
  locale: 'id', // Default to Bahasa Indonesia
  fallbackLocale: 'en',
  messages: {
    'en': en,
    'id': id,
    'zh-CN': zhCN
  }
})

export default i18n 