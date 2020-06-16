
*2019-10-18*

- 增加自动化部署脚本
  - 支持自动部署到测试、灰度环境
  - 部署线上环境时，支持自动打开 merge request 页面
  - 提供了获取分支名，获取仓库名，远端仓库地址等方法
- 更新 README ，原内容迁移到 PROJECT_DESC 中
- 增加通用配置文件 [`ik.config.js`](ik.config.js)
  - `onlineDeployUrl` - 线上环境发布地址

*2019-08-15*

- 修复无权限上报埋点问题
- antd 替代 ik-antd，支持主题色配置
- UglifyjsWebpackPlugin 更换为 TerserWebpackPlugin
