# vue-ba-spark
[![npm](https://img.shields.io/npm/v/vue-ba-spark?style=flat-square&logo=npm)](https://www.npmjs.com/package/vue-ba-spark)
[![vue](https://img.shields.io/badge/vue-3.x-yellow?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![stars](https://img.shields.io/github/stars/LateDreamXD/vue-ba-spark?style=flat-square&logo=github)](https://github.com/LateDreamXD/vue-ba-spark/stargazers)
[![issues](https://img.shields.io/github/issues-search/LateDreamXD/vue-ba-spark?query=is%3Aopen&style=flat-square&logo=github&label=issues)](https://github.com/LateDreamXD/vue-ba-spark/issues)
[![license](https://img.shields.io/github/license/LateDreamXD/vue-ba-spark?style=flat-square&logo=github)](https://github.com/LateDreamXD/vue-ba-spark/blob/main/LICENSE)

[English](./README.en.md) | 简体中文

把蔚蓝档案风格的粒子效果从 [DoomVoss/BASpark](https://github.com/DoomVoss/BASpark) 移植到 Vue 3

## 使用
### 注册为全局组件
```js
import { createApp } from 'vue';
import App from './App.vue';
import BASpark from 'vue-ba-spark';

const app = createApp(App);
app.component('BASpark', BASpark);
app.mount('#app');
```

### 组件中导入
```html
<script setup>
import BASpark from 'vue-ba-spark';
</script>
<template>
  <BASpark />
</template>
```

### 组件属性
你可以像 `canvas` 元素一样传参给 `BASpark` 组件，就像这样：
```html
<BASpark title="VUE-BASPARK" style="border: 1px solid deepskyblue;" />
```
  
  

你也可以传递 `opts` 属性给 `BASpark` 组件来自定义效果。
| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `color` | `string` | `45,175,255` | 效果（点击特效和鼠标轨迹）的主要颜色，格式为`r,g,b` |
| `scale` | `number` | `1` | 效果的缩放比例 |
| `opacity` | `number` | `1` | 效果的透明度 |
| `speed` | `number` | `1` | 动画速度 |
| `maxTrail` | `number` | `16` | 轨迹上三角形的最大数量 |
| `alwaysTrail` | `boolean` | `false` | 在鼠标未按下时也显示轨迹 |
| `showFPS` | `boolean` | `false` | 显示帧率 |

## Star History

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=LateDreamXD/vue-ba-spark&type=Date&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=LateDreamXD/vue-ba-spark&type=Date" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=LateDreamXD/vue-ba-spark&type=Date" />
</picture>
