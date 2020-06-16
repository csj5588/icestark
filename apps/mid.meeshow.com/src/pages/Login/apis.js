/**
 * 登录页面相关接口
 * @author lizihan
 * @since 20190418
 * @desc http://wiki.inkept.cn/pages/viewpage.action?pageId=57362454
 */
import { getRequestsByRoot } from 'axios-service'
import srcConfig from 'src/config'

const { get, post, postXForm } = getRequestsByRoot({ root: srcConfig.APIS.root })

class Apis {
  // 获取手机验证码
  getPhoneCode = get('login/phone_code_pc')
  // 用户登录
  getPhoneLogin = get('login/phone_login_pc')

  getCaptcha = get('login/get_captcha_pc')
}

export default new Apis()
