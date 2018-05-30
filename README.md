# AllSmart web-end #

**项目目前使用Vue 2.4.2, element-ui@1.4.x版本，**


## 开发
```bash
    # 安装依赖
    npm install
    
    //如果npm下载速度过慢，可以通过如下操作解决npm速度慢的问题
    npm install --registry=https://registry.npm.taobao.org
    
    # 本地开发 开启服务
    npm run dev
```
浏览器访问 http://localhost:9528

## 发布
```bash
    # 构建生成环境
    npm run build
    
    生成的文件需放在web服务器运行，本地直接打开html文件无效
```

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filters                // 全局filter
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```
## 开发环境搭建
```bash
    Intellij IDEA推荐安装vue插件、ESLint插件，将JavaScript语言设置为ES6
```

## Changelog
2.0.0 初次提交
