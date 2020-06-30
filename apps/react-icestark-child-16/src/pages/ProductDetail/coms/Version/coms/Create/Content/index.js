import React from 'react';
import { Form, Input, message, Radio, Row, Col, Upload, Button, Icon } from 'antd';
import { filterOption } from 'ik-utils'
import $user from 'user'
import $common from 'utils/common';
import srcConfig from 'src/config'
import { saveCreateParams } from '../../../model/action'
import { DETAIL, AUTO, MANUAL, UPDATE } from '../../../constants/modalTypes'
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

// 获取文件后缀名
const extname = filename => {
  if (!filename || typeof filename !== 'string') {
    return false
  }
  const a = filename.split('').reverse().join('');
  const b = a.substring(0, a.search(/\./)).split('').reverse().join('');
  return b
}
class Content extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      myAction: `${srcConfig.APIS.root}api_web/v1/controlcenter/business/app/version/upload`,
      radioStatus: ''
    }
  }

  uploadRef = null

  onChange = e => {
    const { form, dispatch } = this.props
    dispatch(saveCreateParams({ qrcode_url: '', download_url: '' }))
    this.setState({ radioStatus: e.target.value })
    form.setFieldsValue({ download_url: '' })
  }

  //  上传文件钩子函数
  handleBeforeUpload = file => {
    const { appKey } = this.props
    const { name } = file
    // 上传文件名
    // 获取 原子擦数／app
    const user = $user.get()
    const params = {
      ...user,
      app_key: appKey,
      filename: name,
    }
    const paramsStr = $common.stringifyParams(params)
    const newUrl = `${srcConfig.APIS.root}api_web/v1/controlcenter/business/app/version/upload?${paramsStr}`
    this.setState({ myAction: newUrl })
  }

  // 上传一个文件状态
  handleChange = info => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      const { form, dispatch } = this.props
      const { data, error_msg: errorMsg } = info.file.response
      if (!data) {
        message.error(`上传失败 ${errorMsg}`)
        return
      }
      const { qrcode_url: qrcodeUrl, download_url: downloadUrl } = data || {}
      form.setFieldsValue({ download_url: downloadUrl })
      dispatch(saveCreateParams({ qrcode_url: qrcodeUrl, download_url: downloadUrl }))
      message.success(`${info.file.name} 上传成功`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`)
    }
  };

  handleText = e => {
    const { form, dispatch } = this.props;
    form.setFieldsValue({ download_url: e.target.value })
    dispatch(saveCreateParams({ download_url: e.target.value }))
  }

  render () {
    const { radioStatus } = this.state
    const { form, store, appKey } = this.props;
    const {
      create: {
        type,
      },
      createParams: {
        cv,
        desc,
        download_url: downloadUrl,
        qrcode_url: qrcodeUrl,
      }
    } = store;
    const { getFieldDecorator } = form;
    const isDisable = type === DETAIL;
    const isEdit = type === UPDATE;
    const radioValue = radioStatus || (isEdit ? (qrcodeUrl ? AUTO : MANUAL) : AUTO)
    const isManual = radioValue === MANUAL
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="版本号" {...formItemLayout}>
          {getFieldDecorator('cv', {
            initialValue: cv,
            rules: [
              {
                required: true,
                message: '请输入版本号',
              },
              {
                pattern: /^[a-zA-Z]+\d+(\.\d+)+_[a-zA-Z]+$/,
                message: '版本号由产品缩写+数字版本号+下划线+系统名称组成',
              },
            ],
          })(
            <Input
              style={{ width: '240px' }}
              placeholder="请输入版本号"
              disabled={isDisable}
            />,
          )}
        </Form.Item>
        <Form.Item label="版本ChangeLog" {...formItemLayout}>
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
              style={style.text}
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled={isDisable}
            />,
          )}
        </Form.Item>
        <Form.Item label="选择下载方式" {...formItemLayout}>
          {getFieldDecorator('download_url', {
            initialValue: downloadUrl,
            rules: [
              {
                required: true,
                message: '请提供有效下载方式',
              },
            ],
          })(
            <Input
              style={style.none}
              disabled={isDisable}
            />
          )}
          <Row>
            <Radio.Group onChange={this.onChange} value={radioValue}>
              <Row type="flex" justify="start" align="top">
                <Col>
                  <Radio style={style.radioStyle} value={AUTO} />
                </Col>
                <Col>
                  <div>
                    {!qrcodeUrl ? (<Upload
                      disabled={radioValue === MANUAL}
                      ref={upload => { this.uploadRef = upload }}
                      action={this.state.myAction}
                      headers={{
                        'uberctx-_namespace_appkey_': appKey
                      }}
                      name="file"
                      showUploadList={true}
                      beforeUpload={this.handleBeforeUpload}
                      onChange={this.handleChange}
                    >
                      <Button>
                        <Icon type="upload" />点击上传文件
                      </Button>
                    </Upload>) : (
                      <div style={style.auto}>
                        <div>下载二维码</div>
                        <img style={style.img} src={qrcodeUrl || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} alt=""/>
                        <a href={downloadUrl}>{downloadUrl}</a>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              <Radio style={style.manual} value={MANUAL} >手动添加地址</Radio>

              {isManual ? <TextArea
                placeholder="请输入下载地址"
                style={style.text}
                value={downloadUrl}
                autoSize={{ minRows: 3, maxRows: 5 }}
                disabled={radioValue === AUTO}
                onChange={this.handleText}
              /> : null}
            </Radio.Group>
          </Row>
        </Form.Item>
      </Form>
    )
  }
}

const style = {
  none: {
    display: 'none'
  },
  radioStyle: {
    display: 'block'
  },
  auto: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  text: {
    width: '340px'
  },
  manual: {
    display: 'block',
    margin: '20px 0'
  },
  img: {
    width: '200px',
    height: '200px',
  }
}

export default Content;
