import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Radio, Popconfirm, Icon } from 'antd';
import { filterOption } from 'ik-utils';
import _cloneDeep from 'lodash/cloneDeep';
import Ellipsis from 'components/Ellipsis';
import $common from 'utils/common';
import EditableTable from './EditableTable';
import FormItem from './FormItem';
import {
  DETAIL,
  SELECT,
  INPUTNUM,
  REQ_METHOD,
} from '../../../constants/modalTypes';
import { saveCreateParams } from '../../../model/action';
import styles from './index.less';

const cx = $common.classnames('dispater-create-content', styles);
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const HTTP = 'http'
const LONG = 'persistent_connection' // 长链接
const LABEL_OBJ = {
  ev_name: '示例: c.jr',
  URI: '示例：/api/test'
}

const { TextArea } = Input;
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAfter: false,
      label: 'ev_name'
    };
  }

  columns = [
    {
      title: '服务发现名',
      dataIndex: 'service_name',
      editable: true,
      render: (text) => (
        <Ellipsis key="service_name" width={120}>
          {text}
        </Ellipsis>
      ),
    },
    {
      title: 'uri',
      dataIndex: 'uri',
      editable: true,
      render: (text) => (
        <Ellipsis key="uri" width={100}>
          {text}
        </Ellipsis>
      ),
    },
    {
      title: 'method',
      dataIndex: 'method',
      editable: true,
      formtype: SELECT,
      render: (text) => (
        <Ellipsis key="desc" width={80}>
          {text}
        </Ellipsis>
      ),
    },
    {
      title: '超时时间(ms)',
      dataIndex: 'read_timeout',
      editable: true,
      formtype: INPUTNUM,
      render: (text) => (
        <Ellipsis key="read_timeout" width={80}>
          {text}
        </Ellipsis>
      ),
    },
    {
      title: '使用说明',
      dataIndex: 'desc',
      editable: true,
      render: (text) => (
        <Ellipsis key="desc" width={100}>
          {text}
        </Ellipsis>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 90,
      render: (text, record, index) => (
        <Popconfirm
          title="确定删除吗?"
          onConfirm={() => this.handleDelete(index)}
        >
          <span className="delete-text">删除</span>
        </Popconfirm>
      ),
    },
  ];

  handeleChange = (val) => {
    const { dispatch } = this.props;
    dispatch(saveCreateParams({ before_custom_verify: val }));
  };

  handleDelete = (key) => {
    const { store, dispatch } = this.props;
    const {
      createParams: { before_custom_verify: beforeCustomVerify },
    } = store;
    const newDataSource = _cloneDeep(beforeCustomVerify);
    newDataSource.splice(key, 1);
    dispatch(saveCreateParams({ before_custom_verify: newDataSource }));
  };

  handleShow = () => {
    const { isShowAfter } = this.state;
    this.setState({
      isShowAfter: !isShowAfter,
    });
    if (isShowAfter) {
      const { form } = this.props;
      form.setFieldsValue({
        after_fe: {},
      });
    }
  };

  handleGroupChange = e => {
    const value = e.target.value
    if (value === HTTP) {
      this.setState({
        label: 'URI'
      })
    } else {
      this.setState({
        label: 'ev_name'
      })
    }
    const { form } = this.props
  }

  render() {
    const { form, store } = this.props;
    const { isShowAfter, label } = this.state;
    const {
      create: { type },
      createParams: {
        ev_type: evType,
        ev_name: evName,
        ev_desc: evDesc,
        env,
        before_verify: beforeVerify,
        before_custom_verify: beforeCustomVerify,
        now,
        after_fe: afterFe,
      },
      envList,
      config,
    } = store;
    const count = beforeCustomVerify && beforeCustomVerify.length;
    const { getFieldDecorator } = form;

    const isDisable = type === DETAIL;

    return (
      <Form onSubmit={this.handleSubmit} className={cx('root')}>
        <Form.Item label="请求方式" {...formItemLayout}>
          {getFieldDecorator('ev_type', {
            initialValue: evType,
            rules: [
              {
                required: true,
                message: '请选择请求方式',
              },
            ],
          })(
            <Radio.Group onChange={this.handleGroupChange} >
              <Radio value="persistent_connection">长链接</Radio>
              <Radio value="http">http</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label={label} {...formItemLayout}>
          {getFieldDecorator('ev_name', {
            initialValue: evName,
            rules: [
              {
                required: true,
                message: `请输入${label}`,
              },
            ],
          })(<Input placeholder={`${LABEL_OBJ[label]}`} disabled={isDisable} />)}
        </Form.Item>
        <div className="line"></div>
        <div className="title">before配置:</div>
        <Form.Item label="配置校验" {...formItemLayout}>
          {getFieldDecorator('before_verify', {
            initialValue: beforeVerify,
          })(
            <Select
              allowClear
              showSearch
              mode="multiple"
              placeholder="请选择配置校验"
              filterOption={filterOption}
              disabled={isDisable}
            >
              {config.map((item) => (
                <Select.Option key={item.key} value={item.key}>
                  {item.show}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <div className="edit-table">
          <EditableTable
            dataSource={beforeCustomVerify}
            columns={this.columns}
            count={count}
            onChange={this.handeleChange}
          />
        </div>
        <div className="line mt10"></div>
        <div className="title">now配置:</div>
        <FormItem form={form} required={true} label="now" />
        <div className="line"></div>
        <div className="title after">
          after配置:
          <Icon
            onClick={this.handleShow}
            className="icon"
            type={!isShowAfter ? 'plus-circle' : 'minus-circle'}
          />
          <span className="text">{`点击${
            !isShowAfter ? '新增' : '删除'
          }after配置`}</span>
        </div>
        {isShowAfter ? (
          <FormItem form={form} required={true} label="after_fe" />
        ) : null}
        <div className="line mb10"></div>
        <Form.Item label="环境" {...formItemLayout}>
          {getFieldDecorator('env', {
            initialValue: env,
            rules: [
              {
                required: true,
                message: '请选择环境',
              },
            ],
          })(
            <Select
              allowClear
              showSearch
              mode="multiple"
              placeholder="请选择环境"
              filterOption={filterOption}
              disabled={isDisable}
            >
              {envList.map((item) => (
                <Select.Option key={item.env} value={item.env}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="事件说明" {...formItemLayout}>
          {getFieldDecorator('ev_desc', {
            initialValue: evDesc,
            rules: [
              {
                required: true,
                message: '请输入接口用途',
              },
            ],
          })(<TextArea rows={2} />)}
        </Form.Item>
      </Form>
    );
  }
}

export default connect((stores) => ({
  store: stores.dispatcher,
}))(Content);
