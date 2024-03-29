# Fast AMap

## Fast AMap 对象

| 属性                            | 说明               |
| ------------------------------- | ------------------ |
| [registry](#地图实例注册表)     | 地图实例注册表对象 |
| [mapOptions](#高德地图配置对象) | 高德地图配置对象   |

| 方法            | 参数              | 返回值  | 说明                                                                                                                                                  |
| --------------- | ----------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| install         | -                 | -       | Vue 的插件安装方法                                                                                                                                    |
| mapLoader       | key, version, url | Promise | 高德地图加载方法，传入地图 key 和 version 加载地图，返回一个 Promise 对象，在 resolve 中返回高德地图对象，**注意 url 会覆盖 key 与 version 属性**     |
| mapOptionLoader | -                 | Promise | 对 mapLoader 方法的封装，通过 mapOptions 对象作为参数获取高德地图，调用该方法请先调用 mapOptions.setOptions() 方法，该方法用于在 map 组件中来获取地图 |

## 地图实例注册表

| 方法      | 参数          | 返回值   | 说明                                                                                     |
| --------- | ------------- | -------- | ---------------------------------------------------------------------------------------- |
| setMap    | mid, instance | -        | 将地图实例存入注册表中，mid 是地图实例的 id，类型是 number / string，instance 是地图实例 |
| getMap    | mid           | instance | 通过 mid 获取注册表中存储的地图实例                                                      |
| deleteMap | mid           | -        | 删除注册表中指定 mid 的地图实例                                                          |

## 高德地图配置对象

| 方法       | 参数    | 返回值  | 说明                                                                                                                                                                |
| ---------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| setOptions | options | -       | 设置 FastAMap 中高德地图配置，用于加载高德地图。options 对象包含 key, version。高德地图细节请查看 [准备](https://lbs.amap.com/api/javascript-api/guide/abc/prepare) |
| getOptions | -       | options | 获取高德地图配置对象                                                                                                                                                |
