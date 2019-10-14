# 插件

> 高德地图提供了一些插件方便我们使用，目前 FastAMap 只支持工具类插件，详情点击 [工具类](https://lbs.amap.com/api/javascript-api/reference/plugin) '注意：' Hotspot、Heatmap、RangingTool 等赞不支持，可以通过获取地图实例自行扩展该功能。

## 插件注册

> 通过传入 plugins 数组来配置相关插件，plugins 数组详情如下。

| 属性    | 类型   | 默认值   | 说明                                       |
| ------- | ------ | -------- | ------------------------------------------ |
| name    | string | 插件名称 | 插件的名称，使用全称例如 `AMap.PolyEditor` |
| events  | object | 插件事件 | 注册插件事件                               |
| options | object | 插件选项 | 插件                                       |

## 点标记聚合插件

<iframe height="565" style="width: 100%;" scrolling="no" title="marker-clusterer 插件调用" src="https://codepen.io/taoxusheng/embed/VwwawmV?height=565&theme-id=0" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/taoxusheng/pen/VwwawmV'>marker-clusterer 插件调用</a> by MT
  (<a href='https://codepen.io/taoxusheng'>@taoxusheng</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 编辑覆盖物插件

<iframe height="565" style="width: 100%;" scrolling="no" title="plugins 调用" src="https://codepen.io/taoxusheng/embed/NWWNWaN?height=565&theme-id=0" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/taoxusheng/pen/NWWNWaN'>plugins 调用</a> by MT
  (<a href='https://codepen.io/taoxusheng'>@taoxusheng</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
