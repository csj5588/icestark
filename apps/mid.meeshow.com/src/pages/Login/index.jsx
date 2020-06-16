/**
 * 登录页面 模板
 * @author lizihan
 * @since 20190418
 */
import React from 'react'
import LoginForm from './components/LoginForm'
import srcConfig from 'src/config'
import './index.scss'

export default
function Login (props) {
  return <div className="ik-app-login">
    <div className="login_cont">
      <div className="section_right">
        <div className="login-box">
          <span className="login_logo"></span>
          <div className="login_title">
            { srcConfig.SYSTEM_CHINA_NAME }
          </div>
          <LoginForm/>
        </div>
      </div>
    </div>
  </div>
}
