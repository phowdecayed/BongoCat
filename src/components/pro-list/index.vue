<script setup lang="ts">
import { Flex } from 'ant-design-vue'

const { title } = defineProps<{
  title: string
}>()
</script>

<template>
  <Flex
    class="pro-list"
    gap="small"
    vertical
  >
    <div
      class="pro-list-title"
      data-tauri-drag-region
    >
      {{ title }}
    </div>

    <Flex
      gap="middle"
      vertical
    >
      <slot />
    </Flex>
  </Flex>
</template>

<style scoped>
.pro-list {
  margin-bottom: 1.5rem;
}

.pro-list-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
</style>
