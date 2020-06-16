import React from 'react';
import { Form, InputNumber, Input, Select } from 'antd';
import { POST, METHOD_LIST } from '../../../../constants/modalTypes';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const FormItem = (props) => {
  const {
    form: { getFieldDecorator },
    label,
    required,
  } = props;
  return [
    <Form.Item label="服务发现名" {...formItemLayout}>
      {getFieldDecorator(`${label}.service_name`, {
        initialValue: '',
        rules: [
          {
            required: required,
            message: '请输入服务发现名',
          },
        ],
      })(<Input placeholder="请输入服务发现名，需要与consul上的服务名一致" />)}
    </Form.Item>,
    <Form.Item label="uri" {...formItemLayout}>
      {getFieldDecorator(`${label}.uri`, {
        initialValue: '',
        rules: [
          {
            required: required,
            message: '请输入uri,示例/api/test',
          },
        ],
      })(<Input placeholder="请输入uri,示例/api/test" />)}
    </Form.Item>,
    <Form.Item label="method" {...formItemLayout}>
      {getFieldDecorator(`${label}.method`, {
        initialValue: undefined,
        rules: [
          {
            required: required,
            message: '请选择method',
          },
        ],
      })(
        <Select
          style={{ minWidth: '200px' }}
          placeholder="请选择method"
          dropdownMatchSelectWidth={false}
        >
          {METHOD_LIST.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>,
    <Form.Item label="超时时间(ms)" {...formItemLayout}>
      {getFieldDecorator(`${label}.read_timeout`, {
        initialValue: '',
        rules: [
          {
            required: required,
            message: '请输入超时时间',
          },
        ],
      })(<InputNumber min={1} precision={0} placeholder="示例:200" />)}
    </Form.Item>,
    <Form.Item label="使用说明" {...formItemLayout}>
      {getFieldDecorator(`${label}.desc`, {
        initialValue: '',
        rules: [
          {
            required: required,
            message: '请输入使用说明',
          },
        ],
      })(<Input placeholder="desc" />)}
    </Form.Item>,
  ];
};

export default FormItem;
