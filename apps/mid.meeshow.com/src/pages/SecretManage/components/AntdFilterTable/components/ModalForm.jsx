import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, Modal, Switch } from 'antd'
import { numCommaReplace, filterOption } from 'ik-utils'

import { VIEW } from '../constants/modalTypes'
import { timeFormat, momentToTime } from '../constants/timeFormat'
// import { selectList, multipleSelectList } from '../constants/selectLists'
import moment from 'moment';
const { RangePicker } = DatePicker;

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
      appList: []
    }
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

  get formData () {
    const filterParams = this.props.form.getFieldsValue()
    const { name, priority } = filterParams

    const formDataAll = Object.assign({}, this.props.formData, filterParams, {
      enable: filterParams.enableSwitch ? 1 : 2
    })

    return formDataAll
  }

  hideDialog = () => {
    this.props.hideDialog()
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return false
      }
      this.props.handleSubmit(this.formData)
    })
  }

  addApp() {

  }

  getAppList() {

  }

  render () {
    const { appList } = this.state
    const {
      form: {
        getFieldDecorator
      },
      formData: {
        id,
        app_id: appId,
        access_key_id: accessKeyId,
        access_key_secret: accessKeySecret,
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

    return <Modal
      title={title}
      visible={visible}
      onOk={handleSubmit}
      onCancel={hideDialog}
      width={620}
      maskClosable
    >
      <Form layout="horizontal">
        <Form.Item {...formItemLayout} label="选择App">
          {
            getFieldDecorator('app_id', {
              initialValue: appId,
              rules: [
                { required: true, message: '请选择App' }
              ]
            })(
              <div>
                <Select
                  allowClear
                  showSearch
                  style={{ width: '100px' }}
                  filterOption={filterOption}
                >
                  {
                    appList.map((item, index) => <Select.Option key={index} value={item.id}>{ item.remark }</Select.Option>)
                  }
                </Select>
                <Button onClick={this.addApp.bind(this)} style={{ marginLeft: '12px' }}>添加app</Button>
                <Button onClick={this.getAppList.bind(this)} style={{ marginLeft: '12px' }}>刷新</Button>
              </div>
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="AccessKeyId">
          {
            getFieldDecorator('access_key_id', {
              initialValue: accessKeyId,
              rules: [
                { required: true, message: '请输入accessKeyId' }
              ]
            })(
              <Input
                placeholder="请输入accessKeyId"
                style={{ width: '240px' }}
                disabled={type === VIEW}
              />
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="AccessKeySecret">
          {
            getFieldDecorator('access_key_secret', {
              initialValue: accessKeySecret,
              rules: [
                { required: true, message: '请输入accessKeySecret' }
              ]
            })(
              <Input
                placeholder="请输入accessKeySecret"
                style={{ width: '240px' }}
                disabled={type === VIEW}
              />
            )
          }
        </Form.Item>

        <Form.Item label="启用" {...formItemLayout}>
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
