import { defineStore } from 'pinia'
import { ref } from 'vue'

export type CatMode = 'standard' | 'keyboard'

export const useCatStore = defineStore('cat', () => {
  const mode = ref<CatMode>('standard')
  const visible = ref(true)
  const penetrable = ref<boolean>(false)
  const opacity = ref(100)
  const mirrorMode = ref(false)

  return {
    mode,
    visible,
    penetrable,
    opacity,
    mirrorMode,
    $tauri: {
      start() {
        const savedMode = localStorage.getItem('bongocat-mode')
        if (savedMode && (savedMode === 'standard' || savedMode === 'keyboard')) {
          mode.value = savedMode as CatMode
        }
        
        return Promise.resolve()
      }
    }
  }
})
