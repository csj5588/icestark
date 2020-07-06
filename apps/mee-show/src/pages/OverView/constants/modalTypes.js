export const ADD = 'add';

export const UPDATE = 'update';

export const DETAIL = 'detail';

// 编辑、发布
export const PUBLISH = 'publish'

// 编辑（置灰，不可点击）
export const DISABLE = 'disable'

// 编辑、回滚
export const ROLLBACK = 'rollback'

export const PUBLISH_MAP = {
  publish: '发布',
  rollback: '回滚'
}

// 上传包自动添加地址
export const AUTO = 'auto'

// 手动添加地址
export const MANUAL = 'manual'

export const USING = 1

export const STOP = -1

export const STATUS_TYPE = {
  [USING]: '使用中',
  [STOP]: '已停用'
}

// 路由页面
export const SERVICE = 'ServiceInfo'

export const DISPATCHER = 'Dispatcher'

export const CONFIG = 'DynamicConfig'

export const LONG = 'LongConnect'

export const BURY = 'BuryPoint'

export const ROUTER = {
  [SERVICE]: '/access/service',
  [CONFIG]: '/access/config',
  [DISPATCHER]: '/access/dispatcher',
  [LONG]: '/access/longLink',
  [BURY]: '/access/buried',
}
