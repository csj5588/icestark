import React from 'react';
import { Form, Input, Cascader } from 'antd';
import { filterOption } from 'ik-utils'
import { ADD, DETAIL, UPDATE } from '../../../constants/modalTypes'
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

const fieldNames = {
  label: 'name',
  value: 'key',
  children: 'server_rooms'
}
class Content extends React.Component {
  render () {
    const { form, store } = this.props;
    const {
      create: {
        type,
      },
      createParams: {
        env,
        server_room: serverRoom,
        desc,
      },
      configList
    } = store;
    const isAdd = type === ADD
    const domain = isAdd ? [] : [env, serverRoom]
    const { getFieldDecorator } = form;

    const isDisable = type === DETAIL;
    const isEdit = type === UPDATE;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="环境选择" {...formItemLayout}>
          {getFieldDecorator('domain', {
            initialValue: domain,
            rules: [
              {
                required: true,
                message: '请输入环境选择',
              },
            ],
          })(
            <Cascader
              style={{ width: '240px' }}
              options={configList}
              disabled={isEdit || isDisable}
              placeholder="请输入环境选择"
              fieldNames={fieldNames}
              showSearch={filterOption}
            />
            ,
          )}
        </Form.Item>
        <Form.Item label="环境用途" {...formItemLayout}>
          {getFieldDecorator('desc', {
            initialValue: desc,
            rules: [
              {
                required: true,
                message: '请输入环境用途',
              },
            ],
          })(
            <TextArea
              placeholder="请输入环境用途"
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={isDisable}
            />,
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default Content;
