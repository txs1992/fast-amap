## fast-circle 圆形覆盖物

## 示例

<iframe height="565" style="width: 100%;" scrolling="no" title="fast-circle示例" src="//codepen.io/taoxusheng/embed/voJWYE/?height=565&theme-id=dark,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/taoxusheng/pen/voJWYE/'>fast-circle示例</a> by MT
  (<a href='https://codepen.io/taoxusheng'>@taoxusheng</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
## 属性

| 属性 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| **options** | Array | - | 这里是对 circle 的扩展，该数组中存放 circle options 对象，当前对象的属性会覆盖通过 prop 传递的属性。建议将 ptah 数组与自定义数据放在该数组中。 |
| **mid** | number / string | - | 地图实例的唯一 circle 组件通过 mid 获取对应的地图实例，然后将覆盖物渲染在对应的地图实例中。 |
| beforeCreate | Function | - | 如果传递了该函数，将在渲染 circle 之前调用函数，参数是传入的 options 以及相关 prop 属性的合并对象 |
| zIndex | Number | 10 | 层叠顺序 |
| center | Array | - | 圆心位置 |
| bubble | Boolean | false | 是否将覆盖物的鼠标或touch等事件冒泡到地图上 |
| cursor | String | - | 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor |
| radius | Number | - | 圆半径，单位:米 |
| strokeColor | String | #006600 | 线条颜色，使用16进制颜色代码赋值 |
| strokeOpacity | Number | 0.9 | 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9 |
| strokeWeight | Number | - | 轮廓线宽度 |
| fillColor | String | #006600 | 圆形填充颜色,使用16进制颜色代码赋值 |
| fillOpacity | Number | 0.9 | 圆形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明 |
| strokeStyle | String | - | 轮廓线样式，实线:solid，虚线:dashed |
| extData | Object | - | 用户自定义属性，支持JavaScript API任意数据类型，如Circle的id等 |
| strokeDasharray | Array | - | 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： <br />实线：[0,0,0] <br />虚线：[10,10] ，[10,10] 表示10 个像素的实线和10 个像素的空白（如此反复）组成的虚线<br />点画线：[10,2,10]， [10,2,10] 表示10 个像素的实线和2 个像素的空白 + 10 个像素的实线和10 个像素的空白 （如此反复）组成的虚线 |


# 事件

:::tip
circle 组件的事件对象中可以获取 options 中的自定义属性数据，通过 event.target.dataOptions 获取。
:::

| 事件       |                                      参数                                      | 说明                                     |
| ---------- | :----------------------------------------------------------------------------: | ---------------------------------------- |
| click      | [MapsEvent](https://lbs.amap.com/api/javascript-api/reference/event#MapsEvent) | 鼠标左键单击事件                         |
| dblclick   |                                   MapsEvent                                    | 鼠标左键双击事件                         |
| rightclick |                                   MapsEvent                                    | 右键单击                                 |
| hide       |                                 {type, target}                                 | 隐藏                                     |
| show       |                                 {type, target}                                 | 显示                                     |
| mousedown  |                                   MapsEvent                                    | 鼠标按下                                 |
| mouseup    |                                   MapsEvent                                    | 鼠标抬起                                 |
| mouseover  |                                   MapsEvent                                    | 鼠标经过                                 |
| mouseout   |                                   MapsEvent                                    | 鼠标移出                                 |
| change     |                                 {type, target}                                        | 属性发生变化时                           |
| touchstart |                                   MapsEvent                                    | 触摸开始时触发事件，仅适用移动设备       |
| touchmove  |                                   MapsEvent                                    | 触摸移动进行中时触发事件，仅适用移动设备 |
| touchend   |                                   MapsEvent                                    | 触摸结束时触发事件，仅适用移动设备       |

## 方法

:::tip
通过 `$refs` 获取组件实例来调用。例如：`this.$refs.myCircle.getAll()`，关于 circle 类的实例方法，请查看官方文档 [circle](https://lbs.amap.com/api/javascript-api/reference/overlay#circle)
:::

| 方法               |         参数          | 返回值  | 说明                                                                                                                                                                                                                                                                     |
| ------------------ | :-------------------: | :-----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| getAMapPromise     |           -           | Promise | 获取 AMap 类，返回一个 Promise 对象，在 reslove 中返回 AMap 类                                                                                                                                                                                                           |
| getAMapInstance    |           -           |  AMap   | 获取 AMap 类，请在地图组件 complete 之后获取，否则返回值可能是 Null                                                                                                                                                                                                      |
| getMapInstance     |       - 或 mid        |   map   | 根据 mid 获取当前地图实例，默认会根据组件传入的 mid 属性获取                                                                                                                                                                                                             |
| hideAll            |           -           |    -    | 隐藏当前组件所有的 circle 实例                                                                                                                                                                                                                                          |
| showAll            |           -           |    -    | 显示当前组件所有的 circle 实例                                                                                                                                                                                                                                          |
| clearAll           |           -           |    -    | 清空当前组件所有的 circle 实例                                                                                                                                                                                                                                          |
| removeCircles     |  circle, propName   |    -    | 删除传入的 circle 实例数组，该方法不会导致 vue 重新渲染，propName 是每个 circle 实例 options 中的唯一值，例如 id, key 它用来做查询优化，请保证每个实例 options 中的 propName 值都是唯一的，如果传入该参数将会大大优化性能。                                            |
| getAll             |           -           |  Array  | 获取当前组件所有的 circle 实例                                                                                                                                                                                                                                          |
| getInstanceByProp  |  propName, propValue  |    -    | 根据传入的属性名称与值查找对应的 circle 实例                                                                                                                                                                                                                            |
| getInstanceByProps | propName, propValues  |    -    | 根据传入的属性名称与值的数组查找对应的 circle 实例数组，该方法对遍历做了优化，建议使用该方法获取 circle 数组                                                                                                                                                           |
| addCircles        | options, beforeCreate |    -    | options 是一个 circle beforeCreate 是一个可选的回调函数，默认可以不传递，可在创建 circle 之前调用，将 circle 属性传入其中，可以通过该方法处理自定义渲染。新增的 circle 数组会添加在组件中，此时 getAll 方法获取的数组中包含新增 circle，该方法不会导致 vue 重新渲染 |
