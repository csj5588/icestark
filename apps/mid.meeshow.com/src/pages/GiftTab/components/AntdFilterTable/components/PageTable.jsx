
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Pagination, Popconfirm, Switch } from 'antd'
import CustomTable from '@inkefe/components-custom-table'

import { timeToMoment } from '../constants/timeFormat'
import moment from 'moment';
const pageSizeList = ['10', '20', '30', '40', '50', '100']

export default
class PageTable extends Component {
  static propTypes = {
    tableData: PropTypes.array,
    tableTotal: PropTypes.number,
    searchParams: PropTypes.object,
    handlePageChange: PropTypes.func,
    handleSizeChange: PropTypes.func,
    handleView: PropTypes.func,
    handleEdit: PropTypes.func,
    handleDel: PropTypes.func,
  }

  static defaultProps = {
    tableData: [],
    tableTotal: 0,
    searchParams: {},
    handlePageChange: () => {},
    handleSizeChange: () => {},
    handleView: () => {},
    handleEdit: () => {},
    handleDel: () => {},
  }

  constructor (props) {
    super(props)
    this.state = {}
  }
  // 列表中点击开启或关闭
  handleStateChange =(item, val) => {
    let paramsObj = {
      ...item,
      enable: val ? 1 : 2
    };
    this.props.handleEdit(paramsObj, 'nomodal')
  }

  tableColumns = [
    {
      dataIndex: 'id',
      align: 'center',
      title: 'Tab ID'
    },
    {
      dataIndex: 'name',
      align: 'center',
      title: '名称'
    },
    {
      dataIndex: 'priority',
      align: 'center',
      title: '优先级'
    },
    {
      dataIndex: 'start_time',
      align: 'center',
      width: 130,
      title: '开始启用时间点',
      render: (...args) => {
        const [text, record, index] = args
        return <div>
          {moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      }
    },
    {
      dataIndex: 'end_time',
      align: 'center',
      width: 130,
      title: '失效时间点',
      render: (...args) => {
        const [text, record, index] = args
        return <div>
          {moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      }
    },
    {
      dataIndex: 'create_time',
      align: 'center',
      title: '创建时间',
      render: (...args) => {
        const [text, record, index] = args
        return <div>
          {moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      }
    },
    {
      dataIndex: 'update_time',
      align: 'center',
      title: '更新时间',
      render: (...args) => {
        const [text, record, index] = args
        return <div>
          {moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      }
    },
    {
      dataIndex: 'enable',
      align: 'center',
      title: '是否开启',
      render: (...args) => {
        const [text, record, index] = args
        return <div>
          <Switch checked={ text === 1 } onChange={this.handleStateChange.bind(this, record)}></Switch>
        </div>
      }
    },
    {
      dataIndex: 'operator',
      align: 'center',
      title: '操作人'
    },
    {
      dataIndex: 'operate',
      align: 'center',
      title: '操作',
      width: 240,
      render: (...args) => {
        const [text, record, index] = args

        return <div>
          <Button
            type="primary"
            size="small"
            style={styles.btn}
            onClick={() => { this.handleView(record) }}
            // disabled={this.handleButtonDisabled('VIEW')}
          >
            查看
          </Button>

          <Button
            type="primary"
            size="small"
            style={styles.btn}
            onClick={() => { console.log('点击编辑参数是', record); this.handleEdit(record) }}
            // disabled={this.handleButtonDisabled('MODIFY')}
          >
            编辑
          </Button>
        </div>
      }
    }
  ]

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {

  }

  componentWillUpdate (nextProps, nextState) {

  }

  componentDidUpdate (prevProps, prevState) {

  }

  componentWillUnmount () {

  }

  handleButtonDisabled = key => this.props.routeAuthority.indexOf(this.props.buttonCtrl[key].id) < 0

  handlePageChange = (page, size) => {
    this.props.handlePageChange(page, size)
  }

  handleSizeChange = (page, size) => {
    this.props.handleSizeChange(page, size)
  }

  handleFormData = params => {
    return {
      ...params
    }
  }

  handleView = params => {
    this.props.handleView(this.handleFormData(params))
  }

  handleEdit = params => {
    console.log('jieshoucanshu', params)
    this.props.handleEdit(this.handleFormData(params))
  }

  handleDel = params => {
    this.props.handleDel(params.id)
  }

  render () {
    const {
      searchParams: {
        page,
        size
      },
      tableData,
      tableTotal
    } = this.props

    const {
      tableColumns,
      handlePageChange,
      handleSizeChange
    } = this

    return <div>
      <CustomTable
        rowKey="id"
        highlightColor="#e6fff9"
        dataSource={tableData}
        columns={tableColumns}
        style={styles.table}
        pagination={false}
        bordered
      />

      <Pagination
        total={tableTotal}
        showTotal={total => `共 ${total} 条`}
        current={page}
        defaultCurrent={page}
        pageSize={size}
        pageSizeOptions={pageSizeList}
        showSizeChanger
        onChange={handlePageChange}
        onShowSizeChange={handleSizeChange}
        showQuickJumper
        style={styles.pagination}
      />
    </div>
  }
}

const styles = {
  table: {
    margin: '20px 0',
    wordBreak: 'break-all',
  },
  btn: {
    margin: '0 4px',
    padding: '0 10px',
    height: '28px',
  },
  pagination: {
    textAlign: 'center',
  },
}
