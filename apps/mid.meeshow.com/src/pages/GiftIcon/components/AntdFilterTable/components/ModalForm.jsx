import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, Modal, Upload, Icon, Switch } from 'antd'
import { numCommaReplace, filterOption } from 'ik-utils'

import UploadRes from 'components/UploadRes'
import { VIEW } from './../../../constants/modalTypes'
import S from './../apis'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

export default
@Form.create()
class ModalForm extends Component {
  static propTypes = {
    formData: PropTypes.object,
    modalConfig: PropTypes.object,
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
  }

  static defaultProps = {
    formData: {},
    modalConfig: {},
    hideDialog: () => {},
    handleSubmit: () => {},
  }

  constructor (props) {
    super(props)
    this.state = {
      allSettings: {}
    }
  }

  componentWillMount () {

  }

  componentDidMount () {
    this.getSetting()
  }

  componentWillReceiveProps (nextProps) {

  }

  componentWillUpdate (nextProps, nextState) {

  }

  componentDidUpdate (prevProps, prevState) {

  }

  componentWillUnmount () {

  }
  // 关闭弹窗后重置控件值
  resetFields () {
    this.props.form.resetFields()
  }

  get formData () {
    const filterParams = this.props.form.getFieldsValue()
    const formDataAll = Object.assign({}, this.props.formData, filterParams, {
      enable: filterParams.enableSwitch ? 1 : 2
    })
    return formDataAll
  }

  hideDialog = () => {
    console.log('hideDialog')
    this.resetFields();
    this.props.hideDialog();
  }

  handleSubmit = () => {
    console.log(this.formData)
    this.props.form.validateFields((err, values) => {
      if (err) {
        return false
      }
      this.props.handleSubmit(this.formData)
    })
  }

  // 获取配置
  getSetting = () => {
    S.getGiftSetting({ gift_settings: 1 })
      .then(({ data }) => {
        this.setState({
          allSettings: data || {}
        })
      })
  }

  render () {
    const {
      form: {
        getFieldDecorator
      },
      formData: {
        id,
        name,
        url_2x: url2x,
        url_3x: url3x,
        enable,
      },
      modalConfig: {
        visible,
        title,
        type
      }
    } = this.props

    const {
      hideDialog,
      handleSubmit
    } = this
    const { allSettings } = this.state;
    const uploadUrl = (allSettings.address_settings && allSettings.address_settings.upload_url) || ''

    return <Modal
      title={title}
      visible={visible}
      onOk={handleSubmit}
      onCancel={hideDialog}
      width={520}
      maskClosable
    >
      <Form layout="horizontal">
        <Form.Item {...formItemLayout} label="角标名称">
          {
            getFieldDecorator('name', {
              initialValue: name,
              rules: [
                { required: true, message: '请输入角标名称' }
              ]
            })(
              <Input
                placeholder="请输入角标名称"
                style={{ width: '240px' }}
                disabled={type === VIEW}
                maxLength={10}
              />
            )
          }
        </Form.Item>

        <Form.Item label="2X角标" {...formItemLayout} extra="">
          {getFieldDecorator('url_2x', {
            initialValue: url2x || '',
            rules: [
              { required: true, message: '请上传角标图' }
            ]
          })(
            <UploadRes
              action={uploadUrl}
              accept={'image/png, image/jpeg, image/gif'}
              maxCount = {1}
              limitSize = {1}
              previewStyle = {{ width: '100px', height: '90px' }}
              isDisabled = {type === VIEW}
              onChange = {(data) => {
                console.log('changeData 外面', data);
              }}
            />
          )}
        </Form.Item>

        <Form.Item label="3X角标" {...formItemLayout} extra="">
          {getFieldDecorator('url_3x', {
            initialValue: url3x || '',
          })(
            <UploadRes
              action={uploadUrl}
              accept={'image/png, image/jpeg, image/gif'}
              maxCount = {1}
              limitSize = {1}
              previewStyle = {{ width: '100px', height: '90px' }}
              onChange = {(data) => {
                console.log('changeData 外面', data);
              }}
            />
          )}
        </Form.Item>

        <Form.Item label="启用角标" {...formItemLayout}>
          {getFieldDecorator('enableSwitch', { valuePropName: 'checked', initialValue: this.props.formData.enable === 1 })(
            <Switch
              disabled={type === VIEW}
            />)
          }
        </Form.Item>

      </Form>
    </Modal>
  }
}
