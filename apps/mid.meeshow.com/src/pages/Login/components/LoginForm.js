/**
 * 登录页面 输入框 模板
 * @author lizihan
 * @since 20190418
 * 已知问题：本地环境 '获取新图片验证码成功' 会出现两次，不是bug😂
 */
import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Row, Col, Tooltip, message } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import srcConfig from 'src/config'
import * as action from 'src/store/action'
import './LoginForm.scss'
import apis from '../apis'

const FormItem = Form.Item
const captcha = `${srcConfig.APIS.root}login/get_captcha_pc`
const classPrefix = 'LoginForm'

const mapDispatchToProps = dispath => bindActionCreators(action, dispath)

function LoginForm (props) {
  const [codeTitle, setCodeTitle] = useState('获取验证码')
  const [captchaUrl, setCaptchaUrl] = useState(captcha)
  const [getCodeBtnDis, setGetCodeBtnDis] = useState(false)
  const [loginBtnDis, setLoginBtnDis] = useState(true)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      flashCaptcha()
    }
  }, [])

  useEffect(() => {
    message.success('获取新图片验证码成功')
  }, [captchaUrl])

  // 获取验证码的倒计时
  const handleCountDown = () => {
    let sec = 59
    setGetCodeBtnDis(true)
    const timer = setInterval(() => {
      setCodeTitle(sec)
      sec--
      if (sec === -1) {
        clearInterval(timer)
        setCodeTitle('获取验证码')
        setGetCodeBtnDis(false)
      }
    }, 1000)
  }

  // 本地环境下，获取图片验证码方法
  const getCaptchaByDEV = () => {
    return axios.get('login/get_captcha_pc', {
      responseType: 'blob'
    }).then(res => {
      let url = window.URL.createObjectURL(res.data)
      return url
    })
  }

  // 更新图片验证码
  const flashCaptcha = () => {
    if (process.env.NODE_ENV === 'development') {
      getCaptchaByDEV().then(url => {
        setCaptchaUrl(url)
      })
    } else {
      setCaptchaUrl(`${captcha}?v=${Date.now()}`)
    }
  }

  // 提交并校验表单
  const handleSubmit = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        handleLogin()
      }
    })
  }

  // 登录ajax
  const handleLogin = () => {
    const { phone, code } = props.form.getFieldsValue()
    apis.getPhoneLogin({
      phone,
      code
    }).then(res => {
      props.setUserLogin(res.data)
      props.history.push('/')
    }).catch(err => {
      console.error(err)
      message.error(err.error_msg)
    })
  }

  // 发送短信验证码
  const handleGetSmsCode = () => {
    const { phone, captcha } = props.form.getFieldsValue()
    apis.getPhoneCode({
      phone,
      captcha
    }).then(res => {
      handleCountDown()
      message.success(res.error_msg)
      setLoginBtnDis(false)
    })
  }

  return <div className={classPrefix}>
    <Form className={`${classPrefix}-form`}>
      <FormItem>
        { props.form.getFieldDecorator('phone', {
          initialValue: '',
          rules: [{ required: true, message: '请输入手机号', whitespace: true }],
        })(<Input className={`${classPrefix}-phone`} size="large" placeholder="请输入手机号"
        // prefix={<Icon type="mobile" style={{ fontSize: 20, marginRight: 50 }} />}
        />) }
      </FormItem>

      <FormItem>
        { props.form.getFieldDecorator('captcha', {
          initialValue: '',
          rules: [{ required: true, message: '请输入图片验证码', whitespace: true }],
        })(<Input
          className={`${classPrefix}-captcha-input`}
          // prefix={<Icon type="barcode" style={{ fontSize: 20 }} />}
          size="large"
          addonAfter={
            <Tooltip placement="topLeft" title="点击刷新图片验证码">
              <img
                alt="请稍后刷新页面再试"
                onClick={flashCaptcha}
                className={`${classPrefix}-captcha-img`}
                src={captchaUrl} /></Tooltip>
          }
          placeholder="请输入图片验证码" />) }
      </FormItem>

      <FormItem>
        <Row>
          <Col span={14}>
            { props.form.getFieldDecorator('code', {
              initialValue: '',
              rules: [{ required: true, message: '请输入手机号', whitespace: true }],
            })(<Input
              onPressEnter={handleSubmit}
              className={`${classPrefix}-sms-input`}
              size="large"
              placeholder="请输入短信验证码" />) }
          </Col>

          <Col span={10}>
            <Button
              onClick={handleGetSmsCode}
              className={`${classPrefix}-get-code-btn`}
              type="primary"
              disabled={getCodeBtnDis}
            >
              {codeTitle}
            </Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Button disabled={loginBtnDis} onClick={handleSubmit} className={`${classPrefix}-login-btn`} type="primary" >
          {`登录`}
        </Button>
      </FormItem>
    </Form>
  </div>
}

// export default withRouter(
//   connect(null, mapDispatchToProps)(
//     Form.create({})(LoginForm)
//   )
// )

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
  Form.create({})
)(LoginForm)
