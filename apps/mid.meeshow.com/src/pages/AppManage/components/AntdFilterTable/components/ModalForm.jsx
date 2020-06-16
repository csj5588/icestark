import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, Modal, Switch } from 'antd'
import { numCommaReplace, filterOption } from 'ik-utils'

import { VIEW } from '../constants/modalTypes'
import { timeFormat, momentToTime } from '../constants/timeFormat'
import { selectList, multipleSelectList } from '../constants/selectLists'
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

  render () {
    const {
      form: {
        getFieldDecorator
      },
      formData: {
        id,
        remark,
        app,
        bundle_id: bundleId,
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
      width={520}
      maskClosable
    >
      <Form layout="horizontal">
        <Form.Item {...formItemLayout} label="app名称">
          {
            getFieldDecorator('remark', {
              initialValue: remark,
              rules: [
                { required: true, message: '请输入app名称' }
              ]
            })(
              <Input
                placeholder="请输入app名称"
                style={{ width: '240px' }}
                disabled={type === VIEW}
                maxLength={10}
              />
            )
          }
        </Form.Item>
        <Form.Item {...formItemLayout} label="appKey">
          {
            getFieldDecorator('app', {
              initialValue: app,
              rules: [
                { required: true, message: '请输入appkey' }
              ]
            })(
              <Input
                placeholder="请输入appkey"
                style={{ width: '240px' }}
                disabled={type === VIEW}
                maxLength={10}
              />
            )
          }
        </Form.Item>
        <Form.Item {...formItemLayout} label="bundle_id">
          {
            getFieldDecorator('bundle_id', {
              initialValue: bundleId,
              rules: [
                { required: true, message: '请输入bundle_id' }
              ]
            })(
              <Input
                placeholder="请输入bundle_id"
                style={{ width: '240px' }}
                disabled={type === VIEW}
                maxLength={10}
              />
            )
          }
        </Form.Item>

      </Form>
    </Modal>
  }
}
