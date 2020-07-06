import React from 'react';
import {
  Form,
  Input,
  Select,
  Icon,
} from 'antd';
import { filterOption } from 'ik-utils';
import $user from 'user';
import $common from 'utils/common';
import _cloneDeep from 'lodash/cloneDeep'
import srcConfig from 'src/config';
import { saveCreateParams } from '../../../model/action';
import { DETAIL, DOMAIN_CONFIG, UPDATE } from '../../../constants/modalTypes';
import { selectList } from '../../../constants/selectLists'
import FormItem from './FormItem'
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class Content extends React.Component {
  constructor(props) {
    super(props);
    const { store } = props
    const {
      createParams: {
        service_config: serviceConfig,
      },
    } = store;
    const {
      is_replication: isReplication,
    } = serviceConfig || {};
    this.state = {
      myAction: `${srcConfig.APIS.root}api_web/v1/controlcenter/private/upload`,
      isShow: isReplication,
    };
  }

  handleAdd = () => {
    const { store: { createParams }, dispatch } = this.props
    const { domain_config: domainConfig } = createParams
    const newDomainConfig = _cloneDeep(domainConfig)
    newDomainConfig.push(DOMAIN_CONFIG)
    dispatch(saveCreateParams({ domain_config: newDomainConfig }))
  }

  handleSelect = (val) => {
    this.setState({ isShow: val });
  };

  handleDelete = index => {
    const { store: { createParams }, dispatch } = this.props
    const { domain_config: domainConfig } = createParams
    const newDomainConfig = _cloneDeep(domainConfig)
    newDomainConfig.splice(index, 1)
    dispatch(saveCreateParams({ domain_config: newDomainConfig }))
  }

  render() {
    const { form, store, appKey, curAppItem } = this.props;
    const { isShow } = this.state
    const { appid, name} = curAppItem
    const {
      create: { type },
      createParams: {
        service_config: serviceConfig,
        domain_config: domainConfig
      },
      domainList,
    } = store;
    const {
      app_name: appName,
      comment,
      cv_prefix: cvPrefix,
      is_replication: isReplication,
      replicate_from: replicateFrom,
    } = serviceConfig || {};
    const { getFieldDecorator } = form;
    const isDisable = type === DETAIL;
    const isEdit = type === UPDATE;
    return (
      <Form onSubmit={this.handleSubmit}>
        <div style={style.title}>服务配置</div>
        <Form.Item label="app_name" {...formItemLayout}>
          {getFieldDecorator('service_config.app_name', {
            initialValue: appName || appid,
            rules: [
              {
                required: true,
                message: '请输入app_name',
              },
            ],
          })(
            <Input
              style={{ width: '240px' }}
              placeholder="请输入app_name"
              disabled
            />
          )}
        </Form.Item>
        <Form.Item label="应用名称" {...formItemLayout}>
          {getFieldDecorator('service_config.comment', {
            initialValue: comment || name,
            rules: [
              {
                required: true,
                message: '请输入应用名称',
              },
            ],
          })(
            <Input
              placeholder="请输入应用名称"
              style={{ width: '240px' }}
              disabled
            />
          )}
        </Form.Item>
        <Form.Item label="CV前缀" {...formItemLayout}>
          {getFieldDecorator('service_config.cv_prefix', {
            initialValue: cvPrefix,
            rules: [
              {
                required: true,
                message: '请输入CV前缀',
              },
            ],
          })(
            <Input
              placeholder="请输入CV前缀"
              style={{ width: '240px' }}
              disabled={isDisable}
            />
          )}
        </Form.Item>
        <Form.Item label="是否是马甲包" {...formItemLayout}>
          {getFieldDecorator('service_config.is_replication', {
            initialValue: isReplication,
            rules: [
              {
                required: true,
                message: '请输入CV前缀',
              },
            ],
          })(
            <Select
              allowClear
              showSearch
              style={{ width: '240px' }}
              placeholder="请选择域名"
              filterOption={filterOption}
              disabled={isDisable}
              onChange={this.handleSelect}
            >
              {selectList &&
                selectList.map((item) => (
                  <Select.Option key={item.label} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
            </Select>
          )}
        </Form.Item>
        { isShow && <Form.Item label="马甲包app_name" {...formItemLayout}>
          {getFieldDecorator('service_config.replicate_from', {
            initialValue: replicateFrom,
            rules: [
              {
                required: true,
                message: '请输入马甲包app_name',
              },
            ],
          })(
            <Input
              placeholder="请输入马甲包app_name"
              style={{ width: '240px' }}
              disabled={isDisable}
            />
          )}
        </Form.Item>}
        <div style={style.title}>域名配置
          <Icon
            onClick={this.handleAdd}
            style={style.icon}
            type="plus-circle" />
        </div>
        {
          domainConfig && domainConfig.map((item, index) => (
            <FormItem
              key={index}
              isEdit={isEdit}
              domainList={domainList}
              form={form}
              data={item}
              appKey={appKey}
              getFieldDecorator={getFieldDecorator}
              isDisable={isDisable}
              index={index}
              handleDelete={() => this.handleDelete(index)}
            />
          )
          )
        }
      </Form>
    );
  }
}

const style = {
  none: {
    display: 'none',
  },
  title: {
    color: 'rgba(0, 0, 0, 0.85)',
    margin: '0 0 20px 20px',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  icon: {
    marginLeft: '25px',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default Content;
