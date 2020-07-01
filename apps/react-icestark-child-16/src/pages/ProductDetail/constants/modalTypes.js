export const ADD = 'add';

export const UPDATE = 'update';

export const DETAIL = 'detail';

// 日志
export const LOG = 'log';

// 下线
export const OFFLINE = 'offline';

// 归档
export const BACK = 'archiving'

export const TEXT_MAP = {
  [OFFLINE]: '下线',
  [BACK]: '归档',
}

// 状态, 0: 未接入， 1：已接入
export const ON_ACCESS = 1

export const OFF_ACCESS = 0

export const ACCESS_STATUS = {
  [ON_ACCESS]: '已接入',
  [OFF_ACCESS]: '未接入'
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
