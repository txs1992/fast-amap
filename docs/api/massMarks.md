## fast-mass-marks 海量点

## 示例

<iframe height="565" style="width: 100%;" scrolling="no" title="fast-mass-marks 示例" src="https://codepen.io/taoxusheng/embed/ZEWGWrB?height=565&theme-id=dark&result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/taoxusheng/pen/ZEWGWrB'>fast-mass-marks 示例</a> by MT
  (<a href='https://codepen.io/taoxusheng'>@taoxusheng</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


## 属性

| 属性 | 类型 | 默认值 | 说明 |
| -- | -- | -- | -- |
| **mid** | number / string | - | 地图实例的唯一 circleMarker 组件通过 mid 获取对应的地图实例，然后将覆盖物渲染在对应的地图实例中。|
| **options** | Object | - | 海量点图层实例创建时的配置属性，**注意 options 对象里面的属性会覆盖除 mid 以外的所有属性**，可以不传递，该属性是 FastMassMarks 组件的一个扩展，可以将一些自定义属性以及数据放在 options 对象中 |
| zIndex | number | 5 | 图层叠加的顺序值，0表示最底层。 |
| opacity | number | 0 | 图层的透明度，取值范围[0,1]，1代表完全不透明，0代表完全透明 |
| zooms | array | - | 支持的缩放级别范围，默认范围[3-18]，在PC上，取值范围为[3-18]；在移动设备上，取值范围为[3-19] |
| cursor | string | - | 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor |
| alwaysRender | boolean | - | 表示是否在拖拽缩放过程中实时重绘，默认true，建议超过10000的时候设置false |
| styleOption | object / array | - | 用于设置点的样式，当点样式一致时传入StyleObject即可；当需要展示多种点样式时，传入StyleObject的数组，此时需要为Data中每个元素指定 style字段为该元素要显示的样式在StyleObject数组中的索引 |

## StyleOption 属性

| 属性 | 类型 | 默认值 | 说明 |
| -- | -- | -- | -- |
| anchor | array | - |  必填参数，图标显示位置偏移量，以图标的左上角为基准点。传入数组会被转换成 Pixel 实例。例如 [1,1] => new AMap.Pixel(1,1) |
| url | string | - |  必填参数,图标的地址 |
| size | array | - |  必填参数，图标的尺寸。 传入数组会被转换成 Size 实例。例如 [1,1] => new AMap.Size(1,1)|
| rotation | number | - |  旋转角度 |

# 事件

:::tip
circle 组件的事件对象中可以获取 options 中的自定义属性数据，通过 event.target.dataOptions 获取。
:::

| 事件   | 参数 | 说明                     |
| ------ | :--: | ------------------------ |
| complete |  -   | 海量点加载完成事件 |
| click   | Object | 鼠标左键单击事件 |
| dblclick   | Object | 鼠标左键双击事件 |
| mouseout   | Object | 鼠标移出海量点图标时触发事件 |
| mouseup   | Object | 鼠标在海量点图标上按下后抬起时触发事件 |
| mousedown   | Object | 鼠标在海量点图标按下时触发事件 |
| touchstart   | Object | 触摸开始时触发事件，仅适用移动设备, 数据结构同setDatas中的数据集 |
| touchend   | Object | 触摸结束时触发事件，仅适用移动设备, 数据结构同setDatas中的数据集 |

## 方法

:::tip
通过 `$refs` 获取组件实例来调用。例如：`this.$refs.massMarks.getMassMarksInstance()`，关于 MassMarks 类的实例方法，请查看官方文档 [MassMarks](https://lbs.amap.com/api/javascript-api/reference/layer#MassMarks)
:::

| 方法            |   参数   | 返回值 | 说明 |
| --------------- | :------: | ----------------------------- | ---- |
| getAMapPromise  |    -     | 获取 AMap 类，返回一个 Promise 对象，在 reslove 中返回 AMap 类      |
| getAMapInstance |    -     | 获取 AMap 类，请在地图组件 complete 之后获取，否则返回值可能是 Null |
| getMapInstance  | - 或 mid | 根据 mid 获取当前地图实例，默认会根据组件传入的 mid 属性获取 |
| getMassMarksInstance  | - | 通过 $refs 组件实例获取 MassMarks 图层实例 |
