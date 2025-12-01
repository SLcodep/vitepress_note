<template>
  <div class="collapse-section">
    <div 
      class="collapse-header" 
      @click="toggle"
      :class="{ 'is-collapsed': isCollapsed }"
    >
      <span class="collapse-title">{{ title }}</span>
      <span class="collapse-icon">
        <svg 
          viewBox="0 0 24 24" 
          width="20" 
          height="20"
          :style="{ transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }"
        >
          <path 
            fill="currentColor" 
            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
          />
        </svg>
      </span>
    </div>
    <div 
      class="collapse-content" 
      :class="{ 'is-collapsed': isCollapsed }"
      ref="contentRef"
    >
      <div class="collapse-content-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  defaultCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultCollapsed: false
})

const isCollapsed = ref(props.defaultCollapsed)
const contentRef = ref<HTMLElement>()

const toggle = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.collapse-section {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.collapse-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: var(--vp-c-bg-soft);
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
}

.collapse-header:hover {
  background-color: var(--vp-c-bg-mute);
}

.collapse-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.collapse-icon {
  display: flex;
  align-items: center;
  color: var(--vp-c-text-2);
  transition: transform 0.3s ease;
}

.collapse-icon svg {
  transition: transform 0.3s ease;
}

.collapse-content {
  max-height: 2000px;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: 1;
}

.collapse-content.is-collapsed {
  max-height: 0;
  opacity: 0;
}

.collapse-content-inner {
  padding: 16px;
}

/* 深色模式适配 */
.dark .collapse-section {
  border-color: var(--vp-c-divider);
}

.dark .collapse-header {
  background-color: var(--vp-c-bg-soft);
}

.dark .collapse-header:hover {
  background-color: var(--vp-c-bg-mute);
}
</style>
