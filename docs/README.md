---
home: true
# heroImage: /hero.png
actionText: 快速上手 →
actionLink: /guide/
features:
  - title: 高性能
    details: 将高德地图相关实例和数据与 Vue 实例进行解耦，性能无限接近于原生高德地图 SDK。
  - title: 简洁至上
    details: 提供了开箱即用的组件，按正常的 Vue 组件编写应用，不用在数据中编写一些奇怪的配置项，让您只关心数据。
  - title: 高拓展
    details: 每个组件中提供了获取高德地图与自身实例的方法，让您可以完成一些额外的特殊业务需求。
footer: MIT Licensed | Copyright © 2019-present txs1992
---

```vue
<fast-map
  :mid="12"
  :zoom="15"
  :options="options"
  :double-click-zoom="false"
  @click="handleClick"
  @complete="handleComplete">
  <!-- 在地图中渲染一些自定义的组件或是 DOM -->
  <h1>Hello Fast AMap</h1>
  <!-- 渲染多边形覆盖物 -->
  <fast-polygon :path="[xx]" :mid="12" @click="handlePolygonClick"></fast-polygon>
</fast-map>
```
