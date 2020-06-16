
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Pagination, Popconfirm, Switch } from 'antd'
import CustomTable from '@inkefe/components-custom-table'

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
  handleClick = (imgurl) => {
    console.log('hahahahhaahh', imgurl)
    // 父组件显示模态窗
    this.props.showImgModal(imgurl)
  }
  // 列表中点击开启或关闭
  handleStateChange =(item) => {
    let paramsObj = {
      ...item
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
      dataIndex: 'url_2x',
      align: 'center',
      title: '2X角标',
      render: (...args) => {
        const [text, record, index] = args
        return <img onClick={this.handleClick.bind(this, text)} style={styles.smallImg} src={text} alt=""/>
      }
    },
    {
      dataIndex: 'url_3x',
      align: 'center',
      title: '3X角标',
      render: (...args) => {
        const [text, record, index] = args
        return <img onClick={this.handleClick.bind(this, text)} style={styles.smallImg} src={text} alt=""/>
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
      dataIndex: 'operator',
      align: 'center',
      title: '操作人'
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
            onClick={() => { this.handleEdit(record) }}
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
    const {
      id,
      name,
      url_2x: url2x,
      url_3x: url3x,
      enable,
    } = params
    return {
      id,
      name,
      url_2x: url2x,
      url_3x: url3x,
      enable
    }
  }

  handleView = params => {
    this.props.handleView(this.handleFormData(params))
  }

  // 点击编辑
  handleEdit = params => {
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
  smallImg: {
    maxWidth: '100%',
    height: '20px'
  }
}
