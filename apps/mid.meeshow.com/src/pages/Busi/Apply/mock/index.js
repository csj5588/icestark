/* eslint-disable */

import { getMockDecoratorByEnv } from 'axios-service'

const mockDecorator = getMockDecoratorByEnv(process.env.NODE_ENV === 'development')

export const mockGetDataList = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      "dm_error": 0,
      "error_msg": "操作成功",
      "data": {
          "applications": [
              {
                  "id": "131541243",
                  "user_id": "123456",
                  "email": "xiaoming@inke.cn",
                  "name": "小明",
                  "department": "中台研发部",
                  "content": "配置ServiceInfo",
                  "app_key": "eos",
                  "app_name": "直淘淘"
              }
          ]
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

export const mockDelete = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: '操作成功',
      data: {}
    })
  }
})
