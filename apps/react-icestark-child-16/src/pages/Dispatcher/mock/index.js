/* eslint-disable */
import { getMockDecoratorByEnv } from 'axios-service'

const mockDecorator = getMockDecoratorByEnv(process.env.NODE_ENV === 'development')

export const mockGetDataList = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
        "dm_error": 0,
        "error_msg": "操作成功",
        "data": {
          "total_count": 4,
          "evs": [
              {
                  "id": 46,
                  "uid": "1341",
                  "app_key": "lingxi",
                  "ev_name": "c.liyue_test3",
                  "ev_type": "persistent_connection",
                  "ev_desc": "测试事件说明1",
                  "create_time": "2020-05-25T17:50:58+08:00",
                  "update_time": "2020-05-25T17:50:58+08:00"
              },
              {
                "id": 47,
                "uid": "1341",
                "app_key": "lingxi",
                "ev_name": "c.liyue_test4",
                "ev_type": "persistent_connection",
                "ev_desc": "测试事件说明2",
                "create_time": "2020-05-25T17:50:58+08:00",
                "update_time": "2020-05-25T17:50:58+08:00"
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
      data: {
        id: '100'
      }
    })
  }
})

export const mockDelete = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: 'success qa开启成功',
      data: {}
    })
  }
})

export const mockGetConfig = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: 'success',
      data: [
        {
            "key":"checkSession",
            "show":"session校验"
        },
        {
            "key":"userBlackCheck",
            "show":"黑名单用户校验"
        },
        {
            "key":"certitifyCheck",
            "show":"活体校验"
        }
    ]
    })
  }
})
