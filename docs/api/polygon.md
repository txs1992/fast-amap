# fast-polygon 多边形覆盖物组件

## 示例

### 简单实例

:::tip
FastAMap 是一个高性能的高德地图组件，下面有个按钮可以渲染 2k 覆盖物，点击按钮体验一下。
:::

<iframe height="565" style="width: 100%;" scrolling="no" title="fast-polygon" src="//codepen.io/taoxusheng/embed/gNBMqY/?height=565&theme-id=dark,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/taoxusheng/pen/gNBMqY/'>fast-polygon</a> by MT
  (<a href='https://codepen.io/taoxusheng'>@taoxusheng</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 方法调用

:::tip
polygon 组件提供了一些操作 polygon 实例的方法，下面是调用演示。
:::

<iframe height="565" style="width: 100%;" scrolling="no" title="fast-polygon  方法调用示例" src="//codepen.io/taoxusheng/embed/oraEXb/?height=565&theme-id=dark,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/taoxusheng/pen/oraEXb/'>fast-polygon  方法调用示例</a> by MT
  (<a href='https://codepen.io/taoxusheng'>@taoxusheng</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 属性

| 属性                | 类型            | 默认值  | 说明                                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | --------------- | :-----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **options**         | Array           |    -    | 这里是对 polygon 的扩展，该数组中存放 polygon options 对象，当前对象的属性会覆盖通过 prop 传递的属性。建议将 ptah 数组与自定义数据放在该数组中。                                                                                                                                                                                                       |
| **mid**             | number / string |    -    | 地图实例的唯一 id，polygon 组件通过 mid 获取对应的地图实例，然后将覆盖物渲染在对应的地图实例中。                                                                                                                                                                                                                                                       |
| beforeCreatePolygon | Function        |    -    | 如果传递了该函数，将在渲染 Polygon 之前调用函数，参数是传入的 options 以及相关 prop 属性的合并对象                                                                                                                                                                                                                                                     |
| zIndex              | number          |   10    | 多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示默认 zIndex：10                                                                                                                                                                                                                                  |
| path                | Array           |    -    | 多边形轮廓线的节点坐标数组，当为“环”多边形时（多边形区域在多边形内显示为“岛”），path 为二维数组，数组元素为多边形轮廓线的节点坐标数组 “环”多边形时，要求数组第一个元素为外多边形，其余为“岛”多边形，外多边形需包含“岛”多边形，否则程序不作处理                                                                                                         |
| bubble              | boolean         |  false  | 是否将覆盖物的鼠标或 touch 等事件冒泡到地图上，默认值：false                                                                                                                                                                                                                                                                                           |
| cursor              | string          |    -    | 指定鼠标悬停时的鼠标样式，自定义 cursor，IE 仅支持 cur/ani/ico 格式，Opera 不支持自定义 cursor                                                                                                                                                                                                                                                         |
| strokeColor         | string          | #006600 | 线条颜色，使用 16 进制颜色代码赋值                                                                                                                                                                                                                                                                                                                     |
| strokeOpacity       | number          |   0.9   | 轮廓线透明度，取值范围[0,1]，0 表示完全透明，1 表示不透明                                                                                                                                                                                                                                                                                              |
| strokeWeight        | number          |    -    | 轮廓线宽度                                                                                                                                                                                                                                                                                                                                             |
| fillColor           | string          |    -    | 多边形填充颜色，使用 16 进制颜色代码赋值，如：#FFAA00                                                                                                                                                                                                                                                                                                  |
| fillOpacity         | number          |   0.9   | 多边形填充透明度，取值范围[0,1]，0 表示完全透明，1 表示不透明                                                                                                                                                                                                                                                                                          |
| draggable           | boolean         |  false  | 设置多边形是否可拖拽移动，默认为 false                                                                                                                                                                                                                                                                                                                 |
| extData             | Any             |    -    | 用户自定义属性，支持 JavaScript API 任意数据类型，如 Polygon 的 id 等                                                                                                                                                                                                                                                                                  |
| strokeStyle         | number          |    -    | 轮廓线样式，实线:solid，虚线:dashed                                                                                                                                                                                                                                                                                                                    |
| strokeDasharray     | Array           |   []    | 勾勒形状轮廓的虚线和间隙的样式，此属性在 strokeStyle 为 dashed 时有效， 此属性在 ie9+浏览器有效 取值： <br/>实线：[0,0,0] <br/>虚线：[10,10] ，[10,10] 表示 10 个像素的实线和 10 个像素的空白（如此反复）组成的虚线<br/>点画线：[10,2,10]， [10,2,10] 表示 10 个像素的实线和 2 个像素的空白 + 10 个像素的实线和 10 个像素的空白 （如此反复）组成的虚线 |

# 事件

:::tip
Polygon 组件的事件对象中可以获取 options 中的自定义属性数据，通过 event.target.dataOptions 获取。
:::

| 事件       |                                      参数                                      | 说明                                     |
| ---------- | :----------------------------------------------------------------------------: | ---------------------------------------- |
| click      | [MapsEvent](https://lbs.amap.com/api/javascript-api/reference/event#MapsEvent) | 鼠标左键单击事件                         |
| click      |                                   MapsEvent                                    | 鼠标左键单击事件                         |
| dblclick   |                                   MapsEvent                                    | 鼠标左键双击事件                         |
| rightclick |                                   MapsEvent                                    | 右键单击                                 |
| hide       |                                 {type, target}                                 | 隐藏                                     |
| show       |                                 {type, target}                                 | 显示                                     |
| mousedown  |                                   MapsEvent                                    | 鼠标按下                                 |
| mouseup    |                                   MapsEvent                                    | 鼠标抬起                                 |
| mouseover  |                                   MapsEvent                                    | 鼠标经过                                 |
| mouseout   |                                   MapsEvent                                    | 鼠标移出                                 |
| change     |                                       -                                        | 属性发生变化时                           |
| touchstart |                                   MapsEvent                                    | 触摸开始时触发事件，仅适用移动设备       |
| touchmove  |                                   MapsEvent                                    | 触摸移动进行中时触发事件，仅适用移动设备 |
| touchend   |                                   MapsEvent                                    | 触摸结束时触发事件，仅适用移动设备       |

## 方法

:::tip
通过 `$refs` 获取组件实例来调用。例如：`this.$refs.myPolygon.getAllPolygons()`，关于 Polygon 类的实例方法，请查看官方文档 [Polygon](https://lbs.amap.com/api/javascript-api/reference/overlay#polygon)
:::

| 方法             |        参数         | 返回值 | 说明                                          |
| ---------------- | :-----------------: | :----: | --------------------------------------------- |
| getAMap        | -     | 获取 AMap 类，返回一个 Promise 对象，在 reslove 中返回 AMap 类 |
| getAMapInstance | -     | 获取 AMap 类，请在地图组件 complete 之后获取，否则返回值可能是 Null |
| getMapInstance | - 或 mid | 根据 mid 获取当前地图实例，默认会根据组件传入的 mid 属性获取 |
| hideAll | - | - | 隐藏当前组件所有的 polygon 实例 |
| showAll | - | - | 显示当前组件所有的 polygon 实例 |
| clearAll | - | - | 清空当前组件所有的 polygon 实例 |
| removePolygons   |        Array        |   -    | 删除传入的 polygon 实例，该方法不会导致 vue 重新渲染|
| getAllPolygons   |          -          | Array  | 获取当前组件所有的 polygon 实例               |
| getPolygonByProp | propName, propValue |   -    | 根据传入的属性名称与值查找对应的 polygon 实例 |
| getPolygonByProps | propName, propValues |   -    | 根据传入的属性名称与值的数组查找对应的 polygon 实例数组，该方法对遍历做了优化，建议使用该方法获取 polygon 数组 |
| addPolygons | options, beforeCreatePolygon | - | options 是一个 polygon 属性的数组，没有的属性会通过组件传递的属性获取。beforeCreatePolygon 是一个可选的回调函数，默认可以不传递，可在创建 polygon 之前调用，将 polygon 属性传入其中，可以通过该方法处理自定义渲染。新增的 polygon 数组会添加在组件中，此时 getAllPolygons 方法获取的数组中包含新增 polygon，该方法不会导致 vue 重新渲染 |