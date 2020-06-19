
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Table, Button, Pagination, Popconfirm } from 'antd'
import CustomTable from '@/components/CustomTable'

const pageSizeList = ['10', '20', '30', '40', '50', '100']

export default
@Form.create()
class PageTable extends Component {
  static propTypes = {
    tableData: PropTypes.array,
    tableTotal: PropTypes.number,
    searchParams: PropTypes.object,
    handlePageChange: PropTypes.func,
    handleSizeChange: PropTypes.func,
    handleEdit: PropTypes.func,
  }

  static defaultProps = {
    tableData: [],
    tableTotal: 0,
    searchParams: {},
    handlePageChange: () => {},
    handleSizeChange: () => {},
    handleEdit: () => {},
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  tableColumns = [
    {
      dataIndex: 'id',
      align: 'center',
      title: '角色ID'
    },
    {
      dataIndex: 'name',
      align: 'center',
      title: '角色名称'
    },
    {
      dataIndex: 'role_type_name',
      align: 'center',
      title: '角色类型'
    },
    {
      dataIndex: 'status_show',
      align: 'center',
      title: '状态'
    },
    {
      dataIndex: 'operator',
      align: 'center',
      title: '操作人'
    },
    {
      dataIndex: 'utime',
      align: 'center',
      title: '操作时间'
    },
    {
      dataIndex: 'operate',
      align: 'center',
      title: '操作',
      render: (...args) => {
        const [text, record, index] = args

        return <div>
          <Button
            type="primary"
            size="small"
            style={styles.btn}
            onClick={() => { this.handleEdit(record) }}
            disabled={this.handleButtonDisabled('MODIFY')}
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
      type_id: typeId,
      status,
      data_power: dataPower
    } = params

    return {
      id,
      name,
      type_id: typeId,
      status,
      data_power: dataPower
    }
  }

  handleEdit = params => {
    this.props.handleEdit(this.handleFormData(params))
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
        pagination={false}
        dataSource={tableData}
        columns={tableColumns}
        style={styles.table}
        needHighlight
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
