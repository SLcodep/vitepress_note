# CollapsibleToc 组件使用文档

## 📖 简介

`CollapsibleToc` 是一个可折叠的文章目录导航组件，可以自动提取文章中的标题并生成目录。

## ✨ 功能特性

- ✅ **自动生成目录**：根据文章标题自动生成，无需手动维护
- ✅ **默认折叠**：目录默认处于折叠状态，节省页面空间
- ✅ **平滑滚动**：点击目录项平滑滚动到对应位置
- ✅ **层级缩进**：支持多级标题的层级展示
- ✅ **响应式设计**：适配深色/浅色模式，移动端友好
- ✅ **灵活配置**：支持自定义标题、展开状态、标题级别等

## 🚀 快速开始

### 基本使用

在 Markdown 文件中直接使用：

```markdown
---
title: 文章标题
---

<CollapsibleToc />

## 第一个标题

内容...

## 第二个标题

内容...
```

### 自定义配置

```markdown
<!-- 默认展开 -->
<CollapsibleToc :defaultOpen="true" />

<!-- 自定义标题 -->
<CollapsibleToc title="文章导航" />

<!-- 提取 h2-h4 级别的标题 -->
<CollapsibleToc :minLevel="2" :maxLevel="4" />

<!-- 组合配置 -->
<CollapsibleToc 
  title="快速导航" 
  :defaultOpen="true" 
  :minLevel="2" 
  :maxLevel="4" 
/>
```

## 📝 Props 配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `"目录"` | 目录标题 |
| `defaultOpen` | `boolean` | `false` | 是否默认展开 |
| `minLevel` | `number` | `2` | 最小标题级别（h2） |
| `maxLevel` | `number` | `3` | 最大标题级别（h3） |

## 🎨 样式说明

组件使用 VitePress 的 CSS 变量，会自动适配您的主题：

- `--vp-c-brand-1`：主题色（用于图标和悬停效果）
- `--vp-c-bg-soft`：背景色
- `--vp-c-divider`：分割线颜色
- `--vp-c-text-1/2/3`：文字颜色

## 💡 使用建议

1. **位置**：建议将组件放在文章标题（h1）下方，正文内容之前
2. **标题级别**：建议使用 `h2-h3` 或 `h2-h4`，避免层级过深
3. **标题命名**：确保标题文字清晰、简洁，便于导航

## 🔧 技术实现

- 使用 Vue 3 Composition API
- 自动扫描 `.vp-doc` 容器中的标题元素
- 使用原生 `scrollIntoView` API 实现平滑滚动
- 使用 CSS 变量实现主题适配

## 📦 文件结构

```
.vitepress/theme/
├── components/
│   ├── CollapsibleToc.vue      # 组件源码
│   └── README.md               # 本文档
└── index.ts                    # 组件注册
```

## 🐛 常见问题

### Q: 目录为空？
A: 确保文章中有 h2-h3 级别的标题，或者调整 `minLevel` 和 `maxLevel` 配置。

### Q: 点击跳转不准确？
A: 检查标题是否有唯一的 ID（VitePress 会自动生成）。

### Q: 样式不匹配？
A: 组件使用 VitePress 的 CSS 变量，确保主题正确加载。

## 📄 示例

查看完整示例：`docs/01.配置/16.CollapsibleToc使用示例.md`

## 🤝 贡献

如有问题或建议，欢迎反馈！
