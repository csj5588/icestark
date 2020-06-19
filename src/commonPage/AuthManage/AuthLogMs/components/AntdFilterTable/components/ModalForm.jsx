import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, Modal } from 'antd'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

const isJsonString = str => {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str)

      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}

export default
@Form.create()
class ModalForm extends Component {
  static propTypes = {
    formData: PropTypes.object,
    modalConfig: PropTypes.object,
    hideDialog: PropTypes.func,
  }

  static defaultProps = {
    formData: {},
    modalConfig: {},
    hideDialog: () => {},
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {

  }

  componentWillUpdate (nextProps, nextState) {

  }

  componentDidUpdate (prevProps, prevState) {

  }

  componentWillUnmount () {

  }

  resetFields () {
    this.props.form.resetFields()
  }

  hideDialog = () => {
    this.props.hideDialog()
  }

  renderRequestParams = params => {
    let _paramsString = ''

    if (isJsonString(params)) {
      const paramsJson = JSON.parse(params)

      for (let key in paramsJson) {
        _paramsString += `${key}: '${paramsJson[key]}'<br/>`
      }
    } else {
      _paramsString = params || '空'
    }

    return _paramsString
  }

  render () {
    const {
      formData: {
        system_conf_type_show: systemConfTypeShow,
        page_name: pageName,
        button_name: buttonName,
        operater,
        ctime,
        request_params: requestParams
      },
      modalConfig: {
        visible,
        title,
        type
      }
    } = this.props

    const {
      hideDialog,
      renderRequestParams
    } = this

    return <Modal
      title={title}
      visible={visible}
      onCancel={hideDialog}
      width={520}
      maskClosable
      footer={null}
    >
      <Form layout="horizontal">
        <Form.Item {...formItemLayout} label="配置类型">
          <span>{ systemConfTypeShow }</span>
        </Form.Item>

        <Form.Item {...formItemLayout} label="页面名称">
          <span>{ pageName }</span>
        </Form.Item>

        <Form.Item {...formItemLayout} label="按钮名称">
          <span>{ buttonName }</span>
        </Form.Item>

        <Form.Item {...formItemLayout} label="操作人">
          <span>{ operater }</span>
        </Form.Item>

        <Form.Item {...formItemLayout} label="操作时间">
          <span>{ ctime }</span>
        </Form.Item>

        <Form.Item {...formItemLayout} label="参数明细">
          <span
            style={{ textAlign: 'justify', wordBreak: 'break-all' }}
            dangerouslySetInnerHTML={{ __html: renderRequestParams(requestParams) }}
          ></span>
        </Form.Item>
      </Form>
    </Modal>
  }
}
