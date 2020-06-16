import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Menu, Dropdown } from 'antd';
import { filterOption } from 'ik-utils';
import _cloneDeep from 'lodash/cloneDeep'
import $common from 'utils/common';
import { saveCreateParams } from '../../../model/action'
import $user from 'user';
import { ADD, DETAIL } from '../../../constants/modalTypes';
import styles from './index.less';

const cx = $common.classnames('component-service-create-content', styles);
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const user = $user.get();
const { email } = user;
const { TextArea } = Input;
class Content extends React.Component {
  getAddEnvList = () => {
    const { store } = this.props;
    const {
      createParams: { domain_uris: domainUri = [] },
      envList
    } = store;
    const addEnvList = envList.filter(env => (domainUri.findIndex(x => x.env === env.env) === -1))
    return addEnvList || []
  }

  handleAdd = ({ key }) => {
    const { store: { createParams: { domain_uris: domainUri = [] } }, dispatch } = this.props;
    const newDomainUri = _cloneDeep(domainUri)
    newDomainUri.push({
      env: key,
      is_add: true
    })
    dispatch(saveCreateParams({ domain_uris: newDomainUri }));
  };

  renderAdd = () => {
    const addEnvList = this.getAddEnvList();
    const showAdd = addEnvList && addEnvList.length > 0;
    const menu = (
      <Menu onClick={this.handleAdd}>
        {addEnvList.map((item) => (
          <Menu.Item key={item.env}>{item.name}</Menu.Item>
        ))}
      </Menu>
    );
    return (
      <div className="add">
        {showAdd ? (
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>点击添加环境</a>
          </Dropdown>
        ) : null}
      </div>
    );
  };

  render() {
    const { form, store } = this.props;
    const {
      create: { type },
      createParams: {
        key_uris: keyUris,
        key,
        domain_uris: domainUri,
        contact_person: contact,
        usages,
        domain_ids: domainIds,
        desc,
      },
      table: {
        config: { domains: domainsList = [], usages: usagesList = [] },
      },
    } = store;

    const { getFieldDecorator } = form;

    const isAdd = type === ADD;

    const isDisable = type === DETAIL;

    return (
      <Form onSubmit={this.handleSubmit} className={cx('root')}>
        {isAdd ? (
          <Form.Item label="Key:Uri" {...formItemLayout}>
            {getFieldDecorator('key_uris', {
              initialValue: keyUris,
              rules: [
                {
                  required: true,
                  message: '请输入Key:Uri',
                },
              ],
            })(
              <TextArea
                rows={4}
                placeholder="请输入Key:Uri"
                disabled={isDisable}
              />
            )}
          </Form.Item>
        ) : (
          <div>
            <Form.Item label="key" {...formItemLayout}>
              {getFieldDecorator('key', {
                initialValue: key,
                rules: [
                  {
                    required: true,
                    message: '请输入key',
                  },
                ],
              })(<Input rows={4} placeholder="请输入key" disabled={true} />)}
            </Form.Item>
            {
              domainUri && domainUri.map((item, index) => {
                const { env, domain_id: domainId, uri } = item
                const list = domainsList && domainsList.filter(x => x.env === env)
                return [
                  <Form.Item key={index + 'uri'} label={`${env}环境uri`} {...formItemLayout}>
                    {getFieldDecorator(`domain_uris[${index}].uri`, {
                      initialValue: uri,
                      rules: [
                        {
                          required: true,
                          message: `请输入${env}环境uri`,
                        },
                      ],
                    })(<Input placeholder={`请输入${env}环境uri`} />)}
                  </Form.Item>,
                  <Form.Item key={index + 'domain'} label={`${env}环境域名`} {...formItemLayout}>
                    {getFieldDecorator(`domain_uris[${index}].domain_id`, {
                      initialValue: (domainId && String(domainId)) || undefined,
                      rules: [
                        {
                          required: true,
                          message: `请输入${env}环境域名`,
                        },
                      ],
                    })(
                      <Select
                        allowClear
                        showSearch
                        placeholder="请选择域名"
                        filterOption={filterOption}
                        disabled={isDisable}
                      >
                        {list && list.map((item) => (
                          <Select.Option key={item.key} value={`${item.id}`}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>,
                ];
              })
            }
          </div>
        )}
        {this.renderAdd()}
        <Form.Item label="接口对接人" {...formItemLayout}>
          {getFieldDecorator('contact_person', {
            initialValue: contact || email,
            rules: [
              {
                required: true,
                message: '请输入接口对接人',
              },
            ],
          })(<Input placeholder="请输入接口对接人" disabled={isDisable} />)}
        </Form.Item>
        <Form.Item label="使用方" {...formItemLayout}>
          {getFieldDecorator('usages', {
            initialValue: usages,
            rules: [
              {
                required: true,
                message: '请选择使用方',
              },
            ],
          })(
            <Select
              allowClear
              showSearch
              mode="multiple"
              placeholder="请选择使用方"
              filterOption={filterOption}
              disabled={isDisable}
            >
              {usagesList && usagesList.map((item) => (
                <Select.Option key={item.key} value={`${item.key}`}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {isAdd ? (
          <Form.Item label="域名" {...formItemLayout}>
            {getFieldDecorator('domain_ids', {
              initialValue: domainIds,
              rules: [
                {
                  required: true,
                  message: '请选择域名',
                },
              ],
            })(
              <Select
                allowClear
                showSearch
                mode="multiple"
                placeholder="请选择域名"
                filterOption={filterOption}
                disabled={isDisable}
              >
                {domainsList && domainsList.map((item) => (
                  <Select.Option key={item.key} value={`${item.id}`}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        ) : null}
        <Form.Item label="接口用途" {...formItemLayout}>
          {getFieldDecorator('desc', {
            initialValue: desc,
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
  store: stores.service,
}))(Content);
