/* eslint-disable */
import { getMockDecoratorByEnv } from 'axios-service'

const mockDecorator = getMockDecoratorByEnv(process.env.NODE_ENV === 'development')

export const mockGetDataList = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
        "dm_error": 0,
        "error_msg": "操作成功",
        "data": {
          "list": [
            {
                "key_info": {
                    "id": 64,
                    "app_key": "lingxi",
                    "key": "ACCOUNT_PHONE_LOGIN3",
                    "create_time": "2020-06-01T14:51:59+08:00",
                    "update_time": "2020-06-01T14:51:59+08:00"
                },
                "uri_info": [
                    {
                        "id": 105,
                        "app_key": "lingxi",
                        "env": "test",
                        "key": "ACCOUNT_PHONE_LOGIN3",
                        "domain_id": 15,
                        "uri": "/api/user/account/phone/login",
                        "switch": 0,
                        "own": "zt",
                        "usages": "[\"zt\",\"bz\"]",
                        "contact_person": "123",
                        "desc": "手机号登录",
                        "create_time": "2020-06-01T14:51:59+08:00",
                        "update_time": "2020-06-01T14:51:59+08:00"
                    }
                ]
            }
        ],
        "config": {
            "usages": [
                {
                    "id": 0,
                    "key": "bz",
                    "name": "对缘"
                },
                {
                    "id": 0,
                    "key": "zt",
                    "name": "中台"
                }
            ],
            "domains": [
                {
                    "id": 15,
                    'env': 'test',
                    "key": "testh5.yingtaorelian.com",
                    "name": "测试环境H5域名(testh5.yingtaorelian.com)"
                },
                {
                    "id": 14,
                    'env': 'online',
                    "key": "h5.yingtaorelian.com",
                    "name": "线上环境H5页面(h5.yingtaorelian.com)"
                }
            ]
        },
        "total_count": 5
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
      error_msg: 'success',
      data: {}
    })
  }
})
