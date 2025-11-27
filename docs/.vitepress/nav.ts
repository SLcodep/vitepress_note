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
    ]
  },
  {
    text: "Vue",
    link: "/vue/01",
    activeMatch: "/10.Vue/"
  },
  {
    text: "性能优化",
    link: "/performance/overview",
    activeMatch: "/20.性能优化/"
  },
  {
    text: "工具使用",
    items: [
      { text: "Git", link: "/Git/fisrt" },
      { text: "前端部署", link: "/deploy/fisrt" }
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

