import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import { filterOption } from 'ik-utils'
import { selectList, multipleSelectList } from '../../../constants/selectLists'
import { timeFormat, timeToMoment } from '../../../constants/timeFormat'

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
        uid,
        date,
        form1,
        form2,
        form3,
      }
    } = store;
    const { getFieldDecorator } = form;

    const isDisable = type === 'detail';

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="UID" {...formItemLayout}>
          {getFieldDecorator('uid', {
            initialValue: uid,
            rules: [
              {
                required: true,
                message: '请输入uid',
              },
            ],
          })(
            <Input
              style={{ width: '240px' }}
              placeholder="请输入uid"
              disabled={isDisable}
            />,
          )}
        </Form.Item>
        <Form.Item label="日期" {...formItemLayout}>
          {getFieldDecorator('date', {
            initialValue: timeToMoment(date),
            rules: [
              {
                required: true,
                message: '请选择日期',
              },
            ],
          })(
            <DatePicker
              format={timeFormat}
              style={{ width: '240px' }}
              disabled={isDisable}
            />,
          )}
        </Form.Item>
        <Form.Item label="查询条件1" {...formItemLayout}>
          {getFieldDecorator('form1', {
            initialValue: form1,
            rules: [
              {
                required: true,
                message: '请输入查询条件1',
              },
            ],
          })(
            <Input
              placeholder="请输入查询条件1"
              style={{ width: '240px' }}
              disabled={isDisable}
            />,
          )}
        </Form.Item>
        <Form.Item label="查询条件2" {...formItemLayout}>
          {getFieldDecorator('form2', {
            initialValue: form2,
            rules: [
              {
                required: true,
                message: '请选择查询条件2',
              },
            ],
          })(
            <Select
              allowClear
              showSearch
              mode="multiple"
              style={{ width: '240px' }}
              placeholder="请选择查询条件2"
              filterOption={filterOption}
              disabled={isDisable}
            >
              {
                multipleSelectList.map(item =>
                  <Select.Option
                    key={item.value}
                    value={`${item.value}`}
                  >
                    { item.label }
                  </Select.Option>
                )
              }
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="查询条件3" {...formItemLayout}>
          {
            getFieldDecorator('form3', {
              initialValue: form3,
              rules: [
                {
                  required: true,
                  message: '请选择查询条件3',
                },
              ],
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '240px' }}
                placeholder="请选择查询条件3"
                filterOption={filterOption}
                disabled={isDisable}
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
    )
  }
}

export default Content;
