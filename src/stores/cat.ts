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
  const singleMode = ref(false)

  watch(mode, (newMode) => {
    localStorage.setItem('bongocat-mode', newMode)
  })

  watch(scale, (newScale) => {
    if (typeof newScale === 'number') {
      localStorage.setItem('bongocat-scale', newScale.toString())
    }
  })

  return {
    mode,
    visible,
    penetrable,
    opacity,
    mirrorMode,
    scale,
    singleMode,
    $tauri: {
      start() {
        const savedMode = localStorage.getItem('bongocat-mode')
        if (savedMode && (savedMode === 'standard' || savedMode === 'keyboard')) {
          mode.value = savedMode as CatMode
        }

        const savedScale = localStorage.getItem('bongocat-scale')
        if (savedScale) {
          const parsedScale = Number.parseFloat(savedScale)
          if (!Number.isNaN(parsedScale) && parsedScale > 0) {
            scale.value = parsedScale < 10 ? parsedScale * 100 : parsedScale
          }
        }

        return Promise.resolve()
      },
    },
  }
})
