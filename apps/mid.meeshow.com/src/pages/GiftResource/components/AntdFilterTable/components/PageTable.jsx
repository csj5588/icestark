
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Pagination, Popconfirm, Switch } from 'antd'
import CustomTable from '@inkefe/components-custom-table'
import UploadRes from 'components/UploadRes'
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
  handleClick = () => {
    console.log('hahahahhaahh')
  }
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
      title: '资源 ID'
    },
    {
      dataIndex: 'name',
      align: 'center',
      title: '名称'
    },
    {
      dataIndex: 'res_url',
      align: 'center',
      title: '资源地址'
    },
    {
      dataIndex: 'type',
      align: 'center',
      title: '动画类型'
    },
    {
      dataIndex: 'animation_time',
      align: 'center',
      title: '动效播放时间'
    },
    {
      dataIndex: 'chat_url',
      align: 'center',
      title: '聊天图片资源',
      render: (...args) => {
        const [val, record, index] = args
        return val ? <img onClick={this.handleClick} style={styles.smallImg} src={val} alt="chat_url"/> : null
      }
    },
    {
      dataIndex: 'gift_url_3x',
      align: 'center',
      title: '礼物大图资源3x',
      render: (...args) => {
        const [val, record, index] = args
        return <img onClick={this.handleClick} style={styles.smallImg} src={val} alt="gift_url_3x"/>
      }
    },
    {
      dataIndex: 'msg_url_3x',
      align: 'center',
      title: '私聊礼物3X',
      render: (...args) => {
        const [val, record, index] = args
        return val ? <img onClick={this.handleClick} style={styles.smallImg} src={val} alt="chat_url"/> : null
      }
    },
    {
      dataIndex: 'compress',
      align: 'center',
      title: '是否压缩',
      render: (val) => {
        return val === 1 ? '是' : '否'
      }
    },
    {
      dataIndex: 'preload',
      align: 'center',
      title: '是否预加载',
      render: (val) => {
        return val === 1 ? '是' : '否'
      }
    },
    {
      dataIndex: 'operator',
      align: 'center',
      title: '添加人'
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
      width: 80,
      render: (...args) => {
        const [text, record, index] = args

        return <div>
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
    return {
      ...params
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
        showTotal={tableTotal => `共 ${tableTotal} 条`}
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
    height: '60px'
  }
}
