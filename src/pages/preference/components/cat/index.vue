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
    label: t('cat.modes.standard'),
    value: 'standard',
  },
  {
    label: t('cat.modes.keyboard'),
    value: 'keyboard',
  },
]
</script>

<template>
  <ProList :title="t('cat.modeSettings')">
    <ProListItem :title="t('cat.selectMode')">
      <Select
        v-model:value="catStore.mode"
        :options="modeList"
        :title="t('cat.selectMode')"
        style="width: 100%"
      />
    </ProListItem>
  </ProList>

  <ProList :title="t('cat.windowSettings')">
    <ProListItem
      :description="t('cat.penetrableDescription')"
      :title="t('cat.penetrable')"
    >
      <Switch v-model:checked="catStore.penetrable" />
    </ProListItem>

    <ProListItem
      :title="t('cat.opacity')"
      vertical
    >
      <Slider
        v-model:value="catStore.opacity"
        class="m-0! w-full"
      />
    </ProListItem>

    <ProListItem :title="t('cat.mirrorMode')">
      <Switch v-model:checked="catStore.mirrorMode" />
    </ProListItem>
  </ProList>
</template>
