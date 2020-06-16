
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Table, Button, Pagination, Popconfirm } from 'antd'
import CustomTable from 'components/CustomTable'

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
      title: '用户ID',
      fixed: 'left',
      width: 80,
    },
    {
      dataIndex: 'username',
      align: 'center',
      title: '姓名',
      fixed: 'left',
      width: 140
    },
    {
      dataIndex: 'email',
      align: 'center',
      title: '邮箱'
    },
    {
      dataIndex: 'department',
      align: 'center',
      title: '部门'
    },
    {
      dataIndex: 'role_name',
      align: 'center',
      title: '角色名称',
      render: (...args) => {
        const [text, record, index] = args
        const roleNameArr = text ? text.split(',') : []

        return roleNameArr.map((item, index) => <div key={index}>
          <a
            style={{
              color: '#5e8df7',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            href={`/auth/roleMs?name=${item}`}
            rel="noopener noreferrer"
            target="_blank"
          >{ item }</a>
        </div>)
      }
    },
    {
      dataIndex: 'role_type_name',
      align: 'center',
      title: '角色类型',
      render: (...args) => {
        const [text, record, index] = args
        const roleTypeNameArr = text ? text.split(',') : []

        return roleTypeNameArr.map((item, index) => <div key={index}>
          { item }
        </div>)
      }
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
      fixed: 'right',
      width: 100,
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
      username,
      email,
      department,
      role_id: roleId,
      status
    } = params

    return {
      id,
      username,
      email,
      department,
      role_id: roleId ? roleId.split(',') : [],
      status
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
        scroll={{ x: 1600 }}
        needHighlight
        needScrollbar
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
