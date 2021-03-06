import { getMockDecoratorByEnv } from 'axios-service'

const mockDecorator = getMockDecoratorByEnv(process.env.NODE_ENV === 'development')

export const mockGetDataList = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: 'success',
      data: {
        list: [
          {
            id: '1',
            uid: '111111',
            time: '2020-02-22',
            form1: 'test',
            form2: '21,23',
            form3: '12'
          },
          {
            id: '2',
            uid: '222222',
            time: '2020-02-22',
            form1: 'test',
            form2: '21,23',
            form3: '12'
          },
          {
            id: '3',
            uid: '333333',
            time: '2020-02-22',
            form1: 'test',
            form2: '21,23',
            form3: '12'
          }
        ],
        total: 120
      }
    })
  }
})

export const mockPostDataModify = mockDecorator((...args) => {
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
