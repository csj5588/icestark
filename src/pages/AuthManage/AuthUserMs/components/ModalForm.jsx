import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, Modal } from 'antd'
import { filterOption } from 'ik-utils'

import { selectList } from '../constants/selectLists'

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
    roleList: PropTypes.array,
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
  }

  static defaultProps = {
    formData: {},
    modalConfig: {},
    roleList: [],
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
    const { role_id: roleId, status } = filterParams

    const formDataAll = Object.assign({}, this.props.formData, filterParams, {
      role_id: roleId.join(),
      status: status || ''
    })

    return formDataAll
  }

  hideDialog = () => {
    this.props.hideDialog()
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
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
        username,
        email,
        department,
        role_id: roleId,
        status
      },
      modalConfig: {
        visible,
        title,
      },
      roleList
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
      width={600}
      maskClosable
    >
      <Form layout="horizontal">
        <Form.Item {...formItemLayout} label="姓名">
          {
            getFieldDecorator('username', {
              initialValue: username,
              rules: [
                { required: true, message: '请输入姓名' }
              ]
            })(
              <Input
                placeholder="请输入姓名"
                style={{ width: '320px' }}
              />
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="邮箱">
          {
            getFieldDecorator('email', {
              initialValue: email,
              rules: [
                { required: true, message: '请输入邮箱' }
              ]
            })(
              <Input
                placeholder="请输入邮箱"
                style={{ width: '320px' }}
              />
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="部门">
          {
            getFieldDecorator('department', {
              initialValue: department
            })(
              <Input
                placeholder="请输入部门"
                style={{ width: '320px' }}
              />
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="角色名称">
          {
            getFieldDecorator('role_id', {
              initialValue: roleId
            })(
              <Select
                allowClear
                showSearch
                mode="multiple"
                style={{ width: '320px' }}
                placeholder="请选择角色名称"
                filterOption={filterOption}
              >
                {
                  roleList.map(item =>
                    <Select.Option
                      key={item.id}
                      value={`${item.id}`}
                    >
                      { item.name }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="状态">
          {
            getFieldDecorator('status', {
              initialValue: status,
              rules: [
                { required: true, message: '请选择状态' }
              ]
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '320px' }}
                placeholder="请选择状态"
                filterOption={filterOption}
              >
                {
                  selectList.map(item =>
                    <Select.Option
                      key={item.value}
                      value={`${item.value}`}
                    >
                      { item.label }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>
      </Form>
    </Modal>
  }
}
