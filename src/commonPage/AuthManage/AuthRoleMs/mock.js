import { getMockDecoratorByEnv } from 'axios-service'

const mockDecorator = getMockDecoratorByEnv(process.env.NODE_ENV === 'development')

export const mockGetRoleList = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: 'success',
      data: {
        'users': [
          {
            'id': '15',
            'system_id': '1',
            'name': '翟岳菲',
            'email': 'zhaiyf@inke.cn',
            'phone': '',
            'department': '技术平台中心-质量保证部',
            'description': '',
            'status': '1',
            'operator': '杨文',
            'utime': '2019-03-26 15:16:52',
            'ctime': '2019-03-25 16:11:17',
            'last_login_time': '2019-03-26 15:16:52',
            'role_name': '映客产品管理员',
            'role_type_id': '1',
            'role_type_name': '系统管理类',
            'role_id': '2',
            'status_show': '启用',
            'system_name': '用户画像系统'
          },
          {
            'id': '10',
            'system_id': '1',
            'name': '王飒',
            'email': 'wangs1@inke.cn',
            'phone': '',
            'department': '映客研发部-运营研发部-前端组',
            'description': '',
            'status': '1',
            'operator': '杨文',
            'utime': '2019-03-29 22:02:23',
            'ctime': '2019-03-20 16:28:36',
            'last_login_time': '2019-03-20 16:28:57',
            'role_name': null,
            'role_type_id': null,
            'role_type_name': null,
            'role_id': null,
            'status_show': '启用',
            'system_name': '用户画像系统'
          },
          {
            'id': '9',
            'system_id': '1',
            'name': '张召勇',
            'email': 'zhangzhaoyong@inke.cn',
            'phone': '',
            'department': '映客研发部-运营研发部-前端组',
            'description': '',
            'status': '1',
            'operator': 'sso login',
            'utime': '2019-03-20 16:28:28',
            'ctime': '2019-03-20 16:28:28',
            'last_login_time': '2019-03-20 16:28:28',
            'role_name': null,
            'role_type_id': null,
            'role_type_name': null,
            'role_id': null,
            'status_show': '启用',
            'system_name': '用户画像系统'
          },
          {
            'id': '8',
            'system_id': '1',
            'name': '王合亮',
            'email': 'wanghl@inke.cn',
            'phone': '',
            'department': '映客研发部-运营研发部-前端组',
            'description': '',
            'status': '1',
            'operator': '王合亮',
            'utime': '2019-04-16 22:16:26',
            'ctime': '2019-03-20 16:20:59',
            'last_login_time': '2019-04-16 22:16:26',
            'role_name': '超级管理员,映客产品管理员',
            'role_type_id': '1,1',
            'role_type_name': '系统管理类,系统管理类',
            'role_id': '1,2',
            'status_show': '启用',
            'system_name': '用户画像系统'
          }
        ],
        'total': '4'
      }
    })
  }
})

export const mockPostRoleModify = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: 'success',
      data: {}
    })
  }
})

export const mockPostDataDel = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: 'success',
      data: {}
    })
  }
})
