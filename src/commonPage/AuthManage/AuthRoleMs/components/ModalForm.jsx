import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, Modal, Tree, Icon } from 'antd'
import filterOption from 'ik-utils/lib/admin/filterOption'

import { selectList } from '../constants/selectLists'

const { TreeNode } = Tree

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
    roleTypeList: PropTypes.array,
    checkedKeys: PropTypes.array,
    rolesAddParams: PropTypes.array,
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleCheck: PropTypes.func,
  }

  static defaultProps = {
    formData: {},
    modalConfig: {},
    roleTypeList: [],
    checkedKeys: [],
    rolesAddParams: [],
    hideDialog: () => {},
    handleSubmit: () => {},
    handleCheck: () => {},
  }

  constructor (props) {
    super(props)
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
    const { type_id: typeId, status } = filterParams

    const formDataAll = Object.assign({}, this.props.formData, filterParams, {
      type_id: typeId || '',
      status: status || '',
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

      const {
        apps = [],
      } = values

      const { dataPower } = this.formData
      Object.assign(dataPower, { apps })

      const params = {
        ...this.formData,
        data_power: JSON.stringify(dataPower)
      }

      // delete params.apps
      this.props.handleSubmit(params)
    })
  }

  handleCheck = (keys, extra) => {
    const extraFilter = extra.halfCheckedKeys.filter(i => (+i !== 0))
    const transExtra = [...extraFilter, ...keys]

    this.props.handleCheck(keys, transExtra)
  }

  renderTreeList = (data, level = 1) => data.map(item => {
    const nextLevel = level + 1

    return <TreeNode
      key={item.id}
      title={item.name}
      selectable={false}
    >
      {
        item.children && item.children.length > 0 ? this.renderTreeList(item.children, nextLevel) : null
      }
    </TreeNode>
  })

  render () {
    const {
      form: {
        getFieldDecorator
      },
      formData: {
        name,
        type_id: typeId,
        status,
        apps
      },
      modalConfig: {
        visible,
        title,
        type
      },
      pageButtonTreeRightUid,
      roleTypeList,
      checkedKeys,
      authList
    } = this.props

    const {
      hideDialog,
      handleSubmit,
      handleCheck,
      renderTreeList
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
        <Form.Item {...formItemLayout} label="角色名称">
          {
            getFieldDecorator('name', {
              initialValue: name,
              rules: [
                { required: true, message: '请输入角色名称' }
              ]
            })(
              <Input
                placeholder="请输入角色名称"
                style={{ width: '320px' }}
              />
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="角色类型">
          {
            getFieldDecorator('type_id', {
              initialValue: typeId,
              rules: [
                { required: true, message: '请选择角色类型' }
              ]
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '320px' }}
                placeholder="请选择角色类型"
                filterOption={filterOption}
              >
                {
                  roleTypeList.map(item =>
                    <Select.Option
                      key={item.id}
                      value={`${item.id}`}
                    >
                      { item.type_name }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label="APP">
          {
            getFieldDecorator('apps', {
              initialValue: apps,
              rules: [
                { required: true, message: '请选则app' }
              ]
            })(
              <Select
                mode={'multiple'}
                allowClear
                showSearch
                style={{ width: '320px' }}
                placeholder="请选择App"
                // filterOption={filterOption}
              >
                {
                  authList && authList.map(item =>
                    <Select.Option
                      key={item.appid}
                      value={`${item.appid}`}
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

      <div style={styles.formItemLine}>
        <div style={styles.formItemLineCont}>页面权限</div>
      </div>

      <div style={styles.treeList}>
        <Tree
          switcherIcon={<Icon type="down" />}
          defaultExpandAll
          checkable
          multiple
          checkedKeys={checkedKeys}
          onCheck={handleCheck}
        >
          {
            renderTreeList(pageButtonTreeRightUid, 1)
          }
        </Tree>
      </div>
    </Modal>
  }
}

const styles = {
  treeList: {
    padding: '0 100px'
  },
  formItemLine: {
    marginBottom: '40px',
    height: '24px',
    textAlign: 'center',
    borderBottom: '1px dashed #a0a0a0'
  },
  formItemLineCont: {
    position: 'relative',
    top: '12px',
    margin: 'auto',
    width: '100px',
    height: '24px',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 'bold',
    background: '#ffffff'
  }
}
