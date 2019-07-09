(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{193:function(t,e,v){"use strict";v.r(e);var _=v(0),a=Object(_.a)({},function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"fast-polygon-多边形覆盖物组件"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#fast-polygon-多边形覆盖物组件","aria-hidden":"true"}},[t._v("#")]),t._v(" fast-polygon 多边形覆盖物组件")]),t._v(" "),v("h2",{attrs:{id:"示例"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#示例","aria-hidden":"true"}},[t._v("#")]),t._v(" 示例")]),t._v(" "),v("h3",{attrs:{id:"简单实例"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#简单实例","aria-hidden":"true"}},[t._v("#")]),t._v(" 简单实例")]),t._v(" "),v("div",{staticClass:"tip custom-block"},[v("p",[t._v("FastAMap 是一个高性能的高德地图组件，下面有个按钮可以渲染 2k 覆盖物，点击按钮体验一下。")])]),t._v(" "),v("iframe",{staticStyle:{width:"100%"},attrs:{height:"565",scrolling:"no",title:"fast-polygon",src:"//codepen.io/taoxusheng/embed/gNBMqY/?height=565&theme-id=dark,result",frameborder:"no",allowtransparency:"true",allowfullscreen:"true"}},[t._v("\n  See the Pen "),v("a",{attrs:{href:"https://codepen.io/taoxusheng/pen/gNBMqY/"}},[t._v("fast-polygon")]),t._v(" by MT\n  ("),v("a",{attrs:{href:"https://codepen.io/taoxusheng"}},[t._v("@taoxusheng")]),t._v(") on "),v("a",{attrs:{href:"https://codepen.io"}},[t._v("CodePen")]),t._v(".\n")]),t._v(" "),v("h3",{attrs:{id:"方法调用"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#方法调用","aria-hidden":"true"}},[t._v("#")]),t._v(" 方法调用")]),t._v(" "),v("div",{staticClass:"tip custom-block"},[v("p",[t._v("使用 FastPolygon 组件提供的一些方法可以应对一些特殊需求，使用这些方法不会导致 vue 重新渲染，请注意过去实例不要被 Vue 绑定导致性能影响。")])]),t._v(" "),v("iframe",{staticStyle:{width:"100%"},attrs:{height:"565",scrolling:"no",title:"fast-polygon  方法调用示例",src:"//codepen.io/taoxusheng/embed/oraEXb/?height=565&theme-id=dark,result",frameborder:"no",allowtransparency:"true",allowfullscreen:"true"}},[t._v("\n  See the Pen "),v("a",{attrs:{href:"https://codepen.io/taoxusheng/pen/oraEXb/"}},[t._v("fast-polygon  方法调用示例")]),t._v(" by MT\n  ("),v("a",{attrs:{href:"https://codepen.io/taoxusheng"}},[t._v("@taoxusheng")]),t._v(") on "),v("a",{attrs:{href:"https://codepen.io"}},[t._v("CodePen")]),t._v(".\n")]),t._v(" "),v("h2",{attrs:{id:"属性"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#属性","aria-hidden":"true"}},[t._v("#")]),t._v(" 属性")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("属性")]),t._v(" "),v("th",[t._v("类型")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("默认值")]),t._v(" "),v("th",[t._v("说明")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[v("strong",[t._v("options")])]),t._v(" "),v("td",[t._v("Array")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("这里是对 polygon 的扩展，该数组中存放 polygon options 对象，当前对象的属性会覆盖通过 prop 传递的属性。建议将 ptah 数组与自定义数据放在该数组中。")])]),t._v(" "),v("tr",[v("td",[v("strong",[t._v("mid")])]),t._v(" "),v("td",[t._v("number / string")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("地图实例的唯一 id，polygon 组件通过 mid 获取对应的地图实例，然后将覆盖物渲染在对应的地图实例中。")])]),t._v(" "),v("tr",[v("td",[t._v("beforeCreatePolygon")]),t._v(" "),v("td",[t._v("Function")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("如果传递了该函数，将在渲染 Polygon 之前调用函数，参数是传入的 options 以及相关 prop 属性的合并对象")])]),t._v(" "),v("tr",[v("td",[t._v("zIndex")]),t._v(" "),v("td",[t._v("number")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("10")]),t._v(" "),v("td",[t._v("多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示默认 zIndex：10")])]),t._v(" "),v("tr",[v("td",[t._v("path")]),t._v(" "),v("td",[t._v("Array")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("多边形轮廓线的节点坐标数组，当为“环”多边形时（多边形区域在多边形内显示为“岛”），path 为二维数组，数组元素为多边形轮廓线的节点坐标数组 “环”多边形时，要求数组第一个元素为外多边形，其余为“岛”多边形，外多边形需包含“岛”多边形，否则程序不作处理")])]),t._v(" "),v("tr",[v("td",[t._v("bubble")]),t._v(" "),v("td",[t._v("boolean")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("false")]),t._v(" "),v("td",[t._v("是否将覆盖物的鼠标或 touch 等事件冒泡到地图上，默认值：false")])]),t._v(" "),v("tr",[v("td",[t._v("cursor")]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("指定鼠标悬停时的鼠标样式，自定义 cursor，IE 仅支持 cur/ani/ico 格式，Opera 不支持自定义 cursor")])]),t._v(" "),v("tr",[v("td",[t._v("strokeColor")]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("#006600")]),t._v(" "),v("td",[t._v("线条颜色，使用 16 进制颜色代码赋值")])]),t._v(" "),v("tr",[v("td",[t._v("strokeOpacity")]),t._v(" "),v("td",[t._v("number")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("0.9")]),t._v(" "),v("td",[t._v("轮廓线透明度，取值范围[0,1]，0 表示完全透明，1 表示不透明")])]),t._v(" "),v("tr",[v("td",[t._v("strokeWeight")]),t._v(" "),v("td",[t._v("number")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("轮廓线宽度")])]),t._v(" "),v("tr",[v("td",[t._v("fillColor")]),t._v(" "),v("td",[t._v("string")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("多边形填充颜色，使用 16 进制颜色代码赋值，如：#FFAA00")])]),t._v(" "),v("tr",[v("td",[t._v("fillOpacity")]),t._v(" "),v("td",[t._v("number")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("0.9")]),t._v(" "),v("td",[t._v("多边形填充透明度，取值范围[0,1]，0 表示完全透明，1 表示不透明")])]),t._v(" "),v("tr",[v("td",[t._v("draggable")]),t._v(" "),v("td",[t._v("boolean")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("false")]),t._v(" "),v("td",[t._v("设置多边形是否可拖拽移动，默认为 false")])]),t._v(" "),v("tr",[v("td",[t._v("extData")]),t._v(" "),v("td",[t._v("Any")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("用户自定义属性，支持 JavaScript API 任意数据类型，如 Polygon 的 id 等")])]),t._v(" "),v("tr",[v("td",[t._v("strokeStyle")]),t._v(" "),v("td",[t._v("number")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("轮廓线样式，实线:solid，虚线:dashed")])]),t._v(" "),v("tr",[v("td",[t._v("strokeDasharray")]),t._v(" "),v("td",[t._v("Array")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("[]")]),t._v(" "),v("td",[t._v("勾勒形状轮廓的虚线和间隙的样式，此属性在 strokeStyle 为 dashed 时有效， 此属性在 ie9+浏览器有效 取值： "),v("br"),t._v("实线：[0,0,0] "),v("br"),t._v("虚线：[10,10] ，[10,10] 表示 10 个像素的实线和 10 个像素的空白（如此反复）组成的虚线"),v("br"),t._v("点画线：[10,2,10]， [10,2,10] 表示 10 个像素的实线和 2 个像素的空白 + 10 个像素的实线和 10 个像素的空白 （如此反复）组成的虚线")])])])]),t._v(" "),v("h1",{attrs:{id:"事件"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#事件","aria-hidden":"true"}},[t._v("#")]),t._v(" 事件")]),t._v(" "),v("div",{staticClass:"tip custom-block"},[v("p",[t._v("Polygon 组件的事件对象中可以获取 options 中的自定义属性数据，通过 event.target.dataOptions 获取。")])]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("事件")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("参数")]),t._v(" "),v("th",[t._v("说明")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("click")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[v("a",{attrs:{href:"https://lbs.amap.com/api/javascript-api/reference/event#MapsEvent",target:"_blank",rel:"noopener noreferrer"}},[t._v("MapsEvent"),v("OutboundLink")],1)]),t._v(" "),v("td",[t._v("鼠标左键单击事件")])]),t._v(" "),v("tr",[v("td",[t._v("click")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("MapsEvent")]),t._v(" "),v("td",[t._v("鼠标左键单击事件")])]),t._v(" "),v("tr",[v("td",[t._v("dblclick")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("MapsEvent")]),t._v(" "),v("td",[t._v("鼠标左键双击事件")])]),t._v(" "),v("tr",[v("td",[t._v("rightclick")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("MapsEvent")]),t._v(" "),v("td",[t._v("右键单击")])]),t._v(" "),v("tr",[v("td",[t._v("hide")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("{type, target}")]),t._v(" "),v("td",[t._v("隐藏")])]),t._v(" "),v("tr",[v("td",[t._v("show")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("{type, target}")]),t._v(" "),v("td",[t._v("显示")])]),t._v(" "),v("tr",[v("td",[t._v("mousedown")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("MapsEvent")]),t._v(" "),v("td",[t._v("鼠标按下")])]),t._v(" "),v("tr",[v("td",[t._v("mouseup")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("MapsEvent")]),t._v(" "),v("td",[t._v("鼠标抬起")])]),t._v(" "),v("tr",[v("td",[t._v("mouseover")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("MapsEvent")]),t._v(" "),v("td",[t._v("鼠标经过")])]),t._v(" "),v("tr",[v("td",[t._v("mouseout")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("MapsEvent")]),t._v(" "),v("td",[t._v("鼠标移出")])]),t._v(" "),v("tr",[v("td",[t._v("change")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("属性发生变化时")])]),t._v(" "),v("tr",[v("td",[t._v("touchstart")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("MapsEvent")]),t._v(" "),v("td",[t._v("触摸开始时触发事件，仅适用移动设备")])]),t._v(" "),v("tr",[v("td",[t._v("touchmove")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("MapsEvent")]),t._v(" "),v("td",[t._v("触摸移动进行中时触发事件，仅适用移动设备")])]),t._v(" "),v("tr",[v("td",[t._v("touchend")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("MapsEvent")]),t._v(" "),v("td",[t._v("触摸结束时触发事件，仅适用移动设备")])])])]),t._v(" "),v("h2",{attrs:{id:"方法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#方法","aria-hidden":"true"}},[t._v("#")]),t._v(" 方法")]),t._v(" "),v("div",{staticClass:"tip custom-block"},[v("p",[t._v("通过 "),v("code",[t._v("$refs")]),t._v(" 获取组件实例来调用。例如："),v("code",[t._v("this.$refs.myPolygon.getAllPolygons()")]),t._v("，关于 Polygon 类的实例方法，请查看官方文档 "),v("a",{attrs:{href:"https://lbs.amap.com/api/javascript-api/reference/overlay#polygon",target:"_blank",rel:"noopener noreferrer"}},[t._v("Polygon"),v("OutboundLink")],1)])]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("方法")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("参数")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("返回值")]),t._v(" "),v("th",[t._v("说明")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("getAMapPromise")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("Promise")]),t._v(" "),v("td",[t._v("获取 AMap 类，返回一个 Promise 对象，在 reslove 中返回 AMap 类")])]),t._v(" "),v("tr",[v("td",[t._v("getAMapInstance")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("AMap")]),t._v(" "),v("td",[t._v("获取 AMap 类，请在地图组件 complete 之后获取，否则返回值可能是 Null")])]),t._v(" "),v("tr",[v("td",[t._v("getMapInstance")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("- 或 mid")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("map")]),t._v(" "),v("td",[t._v("根据 mid 获取当前地图实例，默认会根据组件传入的 mid 属性获取")])]),t._v(" "),v("tr",[v("td",[t._v("hideAll")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("隐藏当前组件所有的 polygon 实例")])]),t._v(" "),v("tr",[v("td",[t._v("showAll")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("显示当前组件所有的 polygon 实例")])]),t._v(" "),v("tr",[v("td",[t._v("clearAll")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("清空当前组件所有的 polygon 实例")])]),t._v(" "),v("tr",[v("td",[t._v("removePolygons")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("Array")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("删除传入的 polygon 实例，该方法不会导致 vue 重新渲染")])]),t._v(" "),v("tr",[v("td",[t._v("getAllPolygons")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("Array")]),t._v(" "),v("td",[t._v("获取当前组件所有的 polygon 实例")])]),t._v(" "),v("tr",[v("td",[t._v("getPolygonByProp")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("propName, propValue")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("根据传入的属性名称与值查找对应的 polygon 实例")])]),t._v(" "),v("tr",[v("td",[t._v("getPolygonByProps")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("propName, propValues")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("根据传入的属性名称与值的数组查找对应的 polygon 实例数组，该方法对遍历做了优化，建议使用该方法获取 polygon 数组")])]),t._v(" "),v("tr",[v("td",[t._v("addPolygons")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("options, beforeCreatePolygon")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),t._v(" "),v("td",[t._v("options 是一个 polygon 属性的数组，没有的属性会通过组件传递的属性获取。beforeCreatePolygon 是一个可选的回调函数，默认可以不传递，可在创建 polygon 之前调用，将 polygon 属性传入其中，可以通过该方法处理自定义渲染。新增的 polygon 数组会添加在组件中，此时 getAllPolygons 方法获取的数组中包含新增 polygon，该方法不会导致 vue 重新渲染")])])])])])},[],!1,null,null,null);e.default=a.exports}}]);