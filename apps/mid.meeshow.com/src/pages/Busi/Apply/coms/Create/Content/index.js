import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import { filterOption } from 'ik-utils'
import { statusList } from '../../../constants/selectLists'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}
class Content extends React.Component {
  render () {
    const { form, store } = this.props;
    const {
      createParams: {
        username,
        email,
        department,
        role_id: roleId,
        status,
      },
      roleList
    } = store;
    const { getFieldDecorator } = form;

    return (
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
                {// roleList
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
                { // selectList
                  statusList.map(item =>
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
    )
  }
}

export default Content;
