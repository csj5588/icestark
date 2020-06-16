import React from 'react';
import { Form, Input } from 'antd';
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}
class Content extends React.Component {
  render () {
    const { form, store } = this.props;
    const {
      create: {
        type,
      },
      createParams: {
        department,
        content,
      }
    } = store;
    const { getFieldDecorator } = form;

    const isDisable = type === 'detail';

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="部门" {...formItemLayout}>
          {getFieldDecorator('department', {
            initialValue: department,
            rules: [
              {
                required: true,
                message: '请输入部门',
              },
            ],
          })(
            <Input
              style={{ width: '240px' }}
              placeholder="请输入部门"
              disabled={isDisable}
            />,
          )}
        </Form.Item>
        <Form.Item label="申请说明" {...formItemLayout}>
          {getFieldDecorator('content', {
            initialValue: content,
            rules: [
              {
                required: true,
                message: '请输入申请说明',
              },
            ],
          })(
            <TextArea
              placeholder="请输入申请说明"
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
