
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

  state = {
    giftSetting: {}
  }

  constructor (props) {
    super(props)
    this.state = {
      giftSetting: props.giftSetting
    }
  }
  handleClick = (imgurl) => {
    // 父组件显示模态窗
    this.props.showImgModal(imgurl)
  }
  // 列表中点击开启或关闭
  handleStateChange =(item) => {
    this.props.handleEdit(item, 'nomodal')
  }

  tableColumns = [
    {
      dataIndex: 'id',
      align: 'center',
      title: '礼物ID',
      width: 80
    },
    {
      dataIndex: 'name',
      align: 'center',
      title: '名称',
      width: 120
    },
    {
      dataIndex: 'resource',
      align: 'center',
      width: 130,
      title: '礼物图片2x',
      render: (...args) => {
        const [text, record, index] = args
        return <img onClick={this.handleClick.bind(this, text.gift_url_2x)}
          style={styles.smallImg} src={text.gift_url_2x} alt=""/>
      }
    },
    {
      dataIndex: 'gift_type',
      align: 'center',
      title: '类型',
      width: 120,
      render: (...args) => {
        const [text, record, index] = args
        const { giftSetting: { gift_type_enum: options } } = this.state;
        let one = options && options.find(item => item.value === text)
        return one ? one.name : ''
      }
    },
    {
      dataIndex: 'currency_num',
      align: 'center',
      title: '价格',
      width: 100,
      render: (...args) => {
        const [text, record, index] = args
        const { giftSetting: { currency_settings: options } } = this.state;
        let one = options && options.filter(item => item.currency_key === record.currency_type)[0];
        return text + (one ? one.currency_name : '')
      }
    },
    {
      dataIndex: 'exp',
      align: 'center',
      width: 100,
      title: '送礼人获得'
    },
    {
      dataIndex: 'income',
      align: 'center',
      width: 100,
      title: '收礼人获得'
    },
    {
      dataIndex: 'start_time',
      align: 'center',
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
      title: '失效时间点',
      render: (...args) => {
        const [text, record, index] = args
        return <div>
          {moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      }
    },
    {
      dataIndex: 'icons',
      align: 'center',
      width: 120,
      title: '角标图片',
      render: (...args) => {
        const [text, record, index] = args
        if (!text) {
          return null
        }
        return <img onClick={this.handleClick.bind(this, text[0].url_2x)} src={text[0].url_2x}
          style={{ height: '16px' }} alt=""/>
      }
    },

    {
      dataIndex: 'create_time',
      align: 'center',
      // width: 130,
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
      // width: 130,
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
      title: '操作人',
      width: 100
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
      fixed: 'right',
      width: 180,
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
    if (this.state.giftSetting !== nextProps.giftSetting) {
      this.setState({ giftSetting: nextProps.giftSetting })
    }
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
  handleView = params => {
    this.props.handleView(params)
  }

  // 点击编辑
  handleEdit = params => {
    this.props.handleEdit(params)
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
        needScrollbar
        scroll={{ x: 1900 }}
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
    height: '40px'
  }
}
