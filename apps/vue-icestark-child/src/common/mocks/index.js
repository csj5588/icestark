import Mock from 'mockjs'

import demo from './demo'
import user from './user'

const mockObj = {
  ...demo,
  ...user
}

export default {
  intercept (key, params) {
    let mockItem = mockObj[key]
	
    mockItem && Mock.mock(mockItem.url, mockItem.type, function () {
      let template = mockItem.template

      return typeof template === 'function' ? template(params) : template
    })
  }
}