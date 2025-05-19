import type { TrayIconOptions } from '@tauri-apps/api/tray'

import { getName, getVersion } from '@tauri-apps/api/app'
import { emit } from '@tauri-apps/api/event'
import { Menu, MenuItem, PredefinedMenuItem, Submenu } from '@tauri-apps/api/menu'
import { resolveResource } from '@tauri-apps/api/path'
import { TrayIcon } from '@tauri-apps/api/tray'
import { openUrl } from '@tauri-apps/plugin-opener'
import { exit, relaunch } from '@tauri-apps/plugin-process'
import { useDebounceFn } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { GITHUB_LINK, LISTEN_KEY } from '../constants'
import { showWindow } from '../plugins/window'
import { isMac } from '../utils/platform'

import { useSharedMenu } from './useSharedMenu'

import { useCatStore } from '@/stores/cat'
import { useLanguageStore } from '@/stores/language'

const TRAY_ID = 'BONGO_CAT_TRAY'

export function useTray() {
  const catStore = useCatStore()
  const languageStore = useLanguageStore()
  const { getSharedMenu, setUpdateMenuCallback } = useSharedMenu()
  const { t, locale } = useI18n()
  const trayInitialized = ref(false)

  const debouncedUpdateTrayMenu = useDebounceFn(() => {
    updateTrayMenu()
  }, 100)

  // Watch for language changes
  watch(() => languageStore.language, () => {
    if (trayInitialized.value) {
      debouncedUpdateTrayMenu()
    }
  })

  // Watch locale changes directly
  watch(() => locale.value, () => {
    if (trayInitialized.value) {
      debouncedUpdateTrayMenu()
    }
  })

  watch(() => languageStore.language, () => {
    updateTrayMenu()
  })

  watch(() => catStore, debouncedUpdateTrayMenu, { deep: true })

  const createTray = async () => {
    const tray = await getTrayById()

    if (tray) return

    const appName = await getName()
    const appVersion = await getVersion()

    const menu = await getTrayMenu()

    const icon = await resolveResource('assets/tray.png')

    const options: TrayIconOptions = {
      menu,
      icon,
      id: TRAY_ID,
      tooltip: `${appName} v${appVersion}`,
      iconAsTemplate: false,
      menuOnLeftClick: true,
    }

    const newTray = await TrayIcon.new(options)
    trayInitialized.value = true

    // Tetapkan callback untuk pembaruan menu saat bahasa berubah
    setUpdateMenuCallback(() => {
      debouncedUpdateTrayMenu()
    })

    return newTray
  }

  const getTrayById = () => {
    return TrayIcon.getById(TRAY_ID)
  }

  const getShortcutsSubmenu = async () => {
    const items = await Promise.all([
      MenuItem.new({
        text: t('tray.shortcuts.preferences'),
        enabled: false,
      }),
      MenuItem.new({
        text: t('tray.shortcuts.show_hide'),
        enabled: false,
      }),
      MenuItem.new({
        text: t('tray.shortcuts.std_mode'),
        enabled: false,
      }),
      MenuItem.new({
        text: t('tray.shortcuts.kbd_mode'),
        enabled: false,
      }),
      MenuItem.new({
        text: t('tray.shortcuts.penetrable'),
        enabled: false,
      }),
      MenuItem.new({
        text: t('tray.shortcuts.mirror'),
        enabled: false,
      }),
      MenuItem.new({
        text: t('tray.shortcuts.updates'),
        enabled: false,
      }),
      MenuItem.new({
        text: t('tray.shortcuts.github'),
        enabled: false,
      }),
      MenuItem.new({
        text: t('tray.shortcuts.restart'),
        enabled: false,
      }),
      MenuItem.new({
        text: t('tray.shortcuts.quit'),
        enabled: false,
      }),
    ])

    return Submenu.new({
      text: t('tray.shortcuts.title'),
      items,
    })
  }

  const getTrayMenu = async () => {
    const appVersion = await getVersion()

    const items = await Promise.all([
      ...await getSharedMenu(),
      PredefinedMenuItem.new({ item: 'Separator' }),
      await getShortcutsSubmenu(),
      PredefinedMenuItem.new({ item: 'Separator' }),
      MenuItem.new({
        text: t('about.checkForUpdates'),
        accelerator: isMac ? 'Cmd+U' : 'Ctrl+U',
        action: () => {
          showWindow()

          emit(LISTEN_KEY.UPDATE_APP)
        },
      }),
      MenuItem.new({
        text: t('about.openSource'),
        accelerator: isMac ? 'Cmd+G' : 'Ctrl+G',
        action: () => openUrl(GITHUB_LINK),
      }),
      PredefinedMenuItem.new({ item: 'Separator' }),
      MenuItem.new({
        text: `${t('tray.version')} ${appVersion}`,
        enabled: false,
      }),
      MenuItem.new({
        text: t('tray.restart'),
        accelerator: isMac ? 'Cmd+R' : 'Ctrl+R',
        action: relaunch,
      }),
      MenuItem.new({
        text: t('tray.quit'),
        accelerator: isMac ? 'Cmd+Q' : 'Ctrl+Q',
        action: () => exit(0),
      }),
    ])

    return Menu.new({ items })
  }

  const updateTrayMenu = async () => {
    const tray = await getTrayById()

    if (!tray) return

    const menu = await getTrayMenu()

    tray.setMenu(menu)
  }

  return {
    createTray,
    updateTrayMenu,
  }
}
