import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import { stringify } from 'qs';
import $user from 'user'
import { timeFormat, timeToMoment } from '../../../../constants/timeFormat'
import UploadRes from 'components/UploadRes'

const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}
class Content extends React.Component {
  setAtomToParams = () => {
    const { curApp } = this.props
    const user = $user.get()
    const { user_id: userId, system_id: systemId, username, email, department } = user
    const params = {
      user_id: userId,
      system_id: systemId,
      username,
      email,
      department,
      ticket: $user.getToken(),
      app_key: curApp,
      opt: 'product_img',
    }
    const url = `/api_web/v1/controlcenter/resource/upload?${stringify(params)}`;
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
        <Form.Item label="产品图标" {...formItemLayout} extra="">
          {getFieldDecorator('icon', {
            initialValue: icon || '',
            rules: []
          })(
            <UploadRes
              fileExt = {['jpg', 'jpeg', 'png']}
              maxCount = {1}
              limitSize = {5}
              headers={{ 'uberctx-_namespace_appkey_': 'demo' }}
              responseDataUrlName = "download_url"
              action={this.setAtomToParams}
              previewStyle = {{ width: '100px', height: '90px' }}
              isDisabled = {isDisable}
            />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default Content;
