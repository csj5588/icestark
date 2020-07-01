import React from 'react';
import srcConfig from 'src/config';
import { Form, Input, Row, Upload, Button, Icon, message, Select } from 'antd';
import $common from 'utils/common';
import $user from 'src/utils/user';
import { filterOption } from 'ik-utils';
import styles from './index.less';

const domains = [
  {
    id: 107,
    app_key: 'buylive',
    domain: 'testapi.meeshow.com',
    proto: 'http',
    env: 'test',
    usage: 'zt',
    desc: '调中台接口域名',
    item: {
      domain: 'testapi.meeshow.com',
      label: '调中台接口域名',
      env: '中台测试环境',
      update_time: '2020-06-29T19:17:22+08:00',
      operator: 'liyue@inke.cn',
    },
  },
  {
    id: 106,
    app_key: 'buylive',
    domain: 'service.buylivehk.com',
    proto: 'https',
    env: 'online',
    usage: 'bz',
    desc: '线上API接口域名',
    item: {
      domain: 'service.buylivehk.com',
      label: '线上API接口域名',
      env: '香港电商线上环境',
      update_time: '2020-06-23T22:39:40+08:00',
      operator: 'zhangxy1@inke.cn',
    },
  },
  {
    id: 105,
    app_key: 'buylive',
    domain: 'ztapi.9zhenge.com',
    proto: 'https',
    env: 'test',
    usage: 'zt',
    desc: '测试API接口域名',
    item: {
      domain: 'ztapi.9zhenge.com',
      label: '测试API接口域名',
      env: '中台测试环境',
      update_time: '2020-06-23T22:26:17+08:00',
      operator: 'zhangxy1@inke.cn',
    },
  },
  {
    id: 104,
    app_key: 'buylive',
    domain: 'serviceinfo.test.inke.cn',
    proto: 'http',
    env: 'test',
    usage: 'zt',
    desc: '测试长连接配置域名',
    item: {
      domain: 'serviceinfo.test.inke.cn',
      label: '测试长连接配置域名',
      env: '中台测试环境',
      update_time: '2020-06-23T22:26:33+08:00',
      operator: 'zhangxy1@inke.cn',
    },
  },
  {
    id: 103,
    app_key: 'buylive',
    domain: 'ztapi.buylivehk.com',
    proto: 'https',
    env: 'online',
    usage: 'zt',
    desc: '线上API接口域名',
    item: {
      domain: 'ztapi.buylivehk.com',
      label: '线上API接口域名',
      env: '中台线上环境',
      update_time: '2020-06-23T22:26:07+08:00',
      operator: 'zhangxy1@inke.cn',
    },
  },
];

const HTTPS = 'https';

