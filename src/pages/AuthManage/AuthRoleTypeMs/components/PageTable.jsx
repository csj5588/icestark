
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Table, Button, Pagination, Popconfirm } from 'antd'
import CustomTable from '@/components/CustomTable'

export default
@Form.create()
class PageTable extends Component {
  static propTypes = {
    tableData: PropTypes.array,
  }

  static defaultProps = {
    tableData: [],
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  tableColumns = [
    {
      dataIndex: 'id',
      align: 'center',
      title: '角色类型ID'
    },
    {
      dataIndex: 'type_name',
      align: 'center',
      title: '角色类型名称'
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

  render () {
    const {
      tableData
    } = this.props

    const {
      tableColumns
    } = this

    return <div>
      <CustomTable
        rowKey="id"
        pagination={false}
        dataSource={tableData}
        columns={tableColumns}
        style={styles.table}
        needHighlight
        needScrollbar
        bordered
      />
    </div>
  }
}

const styles = {
  table: {
    margin: '20px 0 0',
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
