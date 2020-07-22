import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, Col, Row } from 'antd'
import { filterOption } from 'ik-utils'

import { selectList } from '../constants/selectLists'

export default
@Form.create()
class PageFilter extends Component {
  static propTypes = {
    searchParams: PropTypes.object,
    roleList: PropTypes.array,
    roleTypeList: PropTypes.array,
    handleSearch: PropTypes.func,
    handleAdd: PropTypes.func,
  }

  static defaultProps = {
    searchParams: {},
    roleList: [],
    roleTypeList: [],
    handleSearch: () => {},
    handleAdd: () => {},
  }

  constructor (props) {
    super(props)
    this.state = {
      searchParams: props.searchParams
    }
  }

  componentWillMount () {

  }

  componentDidMount () {
    this.props.handleSearch(this.searchParams)
  }

  componentWillReceiveProps (nextProps) {

  }

  componentWillUpdate (nextProps, nextState) {

  }

  componentDidUpdate (prevProps, prevState) {

  }

  componentWillUnmount () {

  }

  get searchParams () {
    const filterParams = this.props.form.getFieldsValue()
    const { role_type: roleType, role_id: roleId, status } = filterParams

    const searchParamsAll = Object.assign({}, this.props.searchParams, filterParams, {
      role_type: roleType.join(),
      role_id: roleId.join(),
      status: status || ''
    })

    return searchParamsAll
  }

  handleButtonDisabled = key => this.props.routeAuthority.indexOf(this.props.buttonCtrl[key].id) < 0

  handleSearch = () => {
    this.props.handleSearch(this.searchParams)
  }

  handleAdd = () => {
    this.props.handleAdd()
  }

  render () {
    const {
      form: {
        getFieldDecorator
      },
      roleList,
      roleTypeList
    } = this.props

    const {
      searchParams: {
        username,
        email,
        role_id: roleId,
        role_type: roleType,
        status,
      }
    } = this.state

    const {
      handleButtonDisabled,
      handleSearch,
      handleAdd
    } = this

    return <Form layout="inline">
      <Row style={styles.form}><p style={styles.title}>查询条件</p></Row>
      <Row style={styles.search}>
        <Form.Item label="姓名" style={styles.item}>
          {
            getFieldDecorator('username', {
              initialValue: username
            })(
              <Input
                placeholder="请输入姓名"
                style={{ width: '200px' }}
              />
            )
          }
        </Form.Item>

        <Form.Item label="邮箱" style={styles.item}>
          {
            getFieldDecorator('email', {
              initialValue: email
            })(
              <Input
                placeholder="请输入邮箱"
                style={{ width: '200px' }}
              />
            )
          }
        </Form.Item>

        <Form.Item label="角色名称" style={styles.item}>
          {
            getFieldDecorator('role_id', {
              initialValue: roleId
            })(
              <Select
                allowClear
                showSearch
                mode="multiple"
                style={{ width: '200px' }}
                placeholder="请选择角色名称"
                filterOption={filterOption}
              >
                {
                  roleList.map(item =>
                    <Select.Option
                      key={item.id}
                      value={`${item.id}`}
                    >
                      { item.name }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item label="角色类型" style={styles.item}>
          {
            getFieldDecorator('role_type', {
              initialValue: roleType
            })(
              <Select
                allowClear
                showSearch
                mode="multiple"
                style={{ width: '200px' }}
                placeholder="请选择角色类型"
                filterOption={filterOption}
              >
                {
                  roleTypeList.map(item =>
                    <Select.Option
                      key={item.id}
                      value={`${item.id}`}
                    >
                      { item.type_name }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item label="状态" style={styles.item}>
          {
            getFieldDecorator('status', {
              initialValue: status
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '200px' }}
                placeholder="请选择状态"
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
      </Row>
      <Row style={styles.handle}>
        <p style={styles.title}>操作</p>

        <Button
          type="primary"
          style={styles.btn}
          onClick={handleSearch}
          // disabled={handleButtonDisabled('SEARCH')}
        >
          查询
        </Button>

        <Button
          type="primary"
          style={styles.btn}
          onClick={handleAdd}
          // disabled={handleButtonDisabled('ADD')}
        >
          新增
        </Button>
      </Row>
    </Form>
  }
}

const styles = {
  title: {
    display: 'inline-block',
    margin: 0,
    fontSize: '16px',
    lineHeight: '24px',
  },
  search: {
    margin: '10px 0',
  },
  item: {
    margin: '10px',
  },
  btn: {
    marginLeft: '12px',
  },
}
