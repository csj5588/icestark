import srcConfig from 'src/config'
import { getRequestRoots } from 'src/service/utils'
const {getRoot, postRoot, deleteRoot} = getRequestRoots(srcConfig.APIS.root)

const autoLoading = true

// 获取工单列表
export const SEARCH_ORDER_LIST = getRoot('workorder/api/v1/order/')

// 获取详情
export const GET_DETAIL_DATA = getRoot('workorder/api/v1/order/')

// 获取工单模版
export const GET_TEMPLATE_LIST = getRoot('workorder/api/v1/template')

// 新增模版
export const ADD_TEMPLATE = postRoot('workorder/api/v1/template')

// 删除模版
export const DEL_TEMPLATE = deleteRoot('workorder/api/v1/template/')

// 新增工单
export const ADD_ORDER = postRoot('workorder/api/v1/order')

// 新增申请节点权限工单
export const ADD_AUTHORDER = postRoot('workorder/api/v1/authorder')

// 获取产品线列表
export const GET_PDL = getRoot('tree/api/v2/tree/pdl')

// 获取角色名称列表
export const GET_ROLE = getRoot('auth/api/v1/role')

// 撤回OR审批工单
export const DEAL_ORDER = postRoot('workorder/api/v1/order/approval')

/**
 * 增加临时审批人
 * @desc http://wiki.inkept.cn/pages/viewpage.action?pageId=36801018
 */
export const TEM_APPROVE = postRoot('workorder/api/v1/order/tmpapprove')

// 获取审批人下拉列表
export const APPROVER_ROLE = getRoot('workorder/api/v1/template/approverrole')

// 获取服务数节点列表
// export const TREE_LIST = getRoot('tree/api/v2/tree/pdl')
export const TREE_LIST = getRoot('tree/api/v2/tree/pdl/alias')
