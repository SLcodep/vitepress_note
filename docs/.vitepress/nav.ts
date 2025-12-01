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
    items: [
      { text: "css", link: "/qianduan/css" },
      { text: "javascript", link: "/qianduan/javascript" },
      { text: "浏览器原理", link: "/browser/01" },
      { text: "计算机网络", link: "/network/01" },
      { text: "设计模式", link: "/qian/design" },
      { text: "手写题", link: "/qian/write" },
    ]
  },
  {
    text: "Vue",
    link: "/vue/简介",
    activeMatch: "/10.Vue/"
  },
  {
    text: "性能优化",
    link: "/performance/overview",
    activeMatch: "/20.性能优化/"
  },
    {
    text: "前端工程化",
    link: "/enginee/简介",
    activeMatch: "/25.前端工程化/"
  },
  {
    text: "工具使用",
    items: [
      { text: "Git", link: "/Git/fisrt" },
      { text: "前端部署", link: "/deploy/fisrt" },
      { text: "其他操作", link: "/qian/npm" }
    ]
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

