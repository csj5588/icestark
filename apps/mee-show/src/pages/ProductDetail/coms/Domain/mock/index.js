import { getMockDecoratorByEnv } from 'axios-service'
import faker from 'faker/locale/zh_CN';
const mockDecorator = getMockDecoratorByEnv(process.env.NODE_ENV === 'development')

function getNewList(params) {
  return Array.from({ length: params.page_size }).map(_ => ({
    id: faker.random.number(10000), // 自增id
    app: faker.random.word().slice(0, 4), // app标识
    app_name: faker.internet.userName(), // 中文名称
    desc: faker.random.words(), // 接入描述
    start_time: faker.date.past().format('yyyy-MM-dd hh:mm:ss'), // 生效期
    end_time: faker.date.future().format('yyyy-MM-dd hh:mm:ss'), //
    creator: faker.fake('{{name.firstName}}{{name.lastName}}'), // 创建人
    create_time: faker.date.past().format('yyyy-MM-dd hh:mm:ss'), // 创建时间
    check_user: faker.fake('{{name.firstName}}{{name.lastName}}'), // 审核人
    check_time: faker.date.past().format('yyyy-MM-dd hh:mm:ss'), // 审批时间
    check_status: faker.random.number(4) + 1 // 默认1-待审核，2-审核通过，3-审核拒绝，4-app下线，5-生效中
  }))
}

export const mockGetDataList = mockDecorator((...args) => {
  console.log(args[0])
  if (process.env.NODE_ENV === 'development') {
    return new Promise(resolve => {
      window.setTimeout(resolve, 800, {
        'dm_error': 0,
        'error_msg': '操作成功',
        'data': {
          'domains': [
            {
              'domain': 'ztapi.caratsvip.com',
              'proto': 'https',
              'env': 'qa',
              'usage': 'zt_api',
              'desc': '',
              'item': {
                'domain': 'ztapi.caratsvip.com',
                'label': '中台线上接口',
                'env': '腾讯机房-线上',
                'update_time': '2017-10-01 12:00:00',
                'operator': '张三'
              }
            }
          ],
          'config': {
            'protos': [
              {
                'key': 'https',
                'name': 'https'
              },
              {
                'key': 'http',
                'name': 'http'
              },
              {
                'key': 'rpc',
                'name': 'rpc'
              }
            ],
            'envs': [
              {
                'key': 'dev',
                'name': '联调环境'
              },
              {
                'key': 'qa',
                'name': '测试环境'
              }
            ],
            'usages': [
              {
                'key': 'zt_api',
                'name': '中台接口'
              },
              {
                'key': 'bz_api',
                'name': '业务接口'
              },
              {
                'key': 'resource_upload',
                'name': '资源上传'
              }
            ]
          }
        }
      })
    })
  }
})

export const mockAdd = mockDecorator((...args) => {
  console.log(args[0])
  if (process.env.NODE_ENV === 'development') {
    return new Promise(resolve => {
      window.setTimeout(resolve, 1000, {
        dm_error: 0,
        error_msg: 'success',
        data: {}
      })
    })
  }
})

export const mockDelete = mockDecorator((...args) => {
  console.log(args[0])
  if (process.env.NODE_ENV === 'development') {
    return new Promise(resolve => {
      window.setTimeout(resolve, 1000, {
        dm_error: 0,
        error_msg: 'success',
        data: {}
      })
    })
  }
})
