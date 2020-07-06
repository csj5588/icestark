import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Input, Select, Icon, Modal } from 'antd';
import { filterOption } from 'ik-utils';
import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';
import $common from 'utils/common';
import EditableTable from './EditableTable';
import FormItem from './FormItem';
import { DETAIL, SELECT, INPUTNUM } from '../../../constants/modalTypes';
import { saveTable, saveEnvList } from '../../../model/action';
import styles from './index.less';

const { confirm } = Modal;
const cx = $common.classnames('dispater-create-content', styles);
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { TextArea } = Input;
class Content extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    const { after_fe: afterFe } = data || {}
    this.state = {
      isShowAfter: !_isEmpty(afterFe),
    };
  }

  handeleChange = (val, index) => {
    // 找到对应的环境配置进行表格处理 改变data数据
    console.log(val, index)
    const {
      dispatch,
      store: { data },
    } = this.props;
    const { detail = [] } = data || {};
    const newDetail = _cloneDeep(detail);
    const item = newDetail[index];
    newDetail.splice(index, 1, {
      ...item,
      before_custom_verify: val,
    });
    dispatch(saveTable({ detail: newDetail }));
  };

  handleDelete = (key, index) => {
    // 找到对应的环境配置进行表格处理 改变data数据
    const {
      dispatch,
      store: { data },
    } = this.props;
    const { detail = [] } = data || {};
    const newDetail = _cloneDeep(detail);
    const item = newDetail[index];
    const { before_custom_verify: beforeCustomVerify } = item;
    beforeCustomVerify.splice(key, 1);
    dispatch(saveTable({ detail: newDetail }));
  };

  handleShow = () => {
    const { isShowAfter } = this.state;
    this.setState({
      isShowAfter: !isShowAfter,
    });
    if (isShowAfter) {
      const { form, index } = this.props;
      const KEY = `detail[${index}].after_fe`;
      form.setFieldsValue({
        [KEY]: {},
      });
    }
  };

  handleDeleteEnv = index => {
    confirm({
      title: '确认删除？',
      onOk: () => {
        const {
          dispatch,
          store: { data, allEnvList },
        } = this.props;
        const { detail } = data || {}
        const newDetail = _cloneDeep(detail)
        newDetail.splice(index, 1)
        const newData = {
          detail: newDetail
        }
        const detailEnvlist = (newDetail && newDetail.map(x => x.env)) || []
        const envListFilter = allEnvList.filter(y => !detailEnvlist.includes(y.env))
        dispatch(saveEnvList(envListFilter))
        dispatch(saveTable(newData))
      },
      onCancel: () => {
        console.log('取消');
      },
    });
  }

  render() {
    const { form, store, title, data, index } = this.props;
    const { isShowAfter } = this.state;
    const { envList, config } = store;
    const {
      before_verify: beforeVerify,
      before_custom_verify: beforeCustomVerify,
      now,
      after_fe: afterFe,
      isAdd,
    } = data;
    const count = beforeCustomVerify && beforeCustomVerify.length;
    const beforeCustomData = beforeCustomVerify && beforeCustomVerify.map((item, index) => ({ id: index, ...item }))
    const { getFieldDecorator } = form;
    return (
      <div className={cx('root')}>
        <div className="item-title">{title}{isAdd && <Icon className="icon" type="minus-circle" onClick={() => this.handleDeleteEnv(index)} />}</div>
        <div className="line" />
        <div className="title">before配置:</div>
        <Form.Item label="配置校验" {...formItemLayout}>
          {getFieldDecorator(`detail[${index}].before_verify`, {
            initialValue: beforeVerify || undefined,
          })(
            <Select
              allowClear
              showSearch
              mode="multiple"
              placeholder="请选择配置校验"
              filterOption={filterOption}
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
            dataSource={beforeCustomData || []}
            count={count}
            handleDelete={val => this.handleDelete(val, index)}
            onChange={(val) => this.handeleChange(val, index)}
          />
        </div>
        <div className="line mt10 ml20" />
        <div className="title">now配置:</div>
        <FormItem
          form={form}
          value={now || {}}
          required={true}
          label={`detail[${index}].now`}
        />
        <div className="line ml20" />
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
          <FormItem
            form={form}
            value={afterFe || {}}
            required={true}
            label={`detail[${index}].after_fe`}
          />
        ) : null}
      </div>
    );
  }
}

export default compose(
  connect((stores) => ({
    store: stores.dispatcherDetail,
    curApp: stores.stark.authApp.curApp
  }))
)(Content);
