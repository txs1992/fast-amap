# fast-map 地图组件

> 地图组件，封装了地图的属性设置、图层变更、事件交互等接口的组件。

## 示例

:::tip
点击示例右上角的 `EDIT ON Codepen` 去 Codepen 网站修改示例，以体验更多配置。
:::

<iframe height="565" style="width: 100%;" scrolling="no" title="FastAMap 示例" src="//codepen.io/taoxusheng/embed/agRbrj/?height=565&theme-id=dark,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/taoxusheng/pen/agRbrj/'>FastAMap 示例</a> by MT
  (<a href='https://codepen.io/taoxusheng'>@taoxusheng</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Slot

> 可以将自定义的 DOM 或是其他地图组件传入 slot 中。

:::warning
### 注意
Slot 将会在地图实例 complete 事件触发后渲染，所有子组件实例的获取请在 complete 事件后执行，否则会是 Null。在 Slot 中的 DOM 或是组件的事件会派发到地图中，如果想禁止事件派发，请设置样式 `pointer-events: auto`。
:::

## 属性

:::tip
地图类详细 API 请查看 [地图 API](https://lbs.amap.com/api/javascript-api/reference/map)
:::

| 属性              | 类型                                                                            | 默认   | 说明                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **mid**           | number/string                                                                   | -      | 地图实例的唯一 id，必须值，不可重复                                                                                                                                                                                                                                                                                                                                       |
| **options**       | Object                                                                          | -      | 地图实例创建时的配置属性，**注意 options 对象里面的属性会覆盖除 mid 以外的所有属性**，可以不传递，该属性是 FastMap 组件的一个扩展，可以将一些自定义属性以及数据放在 options 对象中                                                                                                                                                                                        |
| view              | View2D                                                                          | null   | 地图视口，用于控制影响地图静态显示的属性，如：地图中心点“center” 推荐直接使用 zoom、center 属性为地图指定级别和中心点                                                                                                                                                                                                                                                     |
| layers            | Array                                                                           | []     | 地图图层数组，数组可以是[图层](https://lbs.amap.com/api/javascript-api/reference/layer#TileLayer) 中的一个或多个，默认为普通二维地图。当叠加多个图层时，普通二维地图需通过实例化一个 TileLayer 类实现                                                                                                                                                                     |
| center            | [LngLat](https://lbs.amap.com/api/javascript-api/reference/core#LngLat)         | null   | 地图中心点坐标值                                                                                                                                                                                                                                                                                                                                                          |
| labelzIndex       | Number                                                                          | -      | 地图标注显示顺序，大于 110 即可将底图上的默认标注显示在覆盖物（圆、折线、面）之上                                                                                                                                                                                                                                                                                         |
| zoom              | Number                                                                          | -      | 地图显示的缩放级别，若 center 与 level 未赋值，地图初始化默认显示用户所在城市范围。3D 地图下，zoom 值，可以设置为浮点数。（在 V1.3.0 版本 level 参数调整为 zoom，3D 地图修改自 V1.4.0 开始生效）                                                                                                                                                                          |
| zooms             | Array                                                                           | [3,18] | 地图显示的缩放级别范围，默认为[3,18]，取值范围[3-18]。原生高德地图 SDK 在 PC 上，默认为[3,18]，取值范围[3-18]，在移动设备上，默认为[3,19],取值范围[3-19]                                                                                                                                                                                                                  |
| lang              | string                                                                          | zh_cn  | 地图语言类型，可选值：zh_cn：中文简体，en：英文，zh_en：中英文对照，默认为: zh_cn：中文简体 **注：由于图面内容限制，中文、英文 、中英文地图 POI 可能存在不一致的情况**                                                                                                                                                                                                    |
| defaultCursor     | string                                                                          | -      | 地图默认鼠标样式。参数 defaultCursor 应符合 CSS 的 cursor 属性规范                                                                                                                                                                                                                                                                                                        |
| crs               | string                                                                          | -      | 地图显示的参考坐标系，取值：'EPSG3857'，'EPSG3395'，'EPSG4326'。自 V1.3.0 移入 view 对象中                                                                                                                                                                                                                                                                                |
| animateEnable     | boolean                                                                         | true   | 地图平移过程中是否使用动画（如调用 panBy、panTo、setCenter、setZoomAndCenter 等函数，将对地图产生平移操作，是否使用动画平移的效果），默认为 true，即使用动画                                                                                                                                                                                                              |
| isHotspot         | boolean                                                                         | true   | 是否开启地图热点和标注的 hover 效果。PC 端默认是 true，移动端默认是 false。**请注意：组件没有做移动端适配，使用移动端开发请修改该属性**                                                                                                                                                                                                                                   |
| defaultLayer      | [TileLayer](https://lbs.amap.com/api/javascript-api/reference/layer#TileLayer)  | -      | 当前地图中默认显示的图层。默认图层可以是 TileLayer.Satellite 等切片地图，也可以是通过 TileLayer 自定义的切片图层。（自 v1.3 废弃）                                                                                                                                                                                                                                        |
| rotateEnable      | boolean                                                                         | false  | 地图是否可旋转，3D 视图默认为 true，2D 视图默认 false。（V1.3 版本新增，3D 视图自 V1.4.0 开始支持）自 v1.4.8 开始，当此属性为 false 时，地图以初始属性设置的 rotation 值为旋转角度，同时 setRotation 和鼠标手势交互操作将不能改变旋转角度                                                                                                                                 |
| resizeEnable      | boolean                                                                         | false  | 是否监控地图容器尺寸变化，默认值为 false                                                                                                                                                                                                                                                                                                                                  |
| showIndoorMap     | boolean                                                                         | true   | 是否在有矢量底图的时候自动展示室内地图，PC 端默认是 true，移动端默认是 false。**请注意：组件没有做移动端适配，使用移动端开发请修改该属性**                                                                                                                                                                                                                                |
| indoorMap         | [IndoorMap](https://lbs.amap.com/api/javascript-api/reference/layer/#IndoorMap) | null   | 在展示矢量图的时候自动展示室内地图图层，当地图 complete 之后可以获取到该对象                                                                                                                                                                                                                                                                                              |
| expandZoomRange   | boolean                                                                         | -      | 是否支持可以扩展最大缩放级别,和 zooms 属性配合使用，设置为 true 的时候，zooms 的最大级别在 PC 上可以扩大到 20 级，移动端还是高清 19/非高清 20                                                                                                                                                                                                                             |
| dragEnable        | boolean                                                                         | true   | 地图是否可通过鼠标拖拽平移，默认为 true。此属性可被 setStatus/getStatus 方法控制                                                                                                                                                                                                                                                                                          |
| zoomEnable        | boolean                                                                         | true   | 地图是否可缩放，默认值为 true。此属性可被 setStatus/getStatus 方法控制                                                                                                                                                                                                                                                                                                    |
| doubleClickZoom   | boolean                                                                         | true   | 地图是否可通过双击鼠标放大地图，默认为 true。此属性可被 setStatus/getStatus 方法控制                                                                                                                                                                                                                                                                                      |
| keyboardEnable    | boolean                                                                         | true   | 地图是否可通过键盘控制，默认为 true 方向键控制地图平移，"+"和"-"可以控制地图的缩放，Ctrl+“→”顺时针旋转，Ctrl+“←”逆时针旋转。此属性可被 setStatus/getStatus 方法控制                                                                                                                                                                                                       |
| jogEnable         | boolean                                                                         | true   | 地图是否使用缓动效果，默认值为 true。此属性可被 setStatus/getStatus 方法控制                                                                                                                                                                                                                                                                                              |
| scrollWheel       | boolean                                                                         | true   | 地图是否可通过鼠标滚轮缩放浏览，默认为 true。此属性可被 setStatus/getStatus 方法控制                                                                                                                                                                                                                                                                                      |
| touchZoom         | boolean                                                                         | true   | 地图在移动终端上是否可通过多点触控缩放浏览地图，默认为 true。关闭手势缩放地图，请设置为 false。                                                                                                                                                                                                                                                                           |
| touchZoomCenter   | number                                                                          | -      | 可缺省，当 touchZoomCenter=1 的时候，手机端双指缩放的以地图中心为中心，否则默认以双指中间点为中心                                                                                                                                                                                                                                                                         |
| mapStyle          | string                                                                          | -      | 设置地图的显示样式，目前支持两种地图样式：第一种：自定义地图样式，如"amap://styles/d6bf8c1d69cea9f5c696185ad4ac4c86"，可前往 [地图自定义平台](https://lbs.amap.com/dev/mapstyle/index) 定制自己的个性地图样式；第二种：官方样式模版,如"amap://styles/grey"。其他模版样式及自定义地图的使用说明见 [开发指南](https://lbs.amap.com/api/javascript-api/guide/map/map-style/) |
| features          | Array                                                                           | -      | 设置地图上显示的元素种类支持'bg'（地图背景）、'point'（POI 点）、'road'（道路）、'building'（建筑物）                                                                                                                                                                                                                                                                     |
| showBuildingBlock | boolean                                                                         | -      | 设置地图显示 3D 楼块效果，移动端也可使用。推荐使用                                                                                                                                                                                                                                                                                                                        |
| viewMode          | string                                                                          | 2D     | 默认为‘2D’，可选’3D’，选择‘3D’会显示 3D 地图效果。（自 V1.4.0 开始支持）                                                                                                                                                                                                                                                                                                  |
| pitch             | number                                                                          | 0      | 俯仰角度，默认 0，[0,83]，2D 地图下无效 。（自 V1.4.0 开始支持）                                                                                                                                                                                                                                                                                                          |
| pitchEnable       | boolean                                                                         | -      | 是否允许设置俯仰角度，3D 视图下为 true，2D 视图下无效。（自 V1.4.0 开始支持）自 v1.4.8 开始，当此属性为 false 时，地图以初始属性设置的 pitch 值为倾斜角度，同时 setPitch 和鼠标手势交互操作将不能改变倾斜角度                                                                                                                                                             |
| buildingAnimation | boolean                                                                         | true   | 楼块出现和消失的时候是否显示动画过程，3D 视图有效，PC 端默认 true，手机端默认 false。（自 V1.4.0 开始支持） **请注意：组件没有做移动端适配，使用移动端开发请修改该属性**                                                                                                                                                                                                  |
| skyColor | string | - | 调整天空颜色，配合自定义地图，3D视图有效，如‘#ff0000’。（自V1.4.0开始支持） |
| mask | Array | - | 为 Map 实例指定掩模的路径，各图层将只显示路径范围内图像，3D视图下有效。格式为一个经纬度的一维、二维或三维数组。一维数组时代表一个普通多边形路径，如: <br/><br/>`[[lng1,lat1], [lng2,lat2], [lng3,lat3]]`<br/><br/> 二维数组时代表一个带洞的多边形路径，如:<br/><br/> `[[[lng4,lat4], [lng5,lat5], [lng6,lat6]], [[lng7,lat7], [lng8,lat8], [lng9,lat9]]`<br/><br/>三维数组时代表多个多边形路径，如: <br/><br/>`[[[lng1,lat1], [lng2,lat2], [lng3,lat3]],//一个普通多边形 [//一个带洞多边形 [[lng4,lat4], [lng5,lat5], [lng6,lat6]], [[lng7,lat7], [lng8,lat8], [lng9,lat9]] ]]` <br/><br/>另外，可以通过给指定图层添加rejectMapMask属性使得指定图层不适用掩模，[参考实例](https://lbs.amap.com/api/javascript-api/example/3d/mask) |

## 事件

| 事件 | 参数 | 说明 |
| - | - | - |
| complete | - | 地图图块加载完成后触发事件 |
| click | [MapsEvent](https://lbs.amap.com/api/javascript-api/reference/event#MapsEvent) | 鼠标左键单击事件 |
| mapmove | - | 地图平移时触发事件 |
| hotspotclick | {type,lnglat,name,id} | 鼠标点击热点时触发 |
| hotspotover | {type,lnglat,name,id} | 鼠标滑过热点时触发 |
| hotspotout | {type,lnglat,name,id} | 鼠标移出热点时触发 |
| movestart | - | 地图平移开始时触发 |
| moveend | - | 地图移动结束后触发，包括平移，以及中心点变化的缩放。如地图有拖拽缓动效果，则在缓动结束后触发 |
| zoomchange | - | 地图缩放级别更改后触发 |
| zoomstart | - | 缩放开始时触发 |
| zoomend | - | 缩放停止时触发 |
| mousemove | MapsEvent | 鼠标在地图上移动时触发 |
| mousewheel | MapsEvent | 鼠标滚轮开始缩放地图时触发 |
| mouseover | MapsEvent | 鼠标左键双击鼠标移入地图容器内时触发事件 |
| mouseout | MapsEvent | 鼠标移出地图容器时触发 |
| mouseup | MapsEvent | 鼠标在地图上单击抬起时触发 |
| mousedown | MapsEvent | 鼠标在地图上单击按下时触发 |
| rightclick | MapsEvent | 鼠标右键单击事件 |
| dragstart | - | 开始拖拽地图时触发 |
| dragging | - | 拖拽地图过程中触发 |
| dragend | - | 停止拖拽地图时触发。如地图有拖拽缓动效果，则在拽停止，缓动开始前触发 |
| resize | - | 地图容器大小改变事件 |
| touchstart | MapsEvent | 触摸开始时触发事件，仅适用移动设备 |
| touchmove | MapsEvent | 触摸移动进行中时触发事件，仅适用移动设备 |
| touchend | MapsEvent | 触摸结束时触发事件，仅适用移动设备 |

## 方法
| 方法           | 参数  | 说明                                                         |
| -------------- | ----- | ------------------------------------------------------------ |
| getAMapPromise | -     | 获取 AMap 类，返回一个 Promise 对象，在 reslove 中返回 AMap 类 |
| getAMapInstance | -     | 获取 AMap 类，请在地图组件 complete 之后获取，否则返回值可能是 Null |
| getMapInstance | - 或 mid | 根据 mid 获取当前地图实例，默认会根据组件传入的 mid 属性获取 |

:::tip
关于地图实例的方法，请直接查看高德地图官方  [API](https://lbs.amap.com/api/javascript-api/reference/map)
:::