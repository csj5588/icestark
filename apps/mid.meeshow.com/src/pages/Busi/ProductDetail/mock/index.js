import { getMockDecoratorByEnv } from 'axios-service'

const mockDecorator = getMockDecoratorByEnv(process.env.NODE_ENV === 'development')

export const mockGetDataList = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: 'success',
      data: {
        'info': {
          'app_key': 'queen',
          'app_name': '直淘淘',
          'website': 'www.imilive.cn',
          'launch_date': '2020-04-10',
          'contact_person': '老王',
          'desc': '',
          'icon': ''
        },
        'app_status': [
          {
            'platform': 'Android',
            'version': '1.0.5',
            'status': '!最新版未发布',
            'status_class': 'highlight'
          },
          {
            'platform': 'iOS',
            'version': '1.0.5',
            'status': '已发布',
            'status_class': 'default'
          }
        ]
      }
    })
  }
})

export const mockGetDataLog = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: 'success',
      data: {
        'tabs': [
          {
            'key': 'app',
            'name': '产品修改日志'
          },
          {
            'key': 'serviceinfo',
            'name': 'ServiceInfo日志'
          },
          {
            'key': 'dynconfig',
            'name': '动态配置日志'
          }
        ],
        'selected_tab': {
          'tab_key': 'app',
          'log': [
            {
              'op_type': '修改产品名称',
              'org_data': '直播电商',
              'dst_data': '直淘淘'
            },
            {
              'op_type': '发布新版本',
              'org_data': '{"cv":"ZTT1.0.1_Android","url":"https://xxxxxxxxxx/xxxxx-1.0.1.pkg"}',
              'dst_data': '{"cv":"ZTT1.0.2_Android","url":"https://xxxxxxxxxx/xxxxx-1.0.2.pkg"}'
            }
          ],
          'total': 166,
          'has_more': 1
        }
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
