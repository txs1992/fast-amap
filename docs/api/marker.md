# fast-marker 点标记组件

## 示例

### 简单示例

:::tip
FastMarker 组件的简单使用示例，请将自定义数据放在 options 参数中。
:::

<iframe height="565" style="width: 100%;" scrolling="no" title="fast-marker 示例" src="//codepen.io/taoxusheng/embed/dBQjoR/?height=565&theme-id=dark,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/taoxusheng/pen/dBQjoR/'>fast-marker 示例</a> by MT
  (<a href='https://codepen.io/taoxusheng'>@taoxusheng</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 综合示例

:::tip
使用 FastMarker 组件提供的一些方法可以应对一些特殊需求，使用这些方法不会导致 Vue 重新渲染，请注意通过方法获取的 marker 实例，不要被 Vue 绑定否则会有性能影响。
:::

<iframe height="565" style="width: 100%;" scrolling="no" title="fast-marker 示例" src="//codepen.io/taoxusheng/embed/ydQqym/?height=565&theme-id=dark,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/taoxusheng/pen/dBQjoR/'>fast-marker 示例</a> by MT
  (<a href='https://codepen.io/taoxusheng'>@taoxusheng</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| ---- | :--: | :----: | ---- |
| **mid** | number / string | - | 地图实例的唯一 marker 组件通过 mid 获取对应的地图实例，然后将覆盖物渲染在对应的地图实例中。 |
| **options** | Array | - | 这里是对 marker 的扩展，该数组中存放 marker options 对象，当前对象的属性会覆盖通过 prop 传递的属性。建议将 offset 数组与自定义数据放在该数组中。 |
| position | Array | - | 点标记在地图上显示的位置，默认为地图中心点 |
| anchor | string | top-left | 设置点标记锚点。 <br/>默认值：'top-left' <br/>可选值：'top-left', 'top-center', 'top-right', 'middle-left', 'center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right' |
| offset | Array | - | marker 组件会获取 offset 属性去创建 Pixel。例如：[-10,-34] 会执行 new Pixel(-10,-34)<br/>点标记显示位置偏移量，默认值为Pixel(-10,-34)。Marker指定position后，默认以marker左上角位为基准点（若设置了anchor，则以anchor设置位置为基准点），对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。 |
| icon | string / icon | - | 需在点标记中显示的图标。可以是一个本地图标地址，或者Icon对象。有合法的content内容时，此属性无效 |
| content | string / Object | - | 点标记显示内容，可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖 |
| topWhenClick | boolean | false | 鼠标点击时marker是否置顶，默认false ，不置顶 |
| bubble | boolean | false | 是否将覆盖物的鼠标或touch等事件冒泡到地图上，默认值：false |
| draggable | boolean | false | 设置点标记是否可拖拽移动，默认为false |
| raiseOnDrag | boolean | false | 设置拖拽点标记时是否开启点标记离开地图的效果 |
| cursor | string | - | 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor |
| visible | boolean | true | 点标记是否可见，默认为true |
| zIndex | number | 100 | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示。默认zIndex：100 |
| angle | number | - | 点标记的旋转角度，广泛用于改变车辆行驶方向<br/>注：angle属性是使用CSS3来实现的，支持IE9及以上版本 |
| autoRotation | boolean | false | 是否自动旋转。点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为false。广泛用于自动调节车辆行驶方向。IE8以下不支持旋转，autoRotation属性无效 |
| animation | string | AMAP_ANIMATION_NONE | 点标记的动画效果，<br/>默认值：“AMAP_ANIMATION_NONE” <br/>可选值：<br/>“AMAP_ANIMATION_NONE”，无动画效果 <br/>“AMAP_ANIMATION_DROP”，点标掉落效果 <br/>“AMAP_ANIMATION_BOUNCE”，点标弹跳效果 |
| shadow | icon | - | 点标记阴影，不设置该属性则点标记无阴影 |
| title | string | - | 鼠标滑过点标记时的文字提示，不设置则鼠标滑过点标无文字提示 |
| clickable | boolean | false | 点标记是否可点击 |
|  shape | [MarkerShape](https://lbs.amap.com/api/javascript-api/reference/overlay#MarkerShape) | - | 设置Marker的可点击区域，在定义的区域内可触发Marker的鼠标点击事件 |
| extData | Any | - | 用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等 |
| label | {content,offset,direction} | - | 添加文本标注。content 为文本标注的内容。direction 为文本标注方位（自 v1.4.14 新增属性），可选值：'top'，'right'，'bottom'，'left'，'center'，默认值：'top' 。offset 为偏移量（默认基准点为图标左上角），如设置了 direction，以 direction 方位为基准点进行偏移。 [相关示例](https://lbs.amap.com/api/javascript-api/example/marker/set-marker-text-label) |

## 事件

:::tip
markder 组件的事件对象中可以获取 options 中的自定义属性数据，通过 event.target.dataOptions 获取。
:::

| 事件 | 参数 | 说明|
| - | :-: | - |
| click | [MapsEvent](https://lbs.amap.com/api/javascript-api/reference/event#MapsEvent) | 鼠标左键单击事件 |
| dblclick | MapsEvent | 鼠标左键双击事件 |
| rightclick | MapsEvent | 鼠标右键单击事件 |
| mousemove | MapsEvent | 鼠标移动 |
| mouseover | MapsEvent | 鼠标移近点标记时触发事件 |
| mouseout | MapsEvent | 鼠标移出点标记时触发事件 |
| mousedown | MapsEvent | 鼠标在点标记上按下时触发事件 |
| mouseup | MapsEvent | 鼠标在点标记上按下后抬起时触发事件 |
| dragstart | MapsEvent | 开始拖拽点标记时触发事件 |
| dragging | MapsEvent | 鼠标拖拽移动点标记时触发事件 |
| dragend | MapsEvent | 点标记拖拽移动结束触发事件 |
| moving | Object | 点标记在执行moveTo，moveAlong动画时触发事件，Object对象的格式是{passedPath:Array.<[LngLat](https://lbs.amap.com/api/javascript-api/reference/core/#LngLat)>}。<br/>其中passedPath为Marker对象在moveAlong或者moveTo过程中已经走过的路径。 |
| moveend | - | 点标记执行moveTo动画结束时触发事件，也可以由moveAlong方法触发 |
| movealong | - | 点标记执行moveAlong动画一次后触发事件 |
| touchstart | MapsEvent | 触摸开始时触发事件，仅适用移动设备 |
| touchmove | MapsEvent | 触摸移动进行中时触发事件，仅适用移动设备 |
| touchend | MapsEvent | 触摸结束时触发事件，仅适用移动设备 |

## 方法

:::tip
通过 `$refs` 获取组件实例来调用。例如：`this.$refs.myPolygon.getAllMarkers()`，关于 Marker 类的实例方法，请查看官方文档 [Marker](https://lbs.amap.com/api/javascript-api/reference/overlay#marker)
:::

| 方法             |        参数         | 返回值 | 说明                                          |
| ---------------- | :-----------------: | :----: | --------------------------------------------- |
| getAMapPromise  | -     | Promise |获取 AMap 类，返回一个 Promise 对象，在 reslove 中返回 AMap 类 |
| getAMapInstance | -     | AMap | 获取 AMap 类，请在地图组件 complete 之后获取，否则返回值可能是 Null |
| getMapInstance | - 或 mid | map |根据 mid 获取当前地图实例，默认会根据组件传入的 mid 属性获取 |
| hideAll | - | - | 隐藏当前组件所有的 marker 实例 |
| showAll | - | - | 显示当前组件所有的 marker 实例 |
| clearAll | - | - | 清空当前组件所有的 marker 实例 |
| removeMarkers   | markers, propName |   -    | 删除传入的 markers 实例，该方法不会导致 vue 重新渲染，propName 是每个 marker 实例 options 中的唯一值，例如 id, key 它用来做查询优化，请保证每个实例 options 中的 propName 值都是唯一的，如果传入该参数将会大大优化性能。 |
| getAllMarkers  |          -          | Array  | 获取当前组件所有的 marker 实例               |
| getMarkerByProp | propName, propValue |   -    | 根据传入的属性名称与值查找对应的 marker 实例 |
| getMarkersByProps | propName, propValues |   -    | 根据传入的属性名称与值的数组查找对应的 marker 实例数组，该方法对遍历做了优化，建议使用该方法获取 marker 数组 |
| addMarkers | options, beforeCreatePolygon | - | options 是一个 marker 属性的数组，没有的属性会通过组件传递的属性获取。beforeCreatePolygon 是一个可选的回调函数，默认可以不传递，可在创建 marker 之前调用，将 marker 属性传入其中，可以通过该方法处理自定义渲染。新增的 marker 数组会添加在组件中，此时 getAllMarkers 方法获取的数组中包含新增 marker，该方法不会导致 vue 重新渲染 |