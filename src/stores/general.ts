import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGeneralStore = defineStore('general', () => {
  const autoCheckUpdate = ref(false)
  const autostart = ref(false)
  const hideWindowOnStartup = ref(false)

  return {
    autoCheckUpdate,
    autostart,
    hideWindowOnStartup,
  }
})
