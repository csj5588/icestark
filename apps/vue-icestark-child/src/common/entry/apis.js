import srcConfig from 'src/config'
import {getRequestRoots} from 'service/utils'

// const {getRoot, postRoot} = getRequestRoots(srcConfig.APIS.root)
const {getRoot, postRoot} = getRequestRoots('http://intraservice.imilive.cn/')

/**
 * SSO：https://code.inke.cn/tpc/sre/sso-deploy/blob/master/README.md
 */
export const USER_INFO = getRoot('api/oper/sso/login')

export const USER_LOGOUT = postRoot('api/oper/sso/logout')