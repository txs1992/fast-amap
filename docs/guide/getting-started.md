# 快速上手

## npm 包引入

```js
yarn add fast-amap -S # 或者：npm install -S fast-amap
```

## CDN 引入

可以通过 [unpkg.com/fast-amap](https://unpkg.com/fast-amap) 获取最新版本资源。

```html
<script src="https://unpkg.com/fast-amap@0.1.0/lib/fast-amap.mini.js"></script>
```

## 示例

下面是一个使用 CDN 引入 FastAMap 的简单示例，你可以通过点击下面的 `EDIT ON Codepen` 去 Codepen 网站修改示例，以体验更多配置。

<iframe height="465" style="width: 100%;" scrolling="no" title="FastAMap 示例" src="//codepen.io/taoxusheng/embed/agRbrj/?height=465&theme-id=dark,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/taoxusheng/pen/agRbrj/'>FastAMap 示例</a> by MT
  (<a href='https://codepen.io/taoxusheng'>@taoxusheng</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

::: tip
如果上面的示例无法查看，可以通过复制下面的的代码，然后用浏览器打开。
:::

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Fast AMap</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <div id="app">
      <fast-map
        ref="map"
        :mid="12"
        :zoom="15"
        :double-click-zoom="false"
        @complete="handleComplete"
      >
        <h1>{{ msg }}</h1>
      </fast-map>
    </div>
  </body>
  <!-- 先引入 Vue -->
  <script src="https://unpkg.com/vue@2.6.10/dist/vue.js"></script>
  <!-- 引入组件库 -->
  <script src="https://unpkg.com/fast-amap@0.2.1/lib/fast-amap.mini.js"></script>
  <script>
    // 设置高德地图版本
    FastAMap.mapOptions.setOptions({
      key: 'd2d76e2274bf5973ecfb1f68454b6f3b',
      version: '1.4.15'
    })

    Vue.use(FastAMap)

    new Vue({
      el: '#app',
      data: function() {
        return {
          msg: 'Hello Fast AMap'
        }
      }
    }).$mount('#app')
  </script>
</html>
```
