<template>
  <div class="collapsible-toc">
    <details :open="isOpen">
      <summary @click.prevent="toggleToc">
        <span class="toc-icon">{{ isOpen ? '▼' : '▶' }}</span>
        <span class="toc-title">{{ title }}</span>
      </summary>
      <nav class="toc-content" v-if="headings.length > 0">
        <ul class="toc-list">
          <li
            v-for="heading in headings"
            :key="heading.id"
            :class="['toc-item', `toc-level-${heading.level}`]"
          >
            <a
              :href="`#${heading.id}`"
              @click="scrollToHeading($event, heading.id)"
              class="toc-link"
            >
              <span class="toc-marker" v-if="heading.level === 2">▸</span>
              <span class="toc-marker toc-marker-sub" v-if="heading.level === 3">•</span>
              <span class="toc-marker toc-marker-sub" v-if="heading.level === 4">▪</span>
              {{ heading.text }}
            </a>
          </li>
        </ul>
      </nav>
      <div v-else class="toc-empty">暂无目录</div>
    </details>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Heading {
  id: string;
  text: string;
  level: number;
}

// Props
interface Props {
  title?: string;
  defaultOpen?: boolean;
  minLevel?: number;
  maxLevel?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: '目录',
  defaultOpen: false,
  minLevel: 2,
  maxLevel: 3,
});

// State
const isOpen = ref(props.defaultOpen);
const headings = ref<Heading[]>([]);

// Methods
const toggleToc = () => {
  isOpen.value = !isOpen.value;
};

const extractHeadings = () => {
  const container = document.querySelector('.vp-doc') || document.querySelector('main');
  if (!container) return;

  const headingElements = container.querySelectorAll(
    Array.from({ length: props.maxLevel - props.minLevel + 1 }, (_, i) => `h${props.minLevel + i}`).join(', ')
  );

  headings.value = Array.from(headingElements).map((el) => {
    const element = el as HTMLElement;
    let id = element.id;
    
    // 如果没有 id，生成一个
    if (!id) {
      id = element.textContent?.trim().replace(/\s+/g, '-').toLowerCase() || '';
      element.id = id;
    }

    return {
      id,
      text: element.textContent?.trim() || '',
      level: parseInt(element.tagName.substring(1)),
    };
  });
};

const scrollToHeading = (event: Event, id: string) => {
  event.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    // 平滑滚动到目标位置
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    
    // 更新 URL hash（不触发跳转）
    history.pushState(null, '', `#${id}`);
  }
};

// Lifecycle
onMounted(() => {
  // 延迟提取标题，确保 DOM 已完全渲染
  setTimeout(() => {
    extractHeadings();
  }, 100);
});

onUnmounted(() => {
  // 清理工作（如果需要）
});
</script>

<style scoped>
.collapsible-toc {
  margin: 1.5rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
}

.collapsible-toc:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

details {
  cursor: pointer;
}

summary {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  user-select: none;
  list-style: none;
  outline: none;
}

summary::-webkit-details-marker {
  display: none;
}

.toc-icon {
  display: inline-block;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  transition: transform 0.3s ease;
}

.toc-title {
  flex: 1;
}

.toc-content {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.toc-level-2 {
  padding-left: 0;
}

.toc-level-3 {
  padding-left: 1.2rem;
}

.toc-level-4 {
  padding-left: 2.4rem;
}

.toc-level-5 {
  padding-left: 4.5rem;
}

.toc-level-6 {
  padding-left: 6rem;
}

.toc-link {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-block;
  position: relative;
  padding: 0.2rem 0;
}

/* 二级标题前的标记符号 */
.toc-marker {
  display: inline-block;
  margin-right: 0.5rem;
  color: var(--vp-c-brand-1);
  font-weight: bold;
  font-size: 1.1em;
  transition: transform 0.2s ease;
}

/* 三级、四级标题的标记符号（稍小、颜色稍淡） */
.toc-marker-sub {
  font-size: 1em;
  color: var(--vp-c-text-3);
  font-weight: normal;
  margin-right: 0.4rem;
}

/* 悬停时标记符号动画 */
.toc-link:hover .toc-marker {
  transform: translateX(2px);
}

/* 悬停时子级标记符号变色 */
.toc-link:hover .toc-marker-sub {
  color: var(--vp-c-brand-1);
}

.toc-link:hover {
  color: var(--vp-c-brand-1);
  transform: translateX(4px);
}

.toc-link::before {
  content: '';
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 0;
  background-color: var(--vp-c-brand-1);
  transition: height 0.2s ease;
}

.toc-link:hover::before {
  height: 100%;
}

.toc-empty {
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .collapsible-toc {
    padding: 0.75rem;
  }

  .toc-level-3 {
    padding-left: 1rem;
  }

  .toc-level-4 {
    padding-left: 2rem;
  }

  .toc-level-5 {
    padding-left: 3rem;
  }

  .toc-level-6 {
    padding-left: 4rem;
  }
}

/* 暗色模式优化 */
.dark .collapsible-toc {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}

.dark .collapsible-toc:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}
</style>
