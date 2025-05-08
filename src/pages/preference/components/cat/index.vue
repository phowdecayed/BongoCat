<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue'

import { Select, Slider, Switch, Flex } from 'ant-design-vue'
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
    <ProListItem 
      :title="t('cat.selectMode')"
      icon="i-tabler-category"
    >
      <Select
        v-model:value="catStore.mode"
        :options="modeList"
        :title="t('cat.selectMode')"
      />
    </ProListItem>
  </ProList>

  <ProList :title="t('cat.windowSettings')">
    <ProListItem
      :description="t('cat.penetrableDescription')"
      :title="t('cat.penetrable')"
      icon="i-tabler-click"
    >
      <Switch v-model:checked="catStore.penetrable" />
    </ProListItem>

    <ProListItem
      :title="t('cat.opacity')"
      icon="i-tabler-opacity"
      vertical
    >
      <Slider
        v-model:value="catStore.opacity"
        class="m-0!"
      />
    </ProListItem>

    <ProListItem 
      :title="t('cat.mirrorMode')"
      icon="i-tabler-flip-horizontal"
    >
      <Switch v-model:checked="catStore.mirrorMode" />
    </ProListItem>

    <ProListItem
      :title="t('cat.scale')"
      :description="t('cat.scaleDescription', { min: 0.5, max: 2 })"
      icon="i-tabler-resize"
      vertical
    >
      <Flex justify="space-between" align="center" class="mb-2">
        <Slider
          v-model:value="catStore.scale"
          :min="0.5"
          :max="2"
          :step="0.1"
          class="m-0! flex-1 mr-4"
        />
        <input
          v-model.number="catStore.scale"
          type="number"
          min="0.5"
          max="2"
          step="0.1"
          class="w-20 text-center border rounded p-1"
        />
      </Flex>
    </ProListItem>
  </ProList>
</template>
