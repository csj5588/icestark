import React from 'react';
import { Form, Input, Select } from 'antd';
import { filterOption } from 'ik-utils'
import { DETAIL, UPDATE } from '../../../constants/modalTypes'
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
        domain,
        proto,
        env,
        usage,
        desc,
      },
      configList: {
        protos,
        envs,
        usages
      }
    } = store;
    const { getFieldDecorator } = form;

    const isDisable = type === DETAIL;

    const isEdit = type === UPDATE;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="域名" {...formItemLayout}>
          {getFieldDecorator('domain', {
            initialValue: domain,
            rules: [
              {
                required: true,
                message: '请输入域名',
              },
            ],
          })(
            <Input
              style={{ width: '240px' }}
              placeholder="请输入域名"
              disabled={isDisable || isEdit}
            />,
          )}
        </Form.Item>

        <Form.Item label="协议" {...formItemLayout}>
          {
            getFieldDecorator('proto', {
              initialValue: proto,
              rules: [
                {
                  required: true,
                  message: '请选择协议',
                },
              ],
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '240px' }}
                placeholder="请选择协议"
                filterOption={filterOption}
                disabled={isDisable}
              >
                {
                  protos && protos.map(item =>
                    <Select.Option
                      key={item.key}
                      value={`${item.key}`}
                    >
                      { item.name }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="环境选择" {...formItemLayout}>
          {
            getFieldDecorator('env', {
              initialValue: env,
              rules: [
                {
                  required: true,
                  message: '请选择环境选择',
                },
              ],
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '240px' }}
                placeholder="请选择环境选择"
                filterOption={filterOption}
                disabled={isDisable || isEdit}
              >
                {
                  envs && envs.map(item =>
                    <Select.Option
                      key={item.key}
                      value={`${item.key}`}
                    >
                      { item.name }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="域名用途" {...formItemLayout}>
          {
            getFieldDecorator('usage', {
              initialValue: usage,
              rules: [
                {
                  required: true,
                  message: '请选择域名用途',
                },
              ],
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '240px' }}
                placeholder="请选择域名用途"
                filterOption={filterOption}
                disabled={isDisable}
              >
                {
                  usages && usages.map(item =>
                    <Select.Option
                      key={item.key}
                      value={`${item.key}`}
                    >
                      { item.name }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="域名说明" {...formItemLayout}>
          {getFieldDecorator('desc', {
            initialValue: desc,
            rules: [
              {
                required: true,
                message: '请输入域名说明',
              },
            ],
          })(
            <TextArea
              placeholder="请输入域名说明"
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
