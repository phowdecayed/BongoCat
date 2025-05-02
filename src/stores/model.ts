import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Motion {
  Name: string
  File: string
  Sound?: string
  FadeInTime: number
  FadeOutTime: number
  Description?: string
}

export type MotionGroup = Record<string, Motion[]>

export interface Expression {
  Name: string
  File: string
  Description?: string
}

export interface ModelInfo {
  id: string
  name: string
  author: string
  preview: string
  path: string
  description?: string
  isDefault?: boolean
}

export const useModelStore = defineStore('model', () => {
  const motions = ref<MotionGroup>({})
  const expressions = ref<Expression[]>([])
  
  // Daftar model yang tersedia
  const availableModels = ref<ModelInfo[]>([
    {
      id: 'standard',
      name: 'Standard Model',
      author: 'BongoCat Team',
      preview: '/images/model-previews/standard.png',
      path: '/models/standard',
      isDefault: true
    },
    {
      id: 'keyboard',
      name: 'Keyboard Model',
      author: 'BongoCat Team',
      preview: '/images/model-previews/keyboard.png',
      path: '/models/keyboard',
      isDefault: true
    }
  ])
  
  // Model yang dipilih/aktif
  const selectedModelId = ref<string>('standard')
  
  // Tanda model sedang dimuat
  const isLoading = ref<boolean>(false)
  
  // Menambahkan model kustom baru
  function addCustomModel(model: Omit<ModelInfo, 'id' | 'isDefault'>) {
    const newModel: ModelInfo = {
      ...model,
      id: `custom-${Date.now()}`,
      isDefault: false
    }
    
    availableModels.value = [...availableModels.value, newModel]
    return newModel.id
  }
  
  // Menghapus model kustom
  function removeCustomModel(modelId: string) {
    const model = availableModels.value.find(m => m.id === modelId)
    
    if (model && !model.isDefault) {
      availableModels.value = availableModels.value.filter(m => m.id !== modelId)
      
      // Jika model yang dihapus adalah model yang aktif, ganti ke default
      if (selectedModelId.value === modelId) {
        selectedModelId.value = 'standard'
      }
      
      return true
    }
    
    return false
  }
  
  // Mengubah model yang dipilih
  function selectModel(modelId: string) {
    const model = availableModels.value.find(m => m.id === modelId)
    
    if (model) {
      selectedModelId.value = modelId
      return true
    }
    
    return false
  }
  
  // Mendapatkan model yang dipilih saat ini
  const selectedModel = computed(() => {
    return availableModels.value.find(m => m.id === selectedModelId.value) || availableModels.value[0]
  })

  return {
    motions,
    expressions,
    availableModels,
    selectedModelId,
    isLoading,
    addCustomModel,
    removeCustomModel,
    selectModel,
    selectedModel,
    $tauri: {
      start() {
        return Promise.resolve()
      }
    }
  }
})
