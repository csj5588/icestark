import srcConfig from '@/config'
import { getRequestsByRoot } from '@/entry/service-auth'

const loginRoot = srcConfig.APIS.loginRoot

const { get, post, postXForm } = getRequestsByRoot({ root: loginRoot })

class Apis {
  getUserInfo = get('login/info')
}

let Api = new Apis()

export const getUserInfo = Api.getUserInfo

export default Api
