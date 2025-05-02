<script setup lang="ts">
import { Flex } from 'ant-design-vue'
import { computed, useSlots } from 'vue'

const { title, icon, description, vertical } = defineProps<{
  title?: string
  icon?: string
  description?: string
  vertical?: boolean
}>()

const slots = useSlots()

const hasIcon = computed(() => {
  return icon || slots.icon
})
const hasDescription = computed(() => {
  return description || slots.description
})
</script>

<template>
  <Flex
    :align="vertical ? void 0 : 'center'"
    class="pro-list-item"
    gap="middle"
    justify="space-between"
    :vertical="vertical"
  >
    <Flex align="center" :class="{ 'w-full': vertical }">
      <slot name="icon">
        <div
          v-if="icon"
          class="pro-list-item-icon"
          :class="icon"
        />
      </slot>

      <Flex
        :class="{ 'ml-4': hasIcon, 'w-full': vertical }"
        vertical
      >
        <div v-if="title" class="pro-list-item-title">
          {{ title }}
        </div>

        <div
          class="pro-list-item-description"
          :class="{ 'mt-2': hasDescription }"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </Flex>
    </Flex>

    <slot />
  </Flex>
</template>

<style scoped>
.pro-list-item {
  border: 1px solid var(--ant-color-split);
  border-radius: 0.5rem;
  background-color: white;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.pro-list-item:last-child {
  margin-bottom: 0;
}

.pro-list-item-icon {
  min-width: 2rem;
  font-size: 1rem;
  flex-shrink: 0;
}

.pro-list-item-title {
  font-size: 0.875rem;
  font-weight: 500;
}

.pro-list-item-description {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.45);
}

.pro-list-item-description a {
  color: rgba(0, 0, 0, 0.45);
}

.pro-list-item-description a:hover {
  color: var(--ant-color-primary-5);
}

.pro-list-item-description a:active {
  color: var(--ant-color-primary-7);
}

.w-full {
  width: 100%;
}
</style>
