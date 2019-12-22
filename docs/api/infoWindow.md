## fast-info-window 信息窗体

## 示例

<iframe height="565" style="width: 100%;" scrolling="no" title="fast-info-window 示例" src="//codepen.io/taoxusheng/embed/ZgqvjY/?height=565&theme-id=dark,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/taoxusheng/pen/ZgqvjY/'>fast-info-window 示例</a> by MT
  (<a href='https://codepen.io/taoxusheng'>@taoxusheng</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Slot

> 可以将自定义的 DOM 或是其他自定义组件通过 slot 方式传入信息窗体组件中，注意如果传递了 content 属性， slot 将会失效。

## 属性

| 属性              | 类型            | 默认值        | 说明                                                                                                                                                                                          |
| ----------------- | --------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **mid**           | number / string | -             | 地图实例的唯一 circleMarker 组件通过 mid 获取对应的地图实例，然后将覆盖物渲染在对应的地图实例中。                                                                                             |
| **options**       | Object          | -             | 信息窗体实例创建时的配置属性，**注意 options 对象里面的属性会覆盖除 mid 以外的所有属性**，可以不传递，该属性是 FastInfoWindow 组件的一个扩展，可以将一些自定义属性以及数据放在 options 对象中 |
| beforeCreate      | Function        | -             | 如果传递了该函数，将在渲染 circleMarker 之前调用函数，参数是传入的 options 以及相关 prop 属性的合并对象                                                                                       |
| isCustom          | Boolean         | false         | 是否自定义窗体。设为 true 时，信息窗体外框及内容完全按照 content 所设的值添加（默认为 false，即在系统默认的信息窗体外框中显示 content 内容）                                                  |
| autoMove          | Boolean         | false         | 是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）                                                                                      |
| content           | String          | -             | 显示内容，如果没传递默认使用 slot 渲染                                                                                                                                                        |
| closeWhenClickMap | Boolean         | false         | 控制是否在鼠标点击地图后关闭信息窗体，默认 false，鼠标点击地图后不关闭信息窗体                                                                                                                |
| size              | Array           | -             | 信息窗体尺寸（isCustom 为 true 时，该属性无效）                                                                                                                                               |
| anchor            | String          | bottom-center | 信息窗体锚点位置，可选值：'top-left'、'top-center'、'top-right'、'middle-left'、'center'、'middle-right'、'bottom-left'、'bottom-center'、'bottom-right'                                      |
| offset            | Array           | -             | 信息窗体显示位置偏移量。默认基准点为信息窗体的底部中心（若设置了 anchor，则以 anchor 值为基准点）                                                                                             |
| position          | Array           | -             | 信息窗体显示基点位置                                                                                                                                                                          |
| showShadow        | Boolean         | false         | 控制是否显示信息窗体阴影，取值 false 时不显示窗体阴影，取值 true 时显示窗体阴影。                                                                                                             |
| defaultOpen        | Boolean         | true         | 控制 infoWindow 创建时是否打开。                                                                                                       |

# 事件

:::tip
circle 组件的事件对象中可以获取 options 中的自定义属性数据，通过 event.target.dataOptions 获取。
:::

| 事件   | 参数 | 说明                     |
| ------ | :--: | ------------------------ |
| change |  -   | 属性发生变化时           |
| open   |  -   | 信息窗体打开之后触发事件 |
| close  |  -   | 信息窗体关闭之后触发事件 |

## 方法

:::tip
通过 `$refs` 获取组件实例来调用。例如：`this.$refs.infoWindow.getInfoWindowInstance()`，关于 InfoWindow 类的实例方法，请查看官方文档 [InfoWindow](https://lbs.amap.com/api/javascript-api/reference/infowindow#InfoWindow)
:::

| 方法            |   参数   | 返回值 | 说明 |
| --------------- | :------: | ----------------------------- | ---- |
| getAMapPromise  |    -     | 获取 AMap 类，返回一个 Promise 对象，在 reslove 中返回 AMap 类      |
| getAMapInstance |    -     | 获取 AMap 类，请在地图组件 complete 之后获取，否则返回值可能是 Null |
| getMapInstance  | - 或 mid | 根据 mid 获取当前地图实例，默认会根据组件传入的 mid 属性获取        |
| open | - 或 position | 根据 position 位置在地图中打开信息窗体，默认根据组件传递的 position 属性位置打开。 |
| close | - | 关闭信息窗体 |
| getInfoWindowInstance | - | 获取信息窗体实例 |
