import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, Col, Row } from 'antd'
import { numCommaReplace, filterOption } from 'ik-utils'

import { timeFormat, momentToTime } from '../constants/timeFormat'
// import { selectList, multipleSelectList } from '../constants/selectLists'

export default
@Form.create()
class PageFilter extends Component {
  static propTypes = {
    searchParams: PropTypes.object,
    handleSearch: PropTypes.func,
    handleAdd: PropTypes.func,
    handleExport: PropTypes.func,
  }

  static defaultProps = {
    searchParams: {},
    handleSearch: () => {},
    handleAdd: () => {},
    handleExport: () => {},
  }

  constructor (props) {
    super(props)
    this.state = {
      searchParams: props.searchParams,
      appList: []
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
    const { date, search2, search3 } = filterParams

    const searchParamsAll = Object.assign({}, this.props.searchParams, filterParams)

    delete searchParamsAll.date

    return searchParamsAll
  }

  handleButtonDisabled = key => this.props.routeAuthority.indexOf(this.props.buttonCtrl[key].id) < 0

  handleSearch = () => {
    this.props.handleSearch(this.searchParams)
  }

  handleAdd = () => {
    this.props.handleAdd()
  }

  handleExport = () => {
    this.props.handleExport(this.searchParams)
  }

  render () {
    const {
      form: {
        getFieldDecorator
      }
    } = this.props

    const {
      searchParams = {
      },
      appList
    } = this.state

    const {
      handleButtonDisabled,
      handleSearch,
      handleAdd,
      handleExport
    } = this

    return <Form layout="inline">
      <Row style={styles.form}><p style={styles.title}>查询条件</p></Row>
      <Row style={styles.search}>
        <Form.Item label="App" style={styles.item}>
          {
            getFieldDecorator('app_id', {
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '100px' }}
                filterOption={filterOption}
              >
                {
                  appList.map((item, index) =>
                    <Select.Option
                      key={index}
                      value={item.id}
                    >
                      { item.remark }
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
