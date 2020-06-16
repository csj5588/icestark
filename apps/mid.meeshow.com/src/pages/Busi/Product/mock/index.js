/* eslint-disable */
import { getMockDecoratorByEnv } from 'axios-service'

const mockDecorator = getMockDecoratorByEnv(process.env.NODE_ENV === 'development')

export const mockGetDataList = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      "dm_error": 0,
      "error_msg": "操作成功",
      "data": {
          "apps": [
              {
                  "key": "queen",
                  "name": "不就",
                  "item": {
                      "title": "好看交友（haokan）",
                      "desc": "那是一种内在的东西， 他们到达不了，也无法触及",
                      "label": "对接人\n老王",
                      "version": "1.0.5",
                      "tips": "（!未发布）",
                      "website": "www.imilive.cn",
                      "env": [
                          {
                              "key": "dev",
                              "name": "联调环境",
                              "enabled": 1
                          },
                          {
                              "key": "qa",
                              "name": "QA环境",
                              "enabled": 0
                          }
                      ]
                  }
              },
              {
                  "key": "haokan",
                  "name": "好看交友",
                  "item": {
                      "title": "好看交友（haokan）",
                      "desc": "那是一种内在的东西， 他们到达不了，也无法触及",
                      "label": "对接人\n老王",
                      "version": "1.0.5",
                      "tips": "（!未发布）",
                      "website": "www.imilive.cn",
                      "env": [
                          {
                              "key": "dev",
                              "name": "联调环境",
                              "enabled": 1
                          },
                          {
                              "key": "qa",
                              "name": "QA环境",
                              "enabled": 0
                          }
                      ]
                  }
              }
          ],
          "selected_app_key": "queen",
          "cursor": "1_231_32",
          "has_more": 1
      }
  })
  }
})

export const mockAdd = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: 'success',
      data: {}
    })
  }
})

export const mockDetail = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      "dm_error": 0,
      "error_msg": "操作成功",
      "data": {
          "info": {
              "app_key": "queen",
              "app_name": "直淘淘",
              "website": "www.imilive.cn",
              "launch_date": "2020-04-10",
              "contact_person": "老王",
              "desc": "简介",
              "icon": "http://img.ikstatic.cn/MTU4NzcxNzc5NTU1MiMzODkjanBn.jpg"
          },
          "app_status": [
              {
                  "platform": "Android",
                  "version": "1.0.5",
                  "status": "!最新版未发布",
                  "status_class": "highlight"
              },
              {
                  "platform": "iOS",
                  "version": "1.0.5",
                  "status": "已发布",
                  "status_class": "default"
              }
          ]
      }
  })
  }
})
