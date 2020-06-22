# ikice-stark

[![ice](https://img.shields.io/badge/developing%20with-ICE-2077ff.svg)](https://github.com/alibaba/ice)

## 了解飞冰

创建项目和接入项目之前，请先 [了解飞冰](https://ice.work/) 和 [映客接入飞冰规则](https://wiki.inkept.cn/pages/viewpage.action?pageId=41773307)，以保证顺利开发。

## 如何使用项目？

- 安装依赖: `npm run i-all`
- 全局启动: `npm run start`
- 独立启动应用模板: `npm run start-react`

## 如何接入应用

1. **apps**目录已置放两个vue / react 应用模板，根据业务需求，复制一份新应用出来进行接入。

2. [src/app.tsx](./src/app.tsx)中 **getApps**方法中注册新应用入口。

3. [package.json](./package.json)添加start-xxx命令，并添加到scripts -> start命令中。

```
"start": "concurrently \"npm run start-react\" \"npm run start-vue\" \"npm run start-tark\" ",
```

4. [src/layouts/BaseicLayout/menuConfig.ts](./src/layouts/BaseicLayout/menuConfig.ts) 配置一级菜单入口。

## 目录结构

<pre style="font-size: 12px">
apps                        <span style="color: #007947">// 应用文件</span>
  |-- react-icestark-child-16   <span style="color: #007947">// react16应用接入模版</span>
  |-- vue-icestark-child        <span style="color: #007947">// vue应用接入模版</span>
build                       <span style="color: #007947">// 包文件</span>
public                      <span style="color: #007947">// 公共文件</span>
scripts                     <span style="color: #007947">// 脚本文件夹</span>
src
  |-- commonPage            <span style="color: #007947">// 公共页面</span>
  |-- components            <span style="color: #007947">// stark公共组件</span>
  |-- config                <span style="color: #007947">// stark配置目录</span>
  |-- entry                 <span style="color: #007947">// stark配置目录</span>
    |-- apis                <span style="color: #007947">// 用户登陆和获取权限相关接口</span>
    |-- index               <span style="color: #007947">// 入口初始化</span>
    |-- service-auth        <span style="color: #007947">// 权限接口拦截器</span>
    |-- service-intercept   <span style="color: #007947">// 业务拦截器</span>
    |-- ticket-replace      
    |-- user-init           <span style="color: #007947">// 用户信息获取</span>
  |-- layouts               <span style="color: #007947">// stark配置目录</span>
    |-- BasicLayout         <span style="color: #007947">// 原始布局</span>
    |-- FrameworkLayout     <span style="color: #007947">// 嵌入布局</span>
  |-- pages                 <span style="color: #007947">// 业务</span>
  |-- stark                 <span style="color: #007947">// stark数据上行管理</span>
  |-- store                 <span style="color: #007947">// stark状态管理</span>
  |-- utils                 <span style="color: #007947">// stark工具</span>
  |-- app.tsx               <span style="color: #007947">// stark入口文件</span>
  |-- global.scss           <span style="color: #007947">// 全局初始化样式</span>
  |-- routes.ts             <span style="color: #007947">// stark路由</span>
  |-- typings.d.ts
.editorconfig               <span style="color: #007947">// IDE配置文件</span>
.eslintignore               <span style="color: #007947">// js规则配置屏蔽文件</span>
.eslintrc                   <span style="color: #007947">// js规则配置</span>
.gitignore                  <span style="color: #007947">// git提交屏蔽文件</span>
.prettierignore             <span style="color: #007947">// 代码格式化配置屏蔽文件</span>
.prettierrc.js              <span style="color: #007947">// 代码格式化配置文件</span>
.stylelintignore            <span style="color: #007947">// 样式规则配置屏蔽文件</span>
.stylelintrc.js             <span style="color: #007947">// 样式规则配置</span>
build.json                  <span style="color: #007947">// ice-stark 配置文件 / api代理</span>
package-lock.json           
package.json              
README.md                   <span style="color: #007947">// 项目说明书</span>
screenshot.png              <span style="color: #007947">// 项目快捷截图</span>
tsconfig.json               <span style="color: #007947">// typescript 根目录/编译选项</span>
</pre>

## 效果图

![screenshot](https://img.alicdn.com/tfs/TB14igtaVT7gK0jSZFpXXaTkpXa-2878-1368.png)
