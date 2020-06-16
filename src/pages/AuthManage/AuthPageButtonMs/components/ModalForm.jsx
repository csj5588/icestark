import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, Modal } from 'antd'
import { filterOption } from 'ik-utils'

import S from '../apis'
import { ADD, ADD_PAGE } from '../constants/modalTypes'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

export default
@Form.create()
class ModalForm extends Component {
  static propTypes = {
    modalConfig: PropTypes.object,
    formData: PropTypes.object,
    nodeData: PropTypes.object,
    hideDialog: PropTypes.func,
    hundleSubmitSuccess: PropTypes.func,
  }

  static defaultProps = {
    modalConfig: {},
    formData: {},
    nodeData: {},
    hideDialog: () => {},
    hundleSubmitSuccess: () => {},
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  onCancel = () => {
    this.props.hideDialog()
    this.props.form.resetFields()
  }

  onOk = () => {
    const { formData } = this.props

    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }

      this.handleSubmit({
        ...formData,
        ...values
      })
    })
  }

  handleSubmit = formData => {
    const { modalConfig: { type }, nodeData: { id }, hundleSubmitSuccess } = this.props
    const { code, parent, apipath } = formData

    const formDataAll = Object.assign({}, formData, {
      parent: type === ADD ? id : parent,
      code: code || 0
    })

    if (formData.type !== ADD_PAGE && !apipath.replace('/', '')) {
      this.$message.error('请输入完整的接口地址')
      return
    }

    S.postModuleModify(formDataAll)
      .then(() => {
        this.$message.success('提交成功')
        hundleSubmitSuccess()
        this.onCancel()
      })
  }

  setFieldsValue = val => {
    this.props.form.setFieldsValue({ 'name': val || '' })
  }

  render () {
    const {
      form: {
        getFieldDecorator
      },
      modalConfig: {
        visible,
        title
      },
      formData: {
        name,
        apipath,
        root,
        code,
        type
      },
      buttonCtrl
    } = this.props

    const {
      setFieldsValue,
      onCancel,
      onOk
    } = this

    return <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      width={600}
      maskClosable
    >
      <Form layout="horizontal">
        <Form.Item {...formItemLayout} label="名称">
          {
            getFieldDecorator('name', {
              initialValue: name,
              rules: [
                { required: true, message: '请输入名称' }
              ]
            })(
              <Input
                placeholder="请输入名称"
                style={{ width: '320px' }}
              />
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="接口地址">
          {
            getFieldDecorator('apipath', {
              initialValue: apipath,
              rules: [
                { required: true, message: '请输入接口地址' }
              ]
            })(
              <Input
                placeholder="请输入接口地址"
                style={{ width: '320px' }}
                disabled={type === ADD_PAGE}
              />
            )
          }
        </Form.Item>

        {
          type === ADD_PAGE ? <Form.Item {...formItemLayout} label="前端路由">
            {
              getFieldDecorator('root', {
                initialValue: root,
                rules: [
                  { required: true, message: '请输入前端路由' }
                ]
              })(
                <Input
                  placeholder="请输入前端路由"
                  style={{ width: '320px' }}
                />
              )
            }
          </Form.Item> : <Form.Item {...formItemLayout} label="按钮类型">
            {
              getFieldDecorator('code', {
                initialValue: code,
                rules: [
                  { required: true, message: '请选择按钮类型' }
                ]
              })(
                <Select
                  allowClear
                  showSearch
                  style={{ width: '320px' }}
                  placeholder="请选择按钮类型"
                  filterOption={filterOption}
                  onChange={(e, o) => { setFieldsValue(o ? o.props.children : '') }}
                >
                  {
                    Object.values(buttonCtrl).map(item =>
                      <Select.Option
                        key={item.id}
                        value={`${item.id}`}
                      >
                        { item.label }
                      </Select.Option>
                    )
                  }
                </Select>
              )
            }
          </Form.Item>
        }
      </Form>
    </Modal>
  }
}
