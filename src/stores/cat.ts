import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type CatMode = 'standard' | 'keyboard'

export const useCatStore = defineStore('cat', () => {
  const mode = ref<CatMode>('standard')
  const visible = ref(true)
  const penetrable = ref<boolean>(false)
  const opacity = ref(100)
  const mirrorMode = ref(false)
  const scale = ref<number>(1.0)

  watch(mode, (newMode) => {
    localStorage.setItem('bongocat-mode', newMode)
  })

  watch(scale, (newScale) => {
    localStorage.setItem('bongocat-scale', newScale.toString())
  })

  return {
    mode,
    visible,
    penetrable,
    opacity,
    mirrorMode,
    scale,
    $tauri: {
      start() {
        const savedMode = localStorage.getItem('bongocat-mode')
        if (savedMode && (savedMode === 'standard' || savedMode === 'keyboard')) {
          mode.value = savedMode as CatMode
        }
        
        const savedScale = localStorage.getItem('bongocat-scale')
        if (savedScale) {
          const parsedScale = parseFloat(savedScale)
          if (!isNaN(parsedScale) && parsedScale > 0) {
            scale.value = parsedScale
          }
        }
        
        return Promise.resolve()
      }
    }
  }
})
