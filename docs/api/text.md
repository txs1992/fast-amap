## fast-text 纯文本标记

> 纯文本标记，继承自 Marker，具有 Marker 的大部分属性、方法和事件

## 示例

<iframe height="565" style="width: 100%;" scrolling="no" title="fast-text 示例" src="//codepen.io/taoxusheng/embed/BgEygg/?height=565&theme-id=dark,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/taoxusheng/pen/BgEygg/'>fast-text 示例</a> by MT
  (<a href='https://codepen.io/taoxusheng'>@taoxusheng</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 属性

| 属性        |      类型       | 默认值 | 说明                                                                                                                                             |
| ----------- | :-------------: | :----: | --- |
| **mid**     | number / string |   -    | 地图实例的唯一 marker 组件通过 mid 获取对应的地图实例，然后将覆盖物渲染在对应的地图实例中。                                                      |
| **options** |      Array      |   -    | 这里是对 marker 的扩展，该数组中存放 marker options 对象，当前对象的属性会覆盖通过 prop 传递的属性。若是 offset 数组是每个 text 实例独立的，应该与自定义数据放在该数组中。 |
| isItemOffset | boolean  | false | 当 isItemIcon 为 true，将会为每一个 options 数组中的对象的 offset 属性创建一个 Pixel 实例，默认将复用组件传入的 offset 属性创建的 Pixel 实例。默认 false 共用 Pixel 实例。|
| text | string | - | 标记显示的文本内容 |
| anchor       | string | top-left | 设置点标记锚点。 <br/>默认值：'top-left' <br/>可选值：'top-left', 'top-center', 'top-right', 'middle-left', 'center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right' |
| offset       | Array | - | marker 组件会获取 offset 属性去创建 Pixel。例如：[-10,-34] 会执行 new Pixel(-10,-34)<br/>点标记显示位置偏移量，默认值为 Pixel(-10,-34)。Marker 指定 position 后，默认以 marker 左上角位为基准点（若设置了 anchor，则以 anchor 设置位置为基准点），对准所给定的 position 位置，若需使 marker 指定位置对准在 position 处，需根据 marker 的尺寸设置一定的偏移量。 |
| topWhenClick | boolean | false | 鼠标点击时是否置顶，默认false ，不置顶 |
| bubble | boolean | false | 是否将覆盖物的鼠标或touch等事件冒泡到地图上，默认值：false |
| draggable | boolean | false | 设置点标记是否可拖拽移动，默认为false |
| raiseOnDrag | boolean | false | 设置拖拽点标记时是否开启点标记离开地图的效果 |
| cursor | string | - | 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor |
| visible | boolean | true | 点标记是否可见，默认为true |
| zIndex | number | 100 | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示。默认zIndex：100 |
| angle | number | - | 点标记的旋转角度，广泛用于改变车辆行驶方向。注：angle属性是使用CSS3来实现的，支持IE9及以上版本 |
| autoRotation | boolean | false | 是否自动旋转。点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为false。广泛用于自动调节车辆行驶方向。IE8以下不支持旋转，autoRotation属性无效 |
| animation    | string | AMAP_ANIMATION_NONE | 点标记的动画效果，<br/>默认值：“AMAP_ANIMATION_NONE” <br/>可选值：<br/>“AMAP_ANIMATION_NONE”，无动画效果 <br/>“AMAP_ANIMATION_DROP”，点标掉落效果 <br/>“AMAP_ANIMATION_BOUNCE”，点标弹跳效果 |
| shadow | Icon | - | 点标记阴影，不设置该属性则点标记无阴影 |
| title | string | - | 鼠标滑过点标记时的文字提示，不设置则鼠标滑过点标无文字提示 |
| clickable | boolean | false | 点标记是否可点击 |
| extData | any | - | 用户自定义属性，支持JavaScript API任意数据类型，如 Text 的id等，这里的数据可以放在 options 中 |

## 事件

| 事件 | 参数 | 说明 |
| - | :-: | - |
| click      | [MapsEvent](https://lbs.amap.com/api/javascript-api/reference/event#MapsEvent) | 鼠标左键单击事件                                                                                                                                                                                                                                    |
| dblclick   |                                   MapsEvent                                    | 鼠标左键双击事件                                                                                                                                                                                                                                    |
| rightclick |                                   MapsEvent                                    | 鼠标右键单击事件                                                                                                                                                                                                                                    |
| mousemove  |                                   MapsEvent                                    | 鼠标移动                                                                                                                                                                                                                                            |
| mouseover  |                                   MapsEvent                                    | 鼠标移近点标记时触发事件                                                                                                                                                                                                                            |
| mouseout   |                                   MapsEvent                                    | 鼠标移出点标记时触发事件                                                                                                                                                                                                                            |
| mousedown  |                                   MapsEvent                                    | 鼠标在点标记上按下时触发事件                                                                                                                                                                                                                        |
| mouseup    |                                   MapsEvent                                    | 鼠标在点标记上按下后抬起时触发事件                                                                                                                                                                                                                  |
| dragstart  |                                   MapsEvent                                    | 开始拖拽点标记时触发事件                                                                                                                                                                                                                            |
| dragging   |                                   MapsEvent                                    | 鼠标拖拽移动点标记时触发事件                                                                                                                                                                                                                        |
| dragend    |                                   MapsEvent                                    | 点标记拖拽移动结束触发事件                                                                                                                                                                                                                          |
| moving     |                                     Object                                     | 点标记在执行 moveTo，moveAlong 动画时触发事件，Object 对象的格式是{passedPath:Array.<[LngLat](https://lbs.amap.com/api/javascript-api/reference/core/#LngLat)>}。<br/>其中 passedPath 为 Marker 对象在 moveAlong 或者 moveTo 过程中已经走过的路径。 |
| moveend    |                                       -                                        | 点标记执行 moveTo 动画结束时触发事件，也可以由 moveAlong 方法触发                                                                                                                                                                                   |
| movealong  |                                       -                                        | 点标记执行 moveAlong 动画一次后触发事件                                                                                                                                                                                                             |
| touchstart |                                   MapsEvent                                    | 触摸开始时触发事件，仅适用移动设备                                                                                                                                                                                                                  |
| touchmove  |                                   MapsEvent                                    | 触摸移动进行中时触发事件，仅适用移动设备                                                                                                                                                                                                            |
| touchend   |                                   MapsEvent                                    | 触摸结束时触发事件，仅适用移动设备                                                                                                                                                                                                                  |


## 方法

:::tip
通过 `$refs` 获取组件实例来调用。例如：`this.$refs.myText.getAllTexts()`，关于 Polygon 类的实例方法，请查看官方文档 [Polygon](https://lbs.amap.com/api/javascript-api/reference/overlay#text)
:::

| 方法             |        参数         | 返回值 | 说明                                          |
| ---------------- | :-----------------: | :----: | --------------------------------------------- |
| getAMapPromise  | -     | Promise |获取 AMap 类，返回一个 Promise 对象，在 reslove 中返回 AMap 类 |
| getAMapInstance | -     | AMap | 获取 AMap 类，请在地图组件 complete 之后获取，否则返回值可能是 Null |
| getMapInstance | - 或 mid | map |根据 mid 获取当前地图实例，默认会根据组件传入的 mid 属性获取 |
| hideAll | - | - | 隐藏当前组件所有的 text 实例 |
| showAll | - | - | 显示当前组件所有的 text 实例 |
| clearAll | - | - | 清空当前组件所有的 text 实例 |
| removeTexts   | texts, propName |   -    | 删除传入的 text 实例数组，该方法不会导致 vue 重新渲染，propName 是每个 polygon 实例 options 中的唯一值，例如 id, key 它用来做查询优化，请保证每个实例 options 中的 propName 值都是唯一的，如果传入该参数将会大大优化性能。|
| getAllTexts   |          -          | Array  | 获取当前组件所有的 text 实例               |
| getTextByProp | propName, propValue |   -    | 根据传入的属性名称与值查找对应的 text 实例 |
| getTextByProps | propName, propValues |   -    | 根据传入的属性名称与值的数组查找对应的 text 实例数组，该方法对遍历做了优化，建议使用该方法获取 text 数组 |
| addTexts        | options, isItemOffset, beforeCreate |    -    | options 是一个 texts 属性的数组，没有的属性会通过组件传递的属性获取。<br/><br/>isItemOffset 默认是 false, 当 isItemOffset 为 true 将会为 options 数组中每个对象的 offset 属性创建 Pixel 实例，默认 fals 共用组件传入的 offset 属性所创建的 Pixel 实例。 <br/><br/>beforeCreate 是一个可选的回调函数，默认可以不传递，可在创建 text 之前调用，将 text 属性传入其中，可以通过该方法处理自定义渲染。新增的 text 数组会添加在组件中，此时 getAllMarkers 方法获取的数组中包含新增 text，该方法不会导致 vue 重新渲染 |