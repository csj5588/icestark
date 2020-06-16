# ikice-react-template

[![ice](https://img.shields.io/badge/developing%20with-ICE-2077ff.svg)](https://github.com/alibaba/ice)

## 了解飞冰

创建项目和接入项目之前，请先 [了解飞冰](https://ice.work/) 和 [映客接入飞冰规则](https://wiki.inkept.cn/pages/viewpage.action?pageId=41773307)，以保证顺利开发。

## 创建项目

1. 创建项目 git 仓库，使用项目域名作为 project name

2. 使用 ik-cli 初始化项目，如果未安装 ik-cli，请参考 [ik-cli 安装说明](https://code.inke.cn/opd/fe-aws/ik-cli/blob/master/README.md)

```bash
ik-cli init ikice-react-template your-project-git-name

cd your-project-git-name

git remote add origin your-project-git-url

git push -u origin master
```

## 项目开发

1. 修改以下文件

- [package.json](./package.json)
  - [name](./package.json#L2) 项目 git 名称
  - [author](./package.json#L4) 项目主要负责人
  - [description](./package.json#L5) 项目中文名称
- [index.js](./src/config/index.js)
  - [prodRootMap](./src/config/index.js#L13) 分环境接口域名配置，修改 `xxx.inkept.cn` 为项目域名，修改 `root` 为接口域名
  - [SYSTEM_US_NAME](./src/config/index.js#L88) 系统英文简写
  - [SYSTEM_CHINA_NAME](./src/config/index.js#L91) 系统中文名称
  - [AUTH_SYSTEM_ID](./src/config/index.js#L104) 系统标识
- [index.html](./public/index.html)
  - [title](./public/index.html#L9) 系统中文名称

2. 修改后执行

```bash
npm i
git add .
git commit -m "init"
git push
```

3. 下载 [ICEWORKS](https://ice.work/iceworks) 打开项目，详细步骤请浏览 [关于 iceworks](https://ice.work/docs/iceworks/about)

- 正式开发前，请先下载运行 [映客飞冰物料](https://code.inke.cn/opd/fe-aws/ikice-materials/tree/master/react-materials/blocks/AntdFilterTable/src)，熟悉代码逻辑
- 在设置中新增 React 自定义物料，物料地址：[https://testact.inke.cn/ikice-materials/react-materials.json](https://testact.inke.cn/ikice-materials/react-materials.json)，如图所示：
![](https://img.ikstatic.cn/MTU2MTg4NTU5NDM3NCMyMzYjanBn.jpg)
- 在项目中新建页面，如图所示：
![](https://img.ikstatic.cn/MTU2MTg4NTU5Mzg4OSM4NDgjanBn.jpg)
- 选择 React 自定义物料中 基于 ant-design v3.12.1 的表单模板，生成页面，如图所示：
![](https://img.ikstatic.cn/MTU2MTg4NTU5NDcwNiMyNzgjanBn.jpg)

4. 系统管理

- 修改 [menuConfig.js](./src/menuConfig.js) 中 [asideMenuConfig](./src/menuConfig.js#L45)，配置项目菜单
- 修改 [routerConfig.js](./src/routerConfig.js) 中 [routerConfig](./src/routerConfig.js#L57)，配置项目路由
- 在 `系统管理 => 页面与按钮管理` 配置页面与按钮，参照 `系统管理` 的配置项
- 在 `系统管理 => 角色管理` 配置角色，将角色和权限绑定
- 在 `系统管理 => 用户管理` 配置用户，将用户和角色绑定
- 如有疑问，请钉钉联系 [王合亮](dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=whl455916081)

## 构建发布

1. [项目新建发布任务流程](https://wiki.inkept.cn/pages/viewpage.action?pageId=54595949)
2. [项目构建发布流程](https://wiki.inkept.cn/pages/viewpage.action?pageId=67381549)

## 其他

1. [主题色配置](./theme.config.js)
2. [运营后台权限接入](https://wiki.inkept.cn/pages/viewpage.action?pageId=55946806)
3. [React 异步引入组件](https://reactjs.org/docs/code-splitting.html#reactlazy)
4. [常见图表 Api 使用说明](https://wiki.inkept.cn/pages/viewpage.action?pageId=67387957)
