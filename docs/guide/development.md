# 参与 Fast AMap 项目开发

:::tip
参与 FastAMap 项目开发，请以 pr 的方式提交你的功能分支。
:::

## 运行项目

```shell
1. 先 fork 项目再 clone 项目到本地
git clone git@github.com:<your github>/fast-amap.git

2. 进入 fast-amap 项目目录
cd fast-amap

3. 安装项目目录，建议使用 yarn 安装
yarn install # 或者 npm install

4. 运行 fast-amap 项目
yarn dev

5. 打包 fast-amap 项目
yarn package
```

## 项目结构

```shell
fast-amap
 ├── build                    # rollup 打包配置存放目录
 ├── docs                     # vuePress 文档存放目录
 ├── lib                      # 打包后的文件目录
 ├── packages                 # FastAMap 组件根目录
 |    ├── components          # 组件存放目录
 |    ├── mixins              # 公共 mixin
 |    ├── utils               # 工具库，例如地图注册表，AMap 加载器，AMap 配置对象
 |    └── index.js            # FastAMap 打包入口文件
 |
 ├── public                   # 静态公共目录，存放了 favicon.ico
 ├── src                      # 本地开发页面存放目录，用于开发调试 FastAMap 组件。
 ├── .balbelrc
 ├── .eslintrc.js
 ├── .gitignore
 ├── .prettierrc.yaml
 ├── .tracis.yml
 ├── index.html
 ├── LICENSE
 ├── package.json
 ├── README.md
 ├── webpack.config.json
 └── yarn.lock
```
