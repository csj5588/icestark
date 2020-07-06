/* eslint-disable max-classes-per-file */
import React from 'react';
import { Table, Input, Icon, Select, Form, InputNumber } from 'antd';
import $common from 'utils/common';
import PropTypes from 'prop-types';
import _cloneDeep from 'lodash/cloneDeep';
import {
  SELECT,
  INPUTNUM,
  POST,
  METHOD_LIST,
  CONFIG_ITEM,
} from '../../../../constants/modalTypes';
import styles from './index.less';
const cx = $common.classnames('dispater-create-content-editabletable', styles);
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
const DEFALT_SERVICE_NAME = 'room.live.social'
const DEFALT_URI = '/api'
const DEFALT_READ_TIMEOUT = 200
const DEFALT_DESC = '暂无'

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = (e) => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      const params = {
        ...record,
        ...values,
        // read_timeout: $common.formatStrToNum(values.read_timeout, 200),
      };
      console.log(params)
      handleSave(params);
    });
  };

  renderCell = (form) => {
    this.form = form;
    const { children, dataIndex, record, title, formtype } = this.props;
    const { editing } = this.state;
    return editing ? (
      <div>{this.renderForm(this.props, form)}</div>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  renderForm = (props, form) => {
    const { dataIndex, record, title, formtype, isrequire, list } = props;
    if (!formtype) {
      return (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(dataIndex, {
            rules: [
              {
                required: isrequire,
                message: `${title} is required.`,
              },
            ],
            initialValue: record[dataIndex],
          })(
            <Input
              ref={(node) => (this.input = node)}
              onPressEnter={this.save}
              placeholder={`请输入${dataIndex}`}
              onBlur={this.save}
            />
          )}
        </Form.Item>
      );
    }
    const formItem = {
      [SELECT]: (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(dataIndex, {
            rules: [
              {
                required: true,
                message: `${title} is required.`,
              },
            ],
            initialValue: record[dataIndex],
          })(
            <Select
              style={{ width: '140px' }}
              placeholder={`请选择${dataIndex}`}
              onPressEnter={this.save}
              onBlur={this.save}
              dropdownMatchSelectWidth={false}
            >
              {list && list.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      ),
      [INPUTNUM]: (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(dataIndex, {
            rules: [
              {
                required: true,
                message: `${title} is required.`,
              },
            ],
            initialValue: record[dataIndex],
          })(
            <InputNumber
              min={1}
              precision={0}
              ref={(node) => (this.input = node)}
              onPressEnter={this.save}
              placeholder={`请输入${dataIndex}`}
              onBlur={this.save}
            />
          )}
        </Form.Item>
      ),
    };
    return formItem[formtype];
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  static propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.array,
    count: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    dataSource: [],
    columns: [],
    count: 100,
    onChange: (_) => _,
  };

  constructor(props) {
    super(props);

    this.state = {
      count: props.count || 100,
    };
  }

  handleAdd = () => {
    const { dataSource, onChange } = this.props;
    const { count } = this.state;
    const newData = {
      id: count,
      ...CONFIG_ITEM
    };
    const newDataSource = [...dataSource, newData];
    onChange(newDataSource);
    this.setState({
      count: count + 1,
    });
  };

  handleSave = (row) => {
    const { dataSource, onChange } = this.props;
    const newDataSource = _cloneDeep(dataSource);
    const index = newDataSource.findIndex((item) => row.id === item.id);
    const item = newDataSource[index];
    newDataSource.splice(index, 1, {
      ...item,
      ...row,
    });
    onChange(newDataSource);
  };

  render() {
    const { dataSource, columns: columnsProp } = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = columnsProp.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          isrequire: col.isrequire,
          formtype: col.formtype,
          list: col.list,
          handleSave: this.handleSave,
        }),
      };
    });
    const hasData = dataSource && dataSource.length > 0;
    return (
      <div className={cx('root')}>
        <div className="custom">
          业务方配置
          <Icon onClick={this.handleAdd} className="icon" type="plus-circle" />
          <span className="text">点击添加业务方配置</span>
        </div>
        {hasData ? (
          <Table
            size="small"
            rowKey={record => record.id}
            pagination={false}
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        ) : null}
      </div>
    );
  }
}

export default EditableTable;
