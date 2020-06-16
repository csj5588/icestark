import { getMockDecoratorByEnv } from 'axios-service';

const mockDecorator = getMockDecoratorByEnv(
  process.env.NODE_ENV === 'development'
);

export const mockGetDataList = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: 'success',
      data: {
        functions: [
          {
            app_name: '111',
            server_name: '222',
            create_time: 1589962674,
            status: 1,
          },
          {
            app_name: '111333',
            server_name: '222333',
            create_time: 1589962674,
            status: 2,
          },
        ],
        total_count: 120,
      },
    });
  }
});

export const mockAdd = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: 'success',
      data: {},
    });
  }
});

export const mockDelete = mockDecorator((...args) => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve({
      dm_error: 0,
      error_msg: 'success',
      data: {},
    });
  }
});
