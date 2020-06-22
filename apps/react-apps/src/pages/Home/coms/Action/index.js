import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Select, Input, Form, DatePicker } from 'antd';
import $common from 'utils/common';
import { filterOption } from 'ik-utils'
import { saveCreate, getTableList } from './../../model/action';
import { ADD } from './../../constants/modalTypes';
import { selectList, multipleSelectList } from '../../constants/selectLists';
import { timeFormat, timeToMomentArray, momentToTimeArray } from '../../constants/timeFormat';
import styles from './index.less';

const cx = $common.classnames('action', styles);
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

class Action extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const { date, search2 } = values;
        const [startDate, endDate] = momentToTimeArray(date);
        const params = {
          ...values,
          start_date: startDate,
          end_date: endDate,
          search2: search2.join(),
        }
        delete params.date;
        dispatch(getTableList(params));
      }
    });
  };

  handelCreate = () => {
    const { dispatch } = this.props;
    dispatch(saveCreate({ show: true, title: '新增', type: ADD }));
  }

  render () {
    const { form, store } = this.props;
    const {
      searchParams: {
        uid,
        start_date: start,
        end_date: end,
        search1,
        search2,
        search3,
      }
    } = store;
    const { getFieldDecorator } = form;
    return (
      <div className={cx('root')}>
        <Form layout="inline">
          <Form.Item label="UID">
            {getFieldDecorator('uid', {
              initialValue: uid,
            })(
              <Input
                style={{ width: '240px' }}
                placeholder="请输入uid"
              />,
            )}
          </Form.Item>
          <Form.Item label="日期">
            {getFieldDecorator('date', {
              initialValue: timeToMomentArray(start, end),
            })(
              <DatePicker.RangePicker
                format={timeFormat}
                style={{ width: '240px' }}
              />,
            )}
          </Form.Item>
          <Form.Item label="查询条件1">
            {getFieldDecorator('search1', {
              initialValue: search1,
            })(
              <Input
                placeholder="请输入查询条件1"
                style={{ width: '200px' }}
              />,
            )}
          </Form.Item>
          <Form.Item label="查询条件2">
            {getFieldDecorator('search2', {
              initialValue: search2,
            })(
              <Select
                allowClear
                showSearch
                mode="multiple"
                style={{ width: '200px' }}
                placeholder="请选择查询条件2"
                filterOption={filterOption}
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
          <Form.Item label="查询条件3">
            {
              getFieldDecorator('search3', {
                initialValue: search3,
              })(
                <Select
                  allowClear
                  showSearch
                  style={{ width: '200px' }}
                  placeholder="请选择查询条件3"
                  filterOption={filterOption}
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
        <div className="operate">
          <Button
            type="primary"
            onClick={this.handleSubmit}
          >
            查询
          </Button>
          <Button
            type="primary"
            className="ml10"
            onClick={this.handelCreate}
          >
            新增
          </Button>
        </div>
      </div>
    )
  }
}

export default compose(
  connect(stores => ({
    store: stores.materials,
  })),
  Form.create(),
)(Action);
