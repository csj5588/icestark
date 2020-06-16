import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, Modal, Upload, Icon, Switch, Radio, InputNumber } from 'antd'
import { numCommaReplace, filterOption } from 'ik-utils'

import UploadRes from 'components/UploadRes'
import { VIEW } from './../../../constants/modalTypes'
import S from './../apis'
const { Option } = Select;
const animateList = {
  'normal': 0,
  'spine': 1,
  'svga': 2
};

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
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
      allSettings: {},
      // 上传资源接口url， 区分压缩和不压缩 如果压缩用zip上传地址，否则用图片上传地址
      uploadResUrl: ''
    }
  }

  // componentWillMount () {

  // }

  componentDidMount () {
    console.log('componentDidMount')
    this.getSetting()
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps', nextProps.formData)
    let propsForm = nextProps.formData;
    let stateForm = nextProps.form.getFieldsValue()
    console.log(propsForm, stateForm);
    if (!stateForm.name) {
      this.setUploadResUrl(propsForm.compress)
    } else {
      this.setUploadResUrl(stateForm.compress)
    }
    if (propsForm.compress !== stateForm.compress) {
      // this.setUploadResUrl(stateForm.compress)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // console.log('componentDidUpdate', prevProps, prevState)
  }

  componentWillUnmount () {

  }

  // 关闭弹窗后重置控件值
  resetFields () {
    this.props.form.resetFields()
  }

  get formData () {
    const filterParams = this.props.form.getFieldsValue()
    // console.log('this.props.formData', this.props.formData, 'filterParams', filterParams)
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
    // console.log(this.formData)
    const data = this.formData
    this.props.form.validateFields((err, values) => {
      if (err) {
        return false
      }
      this.props.handleSubmit(data)
    })
  }
  // 获取配置
  getSetting = () => {
    S.getGiftSetting({ gift_settings: 1, gift_resource_settings: 1 })
      .then(({ data }) => {
        this.setState({
          allSettings: data || {}
        })
        this.setUploadResUrl(1, data)
      })
  }
  setUploadResUrl (compress, allSettings) {
    console.log('setUploadResUrl', compress)
    let addressSettings = (allSettings || this.state.allSettings).address_settings
    if (!addressSettings) {
      return;
    }
    let uploadResUrl = (addressSettings.media_upload_url) || ''
    if (!uploadResUrl) {
      return;
    }
    if (compress !== 0) {
      uploadResUrl += '?sufix=zip'
    }
    console.log('uploadResUrl', uploadResUrl)
    this.setState({
      uploadResUrl
    })
  }

  render () {
    const {
      form: {
        getFieldDecorator,
        setFieldsValue
      },
      formData: {
        id,
        name,
        msg_url_2x: msgUrl2x, // 私信送礼图片2X
        msg_url_3x: msgUrl3x, // 私信送礼图片3X
        chat_url: chatUrl, // 聊天图片
        gift_url_2x: giftUrl2x, // 礼物图片2X
        gift_url_3x: giftUrl3x, // 礼物图片3X
        res_url: resUrl, // 资源压缩包
        res_md5: resMd5, // 压缩包Md5
        compress = 1, // 启用资源zip包压缩
        type: animateType = 1, // 动画类型
        animation_time: animateTime = 3, // 动效播放时长
        preload = 0, // app启动下载资源
        enable = 1, // 是否启用
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
    // 媒体资源上传
    const uploadUrlMedia = (allSettings.address_settings && allSettings.address_settings.media_upload_url) || ''

    const typeEnum = (allSettings.gift_resource_settings && allSettings.gift_resource_settings.type_enum) || animateList

    return <Modal
      title={title}
      visible={visible}
      onOk={handleSubmit}
      onCancel={hideDialog}
      width={620}
      maskClosable
    >
      <Form layout="horizontal">
        <Form.Item {...formItemLayout} label="资源名称">
          {
            getFieldDecorator('name', {
              initialValue: name,
              rules: [
                { required: true, message: '请输入资源名称' }
              ]
            })(
              <Input placeholder="请输入名称" style={{ width: '240px' }} disabled={type === VIEW} maxLength={20} />
            )
          }
        </Form.Item>

        <Form.Item label="私信送礼图片2X" {...formItemLayout} extra="">
          {getFieldDecorator('msg_url_2x', {
            initialValue: msgUrl2x || '',
          })(
            <UploadRes
              action={uploadUrl}
              accept={'image/png, image/jpeg, image/gif'}
              maxCount = {1}
              limitSize = {1}
              previewStyle = {{ width: '100px', height: '90px' }}
              isDisabled = {type === VIEW}
              onChange = {(data) => {
              }}
            />
          )}
        </Form.Item>

        <Form.Item label="私信送礼图片3X" {...formItemLayout} extra="">
          {getFieldDecorator('msg_url_3x', {
            initialValue: msgUrl3x || '',
          })(
            <UploadRes
              action={uploadUrl}
              accept={'image/png, image/jpeg, image/gif'}
              maxCount = {1}
              limitSize = {1}
              previewStyle = {{ width: '100px', height: '90px' }}
              isDisabled = {type === VIEW}
              onChange = {(data) => {
              }}
            />
          )}
        </Form.Item>

        <Form.Item label="聊天图片" {...formItemLayout} extra="">
          {getFieldDecorator('chat_url', {
            initialValue: chatUrl || '',
          })(
            <UploadRes
              action={uploadUrl}
              accept={'image/png, image/jpeg, image/gif'}
              maxCount = {1}
              limitSize = {1}
              previewStyle = {{ width: '100px', height: '90px' }}
              isDisabled = {type === VIEW}
              onChange = {(data) => {
              }}
            />
          )}
        </Form.Item>

        <Form.Item label="礼物图片2X" {...formItemLayout} extra="">
          {getFieldDecorator('gift_url_2x', {
            initialValue: giftUrl2x || '',
            rules: [
              { required: true, message: '礼物图片2X' }
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
              }}
            />
          )}
        </Form.Item>

        <Form.Item label="礼物图片3X" {...formItemLayout} extra="">
          {getFieldDecorator('gift_url_3x', {
            initialValue: giftUrl3x || '',
            rules: [
              { required: true, message: '礼物图片3X' }
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
              }}
            />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="资源包是否压缩">
          {
            getFieldDecorator('compress', { initialValue: compress })(
              <Radio.Group>
                <Radio value={1}>压缩</Radio>
                <Radio value={0}>不压缩</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>

        <Form.Item label="资源包" {...formItemLayout} extra="">
          {getFieldDecorator('res_url', {
            initialValue: resUrl || '',
            rules: []
          })(
            <UploadRes
              action={this.state.uploadResUrl}
              fileExt = {[]}
              maxCount = {1}
              limitSize = {5}
              previewStyle = {{ width: '100px', height: '90px' }}
              isDisabled = {type === VIEW}
              onChange = {(data, fileList) => {
                if (!fileList || !fileList[0]) {
                  return;
                }
                const { file } = fileList[0]
                if (file && file.md5_str) {
                  console.log('md5_str', file.md5_str)
                  setFieldsValue({ 'res_md5': file.md5_str })
                }
              }}
            />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="资源zip包MD5">
          {
            getFieldDecorator('res_md5', {
              initialValue: resMd5,
              rules: []
            })(
              <Input placeholder="上传zip资源包自动生成" style={{ width: '300px' }} disabled={type === VIEW} readOnly={true} maxLength={100} />
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="动画类型">
          {
            getFieldDecorator('type', {
              initialValue: animateType
            })(
              <Select style={{ width: '140px' }}>
                {
                  Object.keys(typeEnum).map((key, index) => {
                    return <Option value={typeEnum[key]} key={index}>{key}</Option>
                  })
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="动画类型">
          {getFieldDecorator('animation_time', { initialValue: animateTime })(<InputNumber min={1} max={200} />)}
          <span className="ant-form-text"> 秒</span>
        </Form.Item>

        <Form.Item label="app启动下载资源" {...formItemLayout}>
          {getFieldDecorator('preload', { initialValue: preload })(
            <Radio.Group>
              <Radio value={1}>启动</Radio>
              <Radio value={0}>不启动</Radio>
            </Radio.Group>
          )
          }
        </Form.Item>

        <Form.Item label="启用" {...formItemLayout}>
          {getFieldDecorator('enableSwitch', { valuePropName: 'checked', initialValue: enable === 1 })(
            <Switch
              disabled={type === VIEW}
            />)
          }
        </Form.Item>

      </Form>
    </Modal>
  }
}
