<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue'

import { Select, Slider, Switch } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

import ProList from '@/components/pro-list/index.vue'
import ProListItem from '@/components/pro-list-item/index.vue'
import { useCatStore } from '@/stores/cat'

const catStore = useCatStore()
const { t } = useI18n()

const modeList: SelectProps['options'] = [
  {
    label: 'Mode Standar',
    value: 'standard',
  },
  {
    label: 'Mode Keyboard',
    value: 'keyboard',
  },
]

function scaleFormatter(value?: number) {
  return value === 100 ? 'Default' : `${value}%`
}

function opacityFormatter(value?: number) {
  return `${value}%`
}
</script>

<template>
  <ProList title="Pengaturan Model">
    <ProListItem title="Pilih Mode">
      <Select
        v-model:value="catStore.mode"
        :options="modeList"
      />
    </ProListItem>

    <ProListItem title="Efek Cermin">
      <Switch v-model:checked="catStore.mirrorMode" />
    </ProListItem>

    <ProListItem
      :description="t('cat.singleModeDescription')"
      title="Mode Tombol Tunggal"
    >
      <Switch v-model:checked="catStore.singleMode" />
    </ProListItem>
  </ProList>

  <ProList :title="t('cat.windowSettings')">
    <ProListItem
      description="Aktifkan untuk tidak mempengaruhi operasi aplikasi lain"
      title="Penetrasi Jendela"
    >
      <Switch v-model:checked="catStore.penetrable" />
    </ProListItem>

    <ProListItem
      description="Anda juga dapat menarik untuk mengubah ukuran jendela saat menggerakkan mouse ke tepi jendela"
      title="Ukuran Jendela"
      vertical
    >
      <Slider
        v-model:value="catStore.scale"
        class="m-0!"
        :max="150"
        :min="50"
        :tip-formatter="scaleFormatter"
      />
    </ProListItem>

    <ProListItem
      title="Tidak Transparan"
      vertical
    >
      <Slider
        v-model:value="catStore.opacity"
        class="m-0!"
        :tip-formatter="opacityFormatter"
      />
    </ProListItem>
  </ProList>
</template>
