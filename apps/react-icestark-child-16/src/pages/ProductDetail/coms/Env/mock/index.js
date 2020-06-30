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
      window.setTimeout(resolve, 800,
        {
          'dm_error': 0,
          'error_msg': '操作成功',
          'data': {
            'envs': [
              {
                'env': 'qa',
                'server_room': 'tx',
                'desc': '用于qa测试1',
                'item': {
                  'env': 'qa',
                  'name': '测试环境',
                  'desc': '用于qa测试',
                  'server_room': '腾讯机房',
                  'internal_domain': 'common.apigateway.inke.srv',
                  'update_time': '2017-10-01 12:00:00',
                  'operator': '张三'
                }
              }
            ],
            'config': {
              'envs': [
                {
                  'key': 'qa',
                  'name': '测试环境',
                  'server_rooms': [
                    {
                      'key': 'tx',
                      'name': '腾讯机房1'
                    },
                    {
                      'key': 'ali',
                      'name': '阿里机房1'
                    }
                  ]
                },
                {
                  'key': 'dev',
                  'name': '联调环境',
                  'server_rooms': [
                    {
                      'key': 'tx',
                      'name': '腾讯机房2'
                    },
                    {
                      'key': 'ali',
                      'name': '阿里机房2'
                    }
                  ]
                }
              ]
            }
          }
        }
      )
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
