import React from 'react';
import { Form, Input, message, DatePicker } from 'antd';
import $user from 'user'
import UploadRes from 'components/UploadRes'
import { timeFormat, timeToMoment } from '../../constants/timeFormat'


const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}
class Content extends React.Component {
  setAtomToParams = () => {
    const { domain } = this.props
    const { proto, domain: domainData } = domain || {}
    if(!domainData) return
    const url = `${proto}://${domainData}/upload/image`
    return url
  }

  render () {
    const { form, store } = this.props;
    const {
      createPro: {
        type,
      },
      createProParams: {
        app_name: appName,
        website,
        launch_date: date,
        app_key: key,
        contact_person: contact,
        desc,
        icon,
      }
    } = store;
    const { getFieldDecorator } = form;

    const isDisable = type === 'detail';

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="产品名称" {...formItemLayout}>
          {getFieldDecorator('app_name', {
            initialValue: appName,
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
        <Form.Item label="官网" {...formItemLayout}>
          {getFieldDecorator('website', {
            initialValue: website,
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
        <Form.Item label="app_key" {...formItemLayout}>
          {getFieldDecorator('app_key', {
            initialValue: key,
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
        <Form.Item label="产品对接人" {...formItemLayout}>
          {getFieldDecorator('contact_person', {
            initialValue: contact,
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
        <Form.Item label="上线日期" {...formItemLayout}>
          {getFieldDecorator('launch_date', {
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
            />,
          )}
        </Form.Item>
        <Form.Item label="产品简介" {...formItemLayout}>
          {getFieldDecorator('desc', {
            initialValue: desc,
            rules: [
              {
                required: true,
                message: '请选择日期',
              },
            ],
          })(
            <TextArea
              rows={3}
            />,
          )}
        </Form.Item>
        { this.setAtomToParams() ? <Form.Item label="产品图标" {...formItemLayout} extra="">
          {getFieldDecorator('icon', {
            initialValue: icon || '',
            rules: []
          })(
            <UploadRes
              fileExt = {['jpg', 'jpeg', 'png']}
              maxCount = {1}
              limitSize = {5}
              responseDataUrlName="result.url"
              beforeUpload={this.handleBeforeUpload}
              action={this.setAtomToParams()}
              previewStyle = {{ width: '100px', height: '90px' }}
              isDisabled = {isDisable}
            />
          )}
        </Form.Item>: null }
      </Form>
    )
  }
}

export default Content;
