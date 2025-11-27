// .vitepress/navConfig.ts
import type { DefaultTheme } from 'vitepress';

// 定义导航配置（复用 VitePress 内置类型，保证类型提示）
export const nav: DefaultTheme.NavItem[] = [
  { text: "首页", link: "/" },
  {
    text: "配置",
    link: "/reference/config",
    activeMatch: "/01.配置/",
  },
  { 
    text: "前端基础", 
    link: "/qianduan/qianduan-index", 
    activeMatch: "/05.前端基础笔记/" 
  },
  {
    text: "功能页",
    items: [
      { text: "归档页", link: "/archives" },
      { text: "清单页", link: "/articleOverview" },
      { text: "登录页", link: "/login" },
      {
        text: "风险链接提示页",
        link: "/risk-link?target=https://vp.teek.top",
      },
    ],
  }
];

