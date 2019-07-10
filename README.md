<h1 align="center">
	Fast AMap
</h1>

<p align="center">
  <a href="https://travis-ci.com/txs1992/fast-amap.svg?branch=master">
    <img src="https://travis-ci.com/txs1992/fast-amap.svg?branch=master" />
  </a>
  <a href="https://img.shields.io/npm/dt/fast-amap.svg">
    <img src="https://img.shields.io/npm/dt/fast-amap.svg" />
  </a>
  <a href="https://img.shields.io/npm/dm/fast-amap.svg">
    <img src="https://img.shields.io/npm/dm/fast-amap.svg" />
  </a>
  <a href="https://img.shields.io/npm/v/fast-amap.svg">
    <img src="https://img.shields.io/npm/v/fast-amap.svg" />
  </a>
  <a href="https://img.shields.io/npm/l/fast-amap.svg">
    <img src="https://img.shields.io/npm/l/fast-amap.svg" />
  </a>
  <a href="https://img.shields.io/node/v/passport.svg">
    <img src="https://img.shields.io/node/v/passport.svg" />
  </a>
</p>

> Fast AMap 是一个基于高德地图封装的一个高性能 Vue 组件库

### [文档](https://txs1992.github.io/fast-amap/)

## 为什么要做这个库？

这个想法来源于之前开发的一个项目，该项目需要在 zoom 16 的级别下渲染 (100 \* 100) 的小方格，使用高德地图的多边形覆盖物 Polygon 进行渲染，在 mac 13 寸屏幕下渲染 `1k+`，在外接 27 寸(不太记得多少寸了)显示屏下需要渲染近 `3K` 的覆盖物。

我尝试使用 vue-amap 这个组件库，在 `1k` 覆盖物的情况下需要渲染 5 秒左右，在 `3k` 覆盖物的渲染下会渲染 30+ 秒，甚至会让浏览器直接崩溃。我选择自己通过 AMap SDK 封装了一个组件，然而性能比 vue-amap 还要差，`1k` 覆盖物需要耗费 10+ 秒，如果我拿这个交给产品，他估计会打死我。

为什么会出现这种情况，事实上，我们在使用 Vue 开发的时候通过 `props` 将数据传递给组件或是 `data`，而 Vue 默认会对这些数据进行 `deepWatch`，而我放在 data 上的 Polygon 实例每次都会被 Vue 绑定，这就是造成性能降低的原因。最后我自己封装了一个 Polygon 的渲染类，`1k+` 覆盖物渲染在 1 秒左右，虽然解决了性能问题，但使用却很不方便，因为在业务中有太多关于渲染处理的代码，无法做到只关心数据问题，需要编写很多配置属性。Fast AMap 就是为了这个问题而诞生的库。

### 使用示例

```js
// 在 main.js 中引入 FastAMap
import Vue from 'vue'
import FastAMap from 'fast-amap'

Vue.use(FastAMap)

// 设置你需要加载的高德地图版本
FastAMap.mapOptions.setOptions({
  key: 'd2d76e2274bf5973ecfb1f68454b6f3b',
  version: '1.4.15'
})
```

```vue
// 在组件在使用
<fast-map
  :mid="12"
  :zoom="15"
  :options="options"
  :double-click-zoom="false"
  @click="handleClick"
  @complete="handleComplete"
>
  <!-- 在地图中渲染一些自定义的组件或是 DOM -->
  <h1>Hello Fast AMap</h1>
  <!-- 渲染多边形覆盖物 -->
  <fast-polygon :path="[xx]" :mid="12" @click="handlePolygonClick"></fast-polygon>
</fast-map>
```
