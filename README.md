# ice-stark-layout

## 使用

- 启动调试服务: `npm start`
- 构建 dist: `npm run build`

## 目录结构

- 应用配置: `src/app.js`
- 路由配置: `src/routes.js`
- 布局文件: `src/layouts`
- 通用组件: `src/components`
- 页面文件: `src/pages`

### 项目结构

<pre style="font-size: 12px">
apps                        <span style="color: #007947">// 应用文件</span>
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
