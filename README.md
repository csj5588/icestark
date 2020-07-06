# ikice-stark

[![ice](https://img.shields.io/badge/developing%20with-ICE-2077ff.svg)](https://github.com/alibaba/ice)

## 了解飞冰

创建项目和接入项目之前，请先

- [了解飞冰](https://ice.work/)
- [映客接入飞冰规则](https://wiki.inkept.cn/pages/viewpage.action?pageId=41773307)
- [映客飞冰物料](https://code.inke.cn/opd/fe-aws/ikice-materials/tree/master/react-materials/blocks/AntdFilterTable/src)
- [@ice/stark](https://ice.work/docs/icestark/reference/api)

以保证顺利开发。

## 架构导图

![screenshot](https://img.ikstatic.cn/MTU5MjgxMDEwMjU0NyM1NDQjanBn.jpg)

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

## 业务模块如何接入

如需要编写**新**的业务模块，请先下载运行 [映客飞冰物料](https://code.inke.cn/opd/fe-aws/ikice-materials/tree/master/react-materials/blocks/AntdFilterTable/src)，熟悉代码逻辑，其中包含**vue**、react业务物料进行选择。

如需要迁移**老**的业务木块进入，可将原业务文件夹复制至应用pages目录下, 按照以下步骤修改。

1. [./build.json](./build.json) 配置代理
2. 配至应用内部路由,
    - react[./apps/react-icestark-child-16/src/router.jsx](./apps/react-icestark-child-16/src/router.jsx) 
    - vue[./apps/vue-icestark-child/src/router/routes/index.js](./apps/vue-icestark-child/src/router/routes/index.js)
3. 配置状态管理
    - react [./apps/react-icestark-child-16/src/store/reducer.js](./apps/react-icestark-child-16/src/store/reducer.js)
    - vue[./apps/vue-icestark-child/src/store/index.js](./apps/vue-icestark-child/src/store/index.js)

将公共方法和公共组件提取至[inke-design](http://ide.hnmlw.cn/docs/react/introduce)中进行复用。

具体接入方法请参照[introduce](http://ide.hnmlw.cn/docs/react/introduce)

## 如何传递状态

**stark**为微前端架构中的状态管理，采用**redux**与@**ice/stark-data**相护同步方案，不推荐直接使用@**ice/stark-data**接口

如果**react**子应用想订阅微前端**stark**状态，与订阅自身**stores**方法一致，因为已经合并到了自身状态管理中。调用方法如下：

```javascript
import { connect } from 'react-redux';

class ReactAppsComponents extends React.Component {
  render{ ... }
}

export default connect(stores => ({
  stark: stores.stark,
}))(ReactAppsComponents)

```

保留了与以前**redux**架构相同的开发者习惯。一样通过**connect**注入的方式。

如果是**react**子应用想改变微前端状态**stark**状态，可通过调用**action-stark**中的**syncStarkUp**方法。

```javascript
import { syncStarkUp } from '@/store/action-stark';

dispatch(syncStarkUp('acitonForStark', payload));

```

**acitonForStark**是你需要触发的**stark**中的**aciton**操作，**payload**为对应的值。

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


## 注意事项

- 架构如有修改，请维护README.md 让架构更加优秀。
- 接入过程中如有问题，请钉钉联系 [崔世杰](dingtalk://dingtalkclient/action/sendmsg)

## 辅助参考

1. [运营后台权限接入](https://wiki.inkept.cn/pages/viewpage.action?pageId=55946806)
2. [React 异步引入组件](https://reactjs.org/docs/code-splitting.html#reactlazy)
3. [常见图表 Api 使用说明](https://wiki.inkept.cn/pages/viewpage.action?pageId=67387957)
4. [inke-design武库](http://ide.hnmlw.cn/)
5. [question&answer文档库](http://qa.hnmlw.cn/#/index?_k=96u2dp)

## redux物料使用
1. [@inke-design/compile](https://wiki.inkept.cn/pages/viewpage.action?pageId=106883602)
2. npm install @inke-design/compile -g
3. 在业务目录比如（pages）下运行 `inke-design materials <fileName>` 即可将物料拉取;


## 效果图

![screenshot](https://img.ikstatic.cn/MTU5MjgwOTEyMzg2MSM1MDUjanBn.jpg)


## 常见问题

1. 为什么启动项目显示很多sockjs-node/info status 500 报错？

答： 项目热更新跨域问题，正在想办法解决，不会影响开发。

2. 我业务拷贝进来之后，为什么请求失效了？

答： 请检查一下有没有在stark根目录build.json中配置全局代理。

2. 业务接口代理名称重复了怎么办？

答： 匹配规则请延长一些，尽量区分不一样的业务，以后会上动态代理模块。
