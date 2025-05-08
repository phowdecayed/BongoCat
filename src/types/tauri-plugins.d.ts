// Type declarations for Tauri plugins that don't have official type definitions

declare module '@tauri-apps/plugin-dialog' {
  export interface DialogOptions {
    title?: string
    okLabel?: string
    cancelLabel?: string
    kind?: 'info' | 'warning' | 'error'
  }

  export function message(message: string, options?: DialogOptions): Promise<void>
  export function confirm(message: string, options?: DialogOptions): Promise<boolean>
  export function ask(message: string, options?: DialogOptions): Promise<string | null>

  export function open(options?: {
    multiple?: boolean
    filters?: Array<{ name: string, extensions: string[] }>
    defaultPath?: string
    directory?: boolean
    recursive?: boolean
    title?: string
  }): Promise<string | string[] | null>

  export function save(options?: {
    filters?: Array<{ name: string, extensions: string[] }>
    defaultPath?: string
    title?: string
  }): Promise<string | null>
}

declare module 'tauri-plugin-macos-permissions-api' {
  export function checkInputMonitoringPermission(): Promise<boolean>
  export function requestInputMonitoringPermission(): Promise<void>
  export function checkScreenRecordingPermission(): Promise<boolean>
  export function requestScreenRecordingPermission(): Promise<void>
  export function checkFullDiskAccessPermission(): Promise<boolean>
  export function requestFullDiskAccessPermission(): Promise<void>
  export function checkAccessibilityPermission(): Promise<boolean>
  export function requestAccessibilityPermission(): Promise<void>
  export function checkCameraPermission(): Promise<boolean>
  export function requestCameraPermission(): Promise<void>
  export function checkMicrophonePermission(): Promise<boolean>
  export function requestMicrophonePermission(): Promise<void>
  export function checkContactsPermission(): Promise<boolean>
  export function requestContactsPermission(): Promise<void>
  export function checkCalendarPermission(): Promise<boolean>
  export function requestCalendarPermission(): Promise<void>
  export function checkRemindersPermission(): Promise<boolean>
  export function requestRemindersPermission(): Promise<void>
  export function checkPhotosPermission(): Promise<boolean>
  export function requestPhotosPermission(): Promise<void>
}
