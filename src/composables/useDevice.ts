import type { Ref } from 'vue'

import { useDebounceFn } from '@vueuse/core'
import { reactive, ref, watch } from 'vue'

import { LISTEN_KEY } from '../constants'

import { useTauriListen } from './useTauriListen'

import { useCatStore } from '@/stores/cat'

type MouseButtonValue = 'Left' | 'Right' | 'Middle'

interface MouseButtonEvent {
  kind: 'MousePress' | 'MouseRelease'
  value: MouseButtonValue
}

interface MouseMoveValue {
  x: number
  y: number
}

interface MouseMoveEvent {
  kind: 'MouseMove'
  value: MouseMoveValue
}

interface KeyboardEvent {
  kind: 'KeyboardPress' | 'KeyboardRelease'
  value: string
}

type DeviceEvent = MouseButtonEvent | MouseMoveEvent | KeyboardEvent

function getSupportKeys() {
  const files = import.meta.glob('../assets/images/keys/*.png', { eager: true })

  return Object.keys(files).map((path) => {
    return path.split('/').pop()?.replace('.png', '')
  })
}

const supportKeys = getSupportKeys()
// Menyimpan timer untuk setiap key yang ditekan
const keyTimeouts = new Map<string, NodeJS.Timeout>()

export function useDevice() {
  const pressedMouses = ref<MouseButtonValue[]>([])
  const mousePosition = reactive<MouseMoveValue>({ x: 0, y: 0 })
  const pressedKeys = ref<string[]>([])
  const catStore = useCatStore()

  watch(() => catStore.mode, () => {
    pressedKeys.value = pressedKeys.value.filter(key => !key.endsWith('Arrow'))
  })

  const debounceCapsLockRelease = useDebounceFn(() => {
    handleRelease(pressedKeys, 'CapsLock')
  }, 100)

  const handlePress = <T>(array: Ref<T[]>, value?: T) => {
    if (!value) return

    array.value = [...new Set([...array.value, value])]

    // Jika ini adalah key press, tambahkan timeout untuk menghapus key setelah 300ms
    // kecuali untuk CapsLock yang memiliki penanganan khusus
    if (array === pressedKeys && value !== 'CapsLock') {
      // Hapus timer yang sudah ada untuk key ini jika ada
      if (keyTimeouts.has(value as string)) {
        clearTimeout(keyTimeouts.get(value as string))
      }

      // Buat timer baru untuk menghapus key ini setelah 300ms jika tidak ada release event
      const timer = setTimeout(() => {
        handleRelease(array, value)
        keyTimeouts.delete(value as string)
      }, 300)

      keyTimeouts.set(value as string, timer)
    }
  }

  const handleRelease = <T>(array: Ref<T[]>, value?: T) => {
    if (!value) return

    array.value = array.value.filter(item => item !== value)

    // Hapus timer untuk key ini jika ada
    if (array === pressedKeys && keyTimeouts.has(value as string)) {
      clearTimeout(keyTimeouts.get(value as string))
      keyTimeouts.delete(value as string)
    }
  }

  const normalizeKeyValue = (key: string) => {
    key = key.replace(/^(Meta).*/, '$1').replace(/F(\d+)/, 'Fn')

    const isInvalidArrowKey = key.endsWith('Arrow') && catStore.mode !== 'keyboard'
    const isUnsupportedKey = !supportKeys.includes(key)

    if (isInvalidArrowKey || isUnsupportedKey) return

    return key
  }

  useTauriListen<DeviceEvent>(LISTEN_KEY.DEVICE_CHANGED, ({ payload }) => {
    const { kind, value } = payload

    if (value === 'CapsLock') {
      handlePress(pressedKeys, 'CapsLock')

      return debounceCapsLockRelease()
    }

    switch (kind) {
      case 'MousePress':
        return handlePress(pressedMouses, value)
      case 'MouseRelease':
        return handleRelease(pressedMouses, value)
      case 'MouseMove':
        return Object.assign(mousePosition, value)
      case 'KeyboardPress':
        return handlePress(pressedKeys, normalizeKeyValue(value))
      case 'KeyboardRelease':
        return handleRelease(pressedKeys, normalizeKeyValue(value))
    }
  })

  return {
    pressedMouses,
    mousePosition,
    pressedKeys,
  }
}
