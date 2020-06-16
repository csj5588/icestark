# 注意
提测／上线前注意，请先拷贝dist下config文件夹，打包后再拷贝回去，这是种子视频迁移过来的【动态配置】功能，
线上需要发布两次

#### 相关地址

- 测试：http://testzt.meeshow.com/#/index
- 线上腾讯：https://zt.meeshow.com/#/index
- 线上百度：https://manageapp.meelove.cn/#/index

#### 发布任务

- 测试：https://deploy.inkept.cn/templates/deploy.html?job_name=cop.inke_owt.nvwa_pdl.web_servicegroup.web_service.manageapp_job.manageapp-test_cluster.ali-test
- 线上腾讯：https://deploy.inkept.cn/templates/deploy.html?job_name=cop.inke_owt.nvwa_pdl.web_servicegroup.web_service.manageapp_job.manageapp-online_cluster.tx-bj
- 线上百度：https://deploy.inkept.cn/templates/deploy.html?job_name=cop.inke_owt.nvwa_pdl.web_servicegroup.web_service.manageapp_job.manageapp-online_cluster.bd-bj

# 直播中台运营后台
> 基于映客的 [ikice-react-template](https://code.inke.cn/opd/fe-aws/ikice-react-template/tree/master) 开发

## 项目依赖

全局安装飞冰软件 [下载](https://ice.work/)

## 了解飞冰

创建项目和接入项目之前，请先 [了解飞冰](https://ice.work/) 和 [映客接入飞冰规则](https://wiki.inkept.cn/pages/viewpage.action?pageId=41773307)，以保证顺利开发。

### 项目启动
```sh
npm run start
```

### 发布测试
```sh
npm run deploy
# 然后选择 test 或者 gray
```

### 发布上线
```sh
npm run deploy
# 然后选择 master
```
deploy 脚本执行完后，会打开 new merge request 页面；等代码 merge 通过后，再去发布系统发布。
