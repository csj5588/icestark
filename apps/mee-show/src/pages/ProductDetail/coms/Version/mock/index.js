import { getMockDecoratorByEnv } from 'axios-service'

const mockDecorator = getMockDecoratorByEnv(process.env.NODE_ENV === 'development')

export const mockGetDataList = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: 'success',
      data: {
        'versions': [
          {
            'cv': 'ZTT1.0.1_Android',
            'app_platform': 'Android',
            'app_version': '1.0.1',
            'desc': '新增xxx功能',
            'status': '待发布',
            'status_class': 'highlight',
            'download_url': 'https://img.caratsvip.com/and/zhitaotao-1.0.7.apk',
            'create_time': '2020-04-10 12:00:00',
            'publish_time': '2020-04-10 12:00:00',
            'operator': '张三1',
            'button_type': 'publish'
          },
          {
            'cv': 'ZTT1.0.2_Android',
            'app_platform': 'Android',
            'app_version': '1.0.1',
            'desc': '新增xxx功能',
            'status': '待发布',
            'status_class': 'default',
            'download_url': 'https://img.caratsvip.com/and/zhitaotao-1.0.7.apk',
            'create_time': '2020-04-10 12:00:00',
            'publish_time': '2020-04-10 12:00:00',
            'operator': '张三2',
            'button_type': 'disable'
          },
          {
            'cv': 'ZTT1.0.3_Android',
            'app_platform': 'Android',
            'app_version': '1.0.1',
            'desc': '新增xxx功能',
            'status': '待发布',
            'status_class': 'grey',
            'download_url': 'https://img.caratsvip.com/and/zhitaotao-1.0.7.apk',
            'create_time': '2020-04-10 12:00:00',
            'publish_time': '2020-04-10 12:00:00',
            'operator': '张三3',
            'button_type': 'rollback'
          }
        ],
        total: 120
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
