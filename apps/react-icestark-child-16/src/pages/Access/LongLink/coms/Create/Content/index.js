import React from 'react';
import { Form, Input, Select, Popconfirm } from 'antd';
import { filterOption } from 'ik-utils';
import _cloneDeep from 'lodash/cloneDeep';
import Ellipsis from 'components/Ellipsis';
import $common from 'utils/common';
import {
  DETAIL,
  UPDATE,
  SELECT,
  INPUTNUM,
} from '../../../constants/modalTypes';
import { saveCreateParams } from '../../../model/action';
import EditableTable from './EditableTable';
import styles from './index.less';

const cx = $common.classnames('long-link-create-content', styles);
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
class Content extends React.Component {
  columns = [
    {
      title: '事件名',
      dataIndex: 'ev',
      editable: true,
      isrequire: 1,
      render: (text) => (
        <Ellipsis key="service_name" width={120}>
          {text}
        </Ellipsis>
      ),
    },
    {
      title: '转发URI',
      dataIndex: 'uri',
      editable: true,
      isrequire: 1,
      render: (text) => (
        <Ellipsis key="uri" width={120}>
          {text}
        </Ellipsis>
      ),
    },
    {
      title: '业务方集群',
      dataIndex: 'dc',
      editable: true,
      formtype: SELECT,
      isrequire: 1,
      render: (text) => (
        <Ellipsis key="dc" width={80}>
          {text}
        </Ellipsis>
      ),
    },
    {
      title: '服务发现名',
      dataIndex: 'service_name',
      editable: true,
      isrequire: 1,
      render: (text) => (
        <Ellipsis key="service_name" width={100}>
          {text}
        </Ellipsis>
      ),
    },
    {
      title: '超时时长(ms)',
      dataIndex: 'read_timeout',
      editable: true,
      isrequire: 1,
      formtype: INPUTNUM,
      render: (text) => (
        <Ellipsis key="read_timeout" width={80}>
          {text}
        </Ellipsis>
      ),
    },
    {
      title: 'endpoints',
      dataIndex: 'endpoints',
      isrequire: 0,
      editable: true,
      render: (text) => (
        <Ellipsis key="endpoints" width={100}>
          {text}
        </Ellipsis>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 90,
      render: (text, record, index) => {
        const showDelete = index !== 0;
        return (
          <div>
            {showDelete ? (
              <Popconfirm
                title="确定删除吗?"
                onConfirm={() => this.handleDelete(index)}
              >
                <span className="delete-text">删除</span>
              </Popconfirm>
            ) : null}
          </div>
        );
      },
    },
  ];

  handeleChange = (value) => {
    const { dispatch } = this.props;
    dispatch(saveCreateParams({ buz_config: value }));
  };

  handleDelete = (key) => {
    const { store, dispatch } = this.props;
    const {
      createParams: { buz_config: buzConfig },
    } = store;
    const newDataSource = _cloneDeep(buzConfig);
    newDataSource.splice(key, 1);
    dispatch(saveCreateParams({ buz_config: newDataSource }));
  };

  render() {
    const { form, store } = this.props;
    const {
      create: { type },
      createParams: { usage_cluster: usageCluster, buz_config: buzConfig },
      configList,
    } = store;
    const { getFieldDecorator } = form;

    const isDisable = type === DETAIL;

    const isEdit = type === UPDATE;

    const count = (buzConfig && buzConfig.length) || 0;

    return (
      <Form onSubmit={this.handleSubmit} className={cx('root')}>
        <Form.Item label="长链接集群" {...formItemLayout}>
          {getFieldDecorator('usage_cluster', {
            initialValue: usageCluster,
            rules: [
              {
                required: true,
                message: '请选择长链接集群',
              },
            ],
          })(
            <Select
              showSearch
              style={{ width: '440px' }}
              placeholder="请选择长链接集群"
              filterOption={filterOption}
              disabled={isDisable || isEdit}
            >
              {configList &&
                configList.map((item) => (
                  <Select.Option key={item} value={`${item}`}>
                    {item}
                  </Select.Option>
                ))}
            </Select>
          )}
        </Form.Item>
        <div className="edit-table">
          <EditableTable
            dataSource={buzConfig}
            columns={this.columns}
            count={count}
            configList={configList}
            onChange={this.handeleChange}
          />
        </div>
      </Form>
    );
  }
}

export default Content;
