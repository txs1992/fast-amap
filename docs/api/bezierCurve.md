## fast-bezier-curve 贝瑟尔曲线类

## 示例

<iframe height="565" style="width: 100%;" scrolling="no" title="fast-bezier-curve 示例" src="//codepen.io/taoxusheng/embed/RXVEYd/?height=565&theme-id=dark,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/taoxusheng/pen/RXVEYd/'>fast-bezier-curve 示例</a> by MT
  (<a href='https://codepen.io/taoxusheng'>@taoxusheng</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 属性

| 属性            | 类型            | 默认值  | 说明                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | --------------- | :-----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **options**     | Array           |    -    | 这里是对 bezierCurve 的扩展，该数组中存放 bezierCurve options 对象，当前对象的属性会覆盖通过 prop 传递的属性。建议将 ptah 数组与自定义数据放在该数组中。                                                                                                                                                                                                       |
| **mid**         | number / string |    -    | 地图实例的唯一 id，bezierCurve 组件通过 mid 获取对应的地图实例，然后将覆盖物渲染在对应的地图实例中。                                                                                                                                                                                                                                                       |
| beforeCreate    | Function        |    -    | 如果传递了该函数，将在渲染 bezierCurve 之前调用函数，参数是传入的 options 以及相关 prop 属性的合并对象                                                                                                                                                                                                                                                     |
| zIndex          | number          |   10    | 多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示默认 zIndex：10                                                                                                                                                                                                                                  |
| path            | Array           |    -    |  贝瑟尔曲线的路径。描述为一个二维数组规则如下：第一个元素是起点，<br />之后的元素同时描述控制点和途经点，之后每个元素可以有0个到2个控制点<br/>控制点在前，途经点在最后<br/>[<br/> [lng,lat],//起点0<br/>[lng,lat,lng,lat],//控制点、途经点1<br/>[lng,lat,lng,lat,lng,lat],//控制点、控制点、途经点2<br/>[lng,lat,lng,lat]//控制点、途经点3<br/>]<br/>或者<br/>[<br/>  [ [lng,lat] ],//起点0<br/>  [ [lng,lat] , [lng,lat] ],//控制点、途经点1<br/>  [ [lng,lat] , [lng,lat] , [lng,lat]],//控制点、控制点、途经点2<br/>  [ [lng,lat] , [lng,lat] ]//控制点、途经点3<br/>]<br/> |
| showDir | boolean | false | 是否显示白色方向箭头 |
| bubble          | boolean         |  false  | 是否将覆盖物的鼠标或 touch 等事件冒泡到地图上，默认值：false                                                                                                                                                                                                                                                                                           |
| cursor          | string          |    -    | 指定鼠标悬停时的鼠标样式，自定义 cursor，IE 仅支持 cur/ani/ico 格式，Opera 不支持自定义 cursor                                                                                                                                                                                                                                                         |
| strokeColor     | string          | #006600 | 线条颜色，使用 16 进制颜色代码赋值                                                                                                                                                                                                                                                                                                                     |
| strokeOpacity   | number          |   0.9   | 轮廓线透明度，取值范围[0,1]，0 表示完全透明，1 表示不透明                                                                                                                                                                                                                                                                                              |
| strokeWeight    | number          |    -    | 轮廓线宽度                                                                                                                                                                                                                                                                                                                                             |

| draggable       | boolean         |  false  | 设置多边形是否可拖拽移动，默认为 false                                                                                                                                                                                                                                                                                                                 |
| extData         | Any             |    -    | 用户自定义属性，支持 JavaScript API 任意数据类型，如 bezierCurve 的 id 等                                                                                                                                                                                                                                                                                  |
| strokeStyle     | number          |    -    | 轮廓线样式，实线:solid，虚线:dashed                                                                                                                                                                                                                                                                                                                    |
| strokeDasharray | Array           |   []    | 虚线的分段，如[10,10] |
| isOutline | boolean | false | 是否描边 |
| outlineColor | string | - | 描边颜色 |
| borderWeight | number | - | 描边宽度 |

# 事件

:::tip
bezierCurve 组件的事件对象中可以获取 options 中的自定义属性数据，通过 event.target.dataOptions 获取。
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
| change     |                                       -                                        | 属性发生变化时                           |
| touchstart |                                   MapsEvent                                    | 触摸开始时触发事件，仅适用移动设备       |
| touchmove  |                                   MapsEvent                                    | 触摸移动进行中时触发事件，仅适用移动设备 |
| touchend   |                                   MapsEvent                                    | 触摸结束时触发事件，仅适用移动设备       |

## 方法

:::tip
通过 `$refs` 获取组件实例来调用。例如：`this.$refs.mybezierCurve.getAll()`，关于 bezierCurve 类的实例方法，请查看官方文档 [bezierCurve](https://lbs.amap.com/api/javascript-api/reference/overlay#bezierCurve)
:::

| 方法               |         参数          | 返回值  | 说明                                                                                                                                                                                                                                                                     |
| ------------------ | :-------------------: | :-----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| getAMapPromise     |           -           | Promise | 获取 AMap 类，返回一个 Promise 对象，在 reslove 中返回 AMap 类                                                                                                                                                                                                           |
| getAMapInstance    |           -           |  AMap   | 获取 AMap 类，请在地图组件 complete 之后获取，否则返回值可能是 Null                                                                                                                                                                                                      |
| getMapInstance     |       - 或 mid        |   map   | 根据 mid 获取当前地图实例，默认会根据组件传入的 mid 属性获取                                                                                                                                                                                                             |
| hideAll            |           -           |    -    | 隐藏当前组件所有的 bezierCurve 实例                                                                                                                                                                                                                                          |
| showAll            |           -           |    -    | 显示当前组件所有的 bezierCurve 实例                                                                                                                                                                                                                                          |
| clearAll           |           -           |    -    | 清空当前组件所有的 bezierCurve 实例                                                                                                                                                                                                                                          |
| removebezierCurves     |  bezierCurves, propName   |    -    | 删除传入的 bezierCurve 实例数组，该方法不会导致 vue 重新渲染，propName 是每个 bezierCurve 实例 options 中的唯一值，例如 id, key 它用来做查询优化，请保证每个实例 options 中的 propName 值都是唯一的，如果传入该参数将会大大优化性能。                                            |
| getAll             |           -           |  Array  | 获取当前组件所有的 bezierCurve 实例                                                                                                                                                                                                                                          |
| getInstanceByProp  |  propName, propValue  |    -    | 根据传入的属性名称与值查找对应的 bezierCurve 实例                                                                                                                                                                                                                            |
| getAllInstanceByProp  |  propName, propValue  |    -    | 根据传入的属性名称与值查找所有对应的 bezierCurve 实例                                                                                                                                                                                                                            |
| getInstanceByProps | propName, propValues  |    -    | 根据传入的属性名称与值的数组查找对应的 bezierCurve 实例数组，该方法对遍历做了优化，建议使用该方法获取 bezierCurve 数组                                                                                                                                                           |
| addbezierCurves        | options, beforeCreate |    -    | options 是一个 bezierCurve beforeCreate 是一个可选的回调函数，默认可以不传递，可在创建 bezierCurve 之前调用，将 bezierCurve 属性传入其中，可以通过该方法处理自定义渲染。新增的 bezierCurve 数组会添加在组件中，此时 getAll 方法获取的数组中包含新增 bezierCurve，该方法不会导致 vue 重新渲染 |
