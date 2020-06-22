
import Mock from 'mockjs'
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// console.log(data)

const APP_USER_INFO = {
  url: /\/goddess\/user_info/,
  type: 'post',
  template: {
    data: {
      id: 'bock.libaoxu.cn',
      username: '业务和运营中心'
    },
    dm_error: 0,
    error_msg : ""
  }
}

export default {
  APP_USER_INFO
}