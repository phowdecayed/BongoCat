import type { CatMode } from '@/stores/cat'

import { CheckMenuItem, MenuItem, PredefinedMenuItem, Submenu } from '@tauri-apps/api/menu'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { hideWindow, showWindow } from '@/plugins/window'
import { useCatStore } from '@/stores/cat'
import { isMac } from '@/utils/platform'

interface ModeOption {
  label: string
  value: CatMode
}

export function useSharedMenu() {
  const catStore = useCatStore()
  const { t, locale } = useI18n()
  
  const modeOptions = computed<ModeOption[]>(() => [
    { label: t('cat.modes.standard'), value: 'standard' },
    { label: t('cat.modes.keyboard'), value: 'keyboard' },
  ])

  const getOpacityMenuItems = async () => {
    const options = [25, 50, 75, 100]

    const items = options.map((item) => {
      return CheckMenuItem.new({
        text: `${item}%`,
        checked: catStore.opacity === item,
        action: () => {
          catStore.opacity = item
        },
      })
    })

    if (!options.includes(catStore.opacity)) {
      items.unshift(CheckMenuItem.new({
        text: `${catStore.opacity}%`,
        checked: true,
        enabled: false,
      }))
    }

    return Promise.all(items)
  }

  const getSharedMenu = async () => {
    return await Promise.all([
      MenuItem.new({
        text: t('tray.preferences'),
        accelerator: isMac ? 'Cmd+,' : 'Ctrl+,',
        action: () => showWindow('preference'),
      }),
      MenuItem.new({
        text: catStore.visible ? t('tray.hideCat') : t('tray.showCat'),
        accelerator: isMac ? 'Cmd+H' : 'Ctrl+H',
        action: () => {
          if (catStore.visible) {
            hideWindow('main')
          } else {
            showWindow('main')
          }

          catStore.visible = !catStore.visible
        },
      }),
      PredefinedMenuItem.new({ item: 'Separator' }),
      Submenu.new({
        text: t('tray.catMode'),
        items: await Promise.all(
          modeOptions.value.map((item, index) => {
            return CheckMenuItem.new({
              text: item.label,
              checked: catStore.mode === item.value,
              accelerator: isMac ? `Cmd+${index + 1}` : `Ctrl+${index + 1}`,
              action: () => {
                catStore.mode = item.value
              },
            })
          }),
        ),
      }),
      CheckMenuItem.new({
        text: t('cat.penetrable'),
        checked: catStore.penetrable,
        accelerator: isMac ? 'Cmd+P' : 'Ctrl+P',
        action: () => {
          catStore.penetrable = !catStore.penetrable
        },
      }),
      Submenu.new({
        text: t('tray.opacity'),
        items: await getOpacityMenuItems(),
      }),
      CheckMenuItem.new({
        text: t('cat.mirrorMode'),
        checked: catStore.mirrorMode,
        accelerator: isMac ? 'Cmd+M' : 'Ctrl+M',
        action: () => {
          catStore.mirrorMode = !catStore.mirrorMode
        },
      }),
    ])
  }

  // Observer untuk perubahan bahasa
  let updateMenuCallback: (() => void) | null = null
  
  // Fungsi untuk menetapkan callback pembaruan menu
  const setUpdateMenuCallback = (callback: () => void) => {
    updateMenuCallback = callback
  }
  
  // Watch perubahan bahasa dan perbarui menu
  watch(locale, () => {
    if (updateMenuCallback) {
      updateMenuCallback()
    }
  })

  return {
    getSharedMenu,
    setUpdateMenuCallback,
  }
}
