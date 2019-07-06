<h1 align="center">
	Fast AMap
</h1>

<p align="center">
  <a href="http://img.shields.io/travis/txs1992/fast-amap.svg">
    <img src="http://img.shields.io/travis/txs1992/fast-amap.svg" />
  </a>
  <a href="https://img.shields.io/npm/dt/fast-amap.svg">
    <img src="https://img.shields.io/npm/dt/fast-amap.svg" />
  </a>
  <a href="https://img.shields.io/npm/dm/fast-amap.svg">
    <img src="https://img.shields.io/npm/dm/fast-amap.svg" />
  </a>
  <a href="https://img.shields.io/npm/v/fast-amap.svg">
    <img src="https://img.shields.io/npm/v/fast-amap.svg" />
  </a>
  <a href="https://img.shields.io/npm/l/fast-amap.svg">
    <img src="https://img.shields.io/npm/l/fast-amap.svg" />
  </a>
  <a href="https://img.shields.io/node/v/passport.svg">
    <img src="https://img.shields.io/node/v/passport.svg" />
  </a>
</p>

> Fast AMap 是一个基于高德地图封装的一个高性能 Vue 组件库

## 为什么在 Vue 中使用高德 SDK 有明显性能问题？

这个想法来源于之前开发的一个项目，该项目需要在 zoom 16 的级别下渲染 (100 \* 100) 的小方格，使用高德地图的多边形覆盖物 Polygon 进行渲染，在 mac 13 寸屏幕下渲染 `1k+`，在外接 27 寸(不太记得多少寸了)显示屏下需要渲染近 `3K` 的覆盖物。

我尝试使用 vue-amap 这个组件库，在 `1k` 覆盖物的情况下需要渲染 5 秒左右，在 `3k` 覆盖物的渲染下会渲染 30+ 秒，甚至会让浏览器直接崩溃。我选择自己通过 AMap SDK 封装了一个组件，然而性能比 vue-amap 还要差，`1k` 覆盖物需要耗费 10+ 秒，如果我拿这个交给产品，他估计会打死我。

为什么会出现这种情况，事实上，我们在使用 Vue 开发的时候通过 `props` 将数据传递给组件或是 `data`，而 Vue 默认会对这些数据进行 `deepWatch`，而我放在 data 上的 Polygon 实例每次都会被 Vue 绑定，这就是造成性能降低的原因。最后我自己封装了一个 Polygon 的渲染类，`1k+` 覆盖物渲染在 1 秒左右，虽然解决了性能问题，但使用却很不方便，因为在业务中有太多关于渲染处理的代码，无法做到只关心数据问题，需要编写很多配置属性。