const cx = $common.classnames('buried-create-form-item', styles);
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class index extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    const { cert_public_key_url: publicUrl, cert_private_key_url: privateUrl } =
      data || {};
    const publicFileList = publicUrl
      ? [{ uid: '-1', url: publicUrl, status: 'done', name: publicUrl }]
      : [];
    const privateFileList = privateUrl
      ? [{ uid: '-1', url: privateUrl, status: 'done', name: privateUrl }]
      : [];
    this.state = {
      myAction: `${srcConfig.APIS.root}api_web/v1/controlcenter/private/upload`,
      isShow: !!privateUrl,
      publicFileList,
      privateFileList,
    };
  }

  handleSelect = (val, option) => {
    const {
      props: { proto },
    } = option;
    if (proto.includes(HTTPS)) {
      this.setState({ isShow: true });
      return;
    }
    this.setState({ isShow: false });
  };

  //  上传文件钩子函数
  handleBeforeUpload = (file) => {
    const { appKey } = this.props;
    const { name } = file;
    // 上传文件名
    // 获取 原子擦数／app
    const user = $user.get();
    const params = {
      ...user,
      app_key: appKey,
      filename: name,
    };
    const paramsStr = $common.stringifyParams(params);
    const newUrl = `${srcConfig.APIS.root}api_web/v1/controlcenter/private/upload?${paramsStr}`;
    this.setState({ myAction: newUrl });
  };

  // 上传一个公共文件状态
  handlePublicChange = (info, index) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    this.setState({ publicFileList: fileList });
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      const { form, dispatch } = this.props;
      const { data, error_msg: errorMsg } = info.file.response;
      if (!data) {
        message.error(`上传失败 ${errorMsg}`);
        return;
      }
      form.setFieldsValue({ [`domain_config[${index}].cert_public_key_url`]: data });
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  // 上传一个私有文件状态
  handlePrivateChange = (info, index) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    this.setState({ privateFileList: fileList });
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      const { form, dispatch } = this.props;
      const { data, error_msg: errorMsg } = info.file.response;
      if (!data) {
        message.error(`上传失败 ${errorMsg}`);
        return;
      }
      form.setFieldsValue({ [`domain_config[${index}].cert_private_key_url`]: data });
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  handleDelete = () => {
    this.props.handleDelete();
  };

  render() {
    const { getFieldDecorator, data, isDisable, index, isEdit, appKey } = this.props;
    const { isShow, publicFileList, privateFileList } = this.state;
    const {
      host,
      comment,
      cert_public_key_url: publicUrl,
      cert_private_key_url: privateUrl,
    } = data;
    return (
      <div className={cx('root')}>
        <Form.Item label="埋点域名" {...formItemLayout}>
          {getFieldDecorator(`domain_config[${index}].host`, {
            initialValue: host,
            rules: [
              {
                required: true,
                message: '请输入埋点域名',
              },
            ],
          })(
            <Select
              showSearch
              style={{ width: '240px' }}
              placeholder="请选择域名"
              filterOption={filterOption}
              disabled={isDisable}
              onChange={this.handleSelect}
            >
              {domains &&
                domains.map((item) => (
                  <Select.Option
                    proto={item.proto}
                    key={item.domain}
                    value={`${item.domain}`}
                  >
                    {item.domain}
                  </Select.Option>
                ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="用途" {...formItemLayout}>
          {getFieldDecorator(`domain_config[${index}].comment`, {
            initialValue: comment,
            rules: [
              {
                required: true,
                message: '请输入用途',
              },
            ],
          })(
            <Input
              placeholder="请输入用途"
              style={{ width: '240px' }}
              disabled={isDisable}
            />
          )}
        </Form.Item>
        {isShow ? (
          <div>
            <div style={style.https}>长传https证书上传</div>
            <Form.Item label="公钥证书" {...formItemLayout}>
              {getFieldDecorator(
                `domain_config[${index}].cert_public_key_url`,
                {
                  initialValue: publicUrl,
                  rules: [
                    {
                      required: true,
                      message: '请上传公钥证书',
                    },
                  ],
                }
              )(<Input style={style.none} disabled={isDisable} />)}
              <Row>
                <div>
                  <Upload
                    action={this.state.myAction}
                    name="file"
                    headers={{ 'uberctx-_namespace_appkey_': appKey }}
                    fileList={publicFileList}
                    showUploadList={true}
                    onChange={(info) => this.handlePublicChange(info, index)}
                  >
                    <Button>
                      <Icon type="upload" />
                      点击上传文件
                    </Button>
                  </Upload>
                </div>
              </Row>
            </Form.Item>
            <Form.Item label="私钥证书" {...formItemLayout}>
              {getFieldDecorator(
                `domain_config[${index}].cert_private_key_url`,
                {
                  initialValue: privateUrl,
                  rules: [
                    {
                      required: true,
                      message: '请上传私钥证书',
                    },
                  ],
                }
              )(<Input style={style.none} disabled={isDisable} />)}
              <Row>
                <div>
                  <Upload
                    action={this.state.myAction}
                    name="file"
                    headers={{ 'uberctx-_namespace_appkey_': appKey }}
                    fileList={privateFileList}
                    showUploadList={true}
                    onChange={(info) => this.handlePrivateChange(info, index)}
                  >
                    <Button>
                      <Icon type="upload" />
                      点击上传文件
                    </Button>
                  </Upload>
                </div>
              </Row>
            </Form.Item>
          </div>
        ) : null}
        <Button className="delete" type="danger" onClick={this.handleDelete}>
          删除
        </Button>
      </div>
    );
  }
}

const style = {
  none: {
    display: 'none',
  },
  https: {
    color: 'rgba(0, 0, 0, 0.85)',
    margin: '0 0 20px 20px',
    fontWeight: 'bold',
  },
};

export default index;
