import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, Modal } from 'antd'

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

    const formDataAll = Object.assign({}, this.props.formData, filterParams)

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
      formData,
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
      width={600}
      maskClosable
    >
      <Form layout="horizontal">
        <Form.Item {...formItemLayout} label="角色类型名称">
          {
            getFieldDecorator('type_name', {
              initialValue: formData.type_name,
              rules: [
                { required: true, message: '请输入角色类型名称' }
              ]
            })(
              <Input
                placeholder="请输入角色类型名称"
                style={{ width: '320px' }}
              />
            )
          }
        </Form.Item>
      </Form>
    </Modal>
  }
}
