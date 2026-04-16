# vue-ba-spark
[![npm](https://img.shields.io/npm/v/vue-ba-spark?style=flat-square&logo=npm)](https://www.npmjs.com/package/vue-ba-spark)
[![vue](https://img.shields.io/badge/vue-3.x-yellow?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![stars](https://img.shields.io/github/stars/LateDreamXD/vue-ba-spark?style=flat-square&logo=github)](https://github.com/LateDreamXD/vue-ba-spark/stargazers)
[![issues](https://img.shields.io/github/issues-search/LateDreamXD/vue-ba-spark?query=is%3Aopen&style=flat-square&logo=github&label=issues)](https://github.com/LateDreamXD/vue-ba-spark/issues)
[![license](https://img.shields.io/github/license/LateDreamXD/vue-ba-spark?style=flat-square&logo=github)](https://github.com/LateDreamXD/vue-ba-spark/blob/main/LICENSE)

English | [简体中文](./README.md)

Blue Archive Style Particle Effect port to vue3 from [DoomVoss/BASpark](https://github.com/DoomVoss/BASpark)

## Usage
### Register as Global Component
```js
import { createApp } from 'vue';
import App from './App.vue';
import BASpark from 'vue-ba-spark';

const app = createApp(App);
app.component('BASpark', BASpark);
app.mount('#app');
```

### Import in Component
```html
<script setup>
import BASpark from 'vue-ba-spark';
</script>
<template>
  <BASpark />
</template>
```

### Component Attributes
You can pass any attribute that can be passed to `canvas` to the `BASpark` component, like this:
```html
<BASpark title="VUE-BASPARK" style="border: 1px solid deepskyblue;" />
```
  
  

You can also pass the `opts` attribute to the `BASpark` component to customize the effect.
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | `string` | `45,175,255` | primary color of the effect (click effect and trail), format: `r,g,b` |
| `scale` | `number` | `1` | scale of the effect |
| `opacity` | `number` | `1` | opacity of the effect |
| `speed` | `number` | `1` | animation speed |
| `maxTrail` | `number` | `16` | maximum number of triangles on the trail |
| `alwaysTrail` | `boolean` | `false` | show trail even when mouse is not pressed |
| `showFPS` | `boolean` | `false` | show FPS counter |

## Star History

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=LateDreamXD/vue-ba-spark&type=Date&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=LateDreamXD/vue-ba-spark&type=Date" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=LateDreamXD/vue-ba-spark&type=Date" />
</picture>
