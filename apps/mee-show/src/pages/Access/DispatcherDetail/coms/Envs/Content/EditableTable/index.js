import React from 'react';
import { Table, Input, Icon, Select, Form, InputNumber, Popconfirm } from 'antd';
import $common from 'utils/common';
import PropTypes from 'prop-types';
import Ellipsis from 'components/Ellipsis';
import _cloneDeep from 'lodash/cloneDeep';
import {
  SELECT,
  INPUTNUM,
  POST,
  METHOD_LIST,
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
        read_timeout: $common.formatStrToNum(values.read_timeout, 200),
      };
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
    const { dataIndex, record, title, formtype } = props;
    if (!formtype) {
      return (
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
              style={{ width: '80px' }}
              placeholder="请选择method"
              onPressEnter={this.save}
              onBlur={this.save}
              dropdownMatchSelectWidth={false}
            >
              {METHOD_LIST.map((item) => (
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
    count: 10,
    onChange: (_) => _,
  };

  constructor(props) {
    super(props);

    this.state = {
      count: props.count || 100,
    };
  }

  columns = [
    {
      title: '服务发现名',
      dataIndex: 'service_name',
      editable: true,
      render: text => (<Ellipsis key="service_name" width={120}>{text}</Ellipsis>)
    },
    {
      title: 'uri',
      dataIndex: 'uri',
      editable: true,
      render: text => (<Ellipsis key="uri" width={120}>{text}</Ellipsis>)
    },
    {
      title: 'method',
      dataIndex: 'method',
      editable: true,
      formtype: SELECT,
      width: 90,
      render: text => (<Ellipsis key="desc" width={80}>{text}</Ellipsis>)
    },
    {
      title: '超时时间(ms)',
      dataIndex: 'read_timeout',
      editable: true,
      formtype: INPUTNUM,
      width: 110,
      render: text => (<Ellipsis key="read_timeout" width={90}>{text}</Ellipsis>)
    },
    {
      title: '使用说明',
      dataIndex: 'desc',
      editable: true,
      render: text => (<Ellipsis key="desc" width={120}>{text}</Ellipsis>)
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 60,
      fixed: 'right',
      render: (text, record, index) => {
        const { handleDelete } = this.props
        return (
          <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(index)}>
            <span className="delete-text">删除</span>
          </Popconfirm>
        )
      }
    },
  ];

  handleAdd = () => {
    const { dataSource, onChange } = this.props;
    const { count } = this.state;
    const newData = {
      id: count,
      service_name: DEFALT_SERVICE_NAME,
      uri: DEFALT_URI,
      method: POST,
      read_timeout: DEFALT_READ_TIMEOUT,
      desc: DEFALT_DESC,
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
    const { dataSource } = this.props;
    const { columns: columnsProp } = this
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
          formtype: col.formtype,
          handleSave: this.handleSave,
        }),
      };
    });
    const hasData = dataSource && dataSource.length > 0;
    return (
      <div className={cx('root')}>
        <div className="custom">
          自定义校验
          <Icon onClick={this.handleAdd} className="icon" type="plus-circle" />
          <span className="text">点击添加自定义校验</span>
        </div>
        {hasData ? (
          <Table
            size="small"
            rowKey={record => record.id}
            scroll={{ x: 700 }}
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
