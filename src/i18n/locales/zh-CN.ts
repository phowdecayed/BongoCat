export default {
  common: {
    loading: '加载中...'
  },
  main: {
    redrawing: '重绘中...'
  },
  preference: {
    menus: {
      cat: '猫咪设置',
      general: '通用设置',
      model: '模型管理',
      about: '关于'
    }
  },
  cat: {
    opacity: '透明度',
    mirrorMode: '镜像模式',
    scale: '尺寸',
    scaleDescription: '请输入一个 {min} 到 {max} 之间的尺寸值',
    penetrable: '穿透模式',
    penetrableDescription: '启用后，窗口不影响对其他应用程序的操作',
    backgroundImage: '背景图片',
    reset: '重置',
    choose: '选择',
    clearImage: '清除图片',
    modeSettings: '模式设置',
    windowSettings: '窗口设置',
    selectMode: '选择模式',
    modes: {
      standard: '标准模式',
      keyboard: '键盘模式'
    }
  },
  general: {
    section: {
      application: '应用设置',
      updates: '更新设置'
    },
    alwaysOnTop: '置顶窗口',
    launchAtLogin: '开机启动',
    hideWindowOnStartup: '启动时隐藏窗口',
    autoCheckUpdates: '自动检查更新',
    language: {
      title: '语言',
      options: {
        en: 'English',
        id: 'Bahasa Indonesia',
        'zh-CN': '简体中文'
      }
    },
    permissions: {
      title: '权限设置',
      authorized: '已授权',
      authorize: '去授权',
      inputMonitoring: {
        title: '输入监控权限',
        description: '开启输入监控权限，以便接收系统的键盘和鼠标事件来响应你的操作。',
        instructions: '如果权限已开启，先选中后点击"-"按钮将其删除，再重新手动添加，并重启应用以确保权限生效。',
        openSettings: '前往开启'
      }
    }
  },
  model: {
    management: '模型管理',
    selected: '已选模型',
    addModel: '添加模型',
    removeModel: '移除模型',
    modelInfo: '模型信息',
    noModelSelected: '未选择模型',
    comingSoon: '敬请期待',
    author: '作者',
    description: '描述',
    modelName: '模型名称',
    preview: '预览',
    modelFiles: '模型文件',
    uploadPreview: '上传预览',
    uploadFiles: '上传文件',
    confirmDelete: '确认删除',
    deleteWarning: '删除的模型无法恢复。确定继续？',
    selectedSuccess: '模型选择成功',
    addSuccess: '模型添加成功',
    deleteSuccess: '模型删除成功',
    deleteError: '删除模型失败。默认模型不能删除。',
    formError: '请填写所有必填字段',
    uploadSuccess: '文件上传成功',
    modelNamePlaceholder: '输入模型名称',
    authorPlaceholder: '输入作者名称',
    descriptionPlaceholder: '输入模型描述',
    noModelFound: '未找到模型'
  },
  about: {
    version: '版本',
    checkForUpdates: '检查更新',
    github: 'GitHub',
    license: '许可证',
    aboutApp: '关于软件',
    openSource: '开源地址',
    reportIssue: '反馈问题'
  },
  updateApp: {
    newVersion: '发现新版本',
    currentVersion: '当前版本',
    description: '更新说明',
    download: '下载安装',
    later: '稍后再说',
    updateDate: '更新时间',
    updateNotes: '更新日志',
    updateVersion: '更新版本',
    updateFound: '发现新版本🥳',
    alreadyLatest: '当前已是最新版本🎉',
    updating: '立即更新'
  },
  tray: {
    preferences: '偏好设置...',
    showCat: '显示猫咪',
    hideCat: '隐藏猫咪',
    catMode: '猫咪模式',
    opacity: '不透明度',
    restart: '重启应用',
    quit: '退出应用',
    version: '版本',
    shortcuts: {
      title: '键盘快捷键',
      preferences: '偏好设置 (Ctrl+,)',
      show_hide: '显示/隐藏猫咪 (Ctrl+H)',
      std_mode: '标准模式 (Ctrl+1)',
      kbd_mode: '键盘模式 (Ctrl+2)',
      penetrable: '穿透模式 (Ctrl+P)',
      mirror: '镜像模式 (Ctrl+M)',
      updates: '检查更新 (Ctrl+U)',
      github: '打开 GitHub (Ctrl+G)',
      restart: '重启应用 (Ctrl+R)',
      quit: '退出应用 (Ctrl+Q)'
    }
  }
} 