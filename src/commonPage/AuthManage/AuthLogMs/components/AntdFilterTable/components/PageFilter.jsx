import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, DatePicker, Button, Col, Row } from 'antd'
import { filterOption } from 'ik-utils'

import systemConfTypes from '../constants/systemConfTypes'
import { timeFormat, momentToTime, SYSTEM_START_TIME } from '../constants/timeFormat'

const SYSTEM_CONF_TYPE_PAGE = 2
const SYSTEM_CONF_TYPE_BUTTON = 3

export default
@Form.create()
class PageFilter extends Component {
  static propTypes = {
    searchParams: PropTypes.object,
    logSummaryLists: PropTypes.array,
    handleSearch: PropTypes.func,
    handleExport: PropTypes.func,
  }

  static defaultProps = {
    searchParams: {},
    logSummaryLists: [],
    handleSearch: () => {},
    handleExport: () => {},
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
    const {
      system_conf_type: systemConfType,
      page_identify: pageIdentify,
      button_identify: buttonIdentify,
      date,
    } = filterParams

    const searchParamsAll = Object.assign({}, this.props.searchParams, filterParams, {
      system_conf_type: systemConfType || '',
      page_identify: pageIdentify || '',
      button_identify: buttonIdentify || '',
      stime: momentToTime(date[0]) || SYSTEM_START_TIME,
      etime: momentToTime(date[1]),
    })

    delete searchParamsAll.date

    return searchParamsAll
  }

  handleButtonDisabled = key => this.props.routeAuthority.indexOf(this.props.buttonCtrl[key].id) < 0

  handleSearch = () => {
    this.props.handleSearch(this.searchParams)
  }

  handleExport = () => {
    this.props.handleExport(this.searchParams)
  }

  render () {
    const {
      form: {
        getFieldDecorator
      },
      logSummaryLists
    } = this.props

    const {
      searchParams: {
        system_conf_type: systemConfType,
        page_identify: pageIdentify,
        button_identify: buttonIdentify,
        operater,
        operater_email: operaterEmail,
        date,
      }
    } = this.state

    const {
      handleButtonDisabled,
      handleSearch,
      handleExport
    } = this

    return <Form layout="inline">
      <Row style={styles.form}><p style={styles.title}>查询条件</p></Row>
      <Row style={styles.search}>
        <Form.Item label="配置类型" style={styles.item}>
          {
            getFieldDecorator('system_conf_type', {
              initialValue: systemConfType
            })(
              <Select
                allowClear
                showSearch
                style={{ width: '200px' }}
                placeholder="请选择配置类型"
                filterOption={filterOption}
              >
                {
                  systemConfTypes.map(item =>
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

        <Form.Item label="页面名称" style={styles.item}>
          {
            getFieldDecorator('page_identify', {
              initialValue: pageIdentify
            })(
              <Select
                allowClear
                showSearch
                style={{ minWidth: '200px' }}
                placeholder="请选择页面名称"
                filterOption={filterOption}
                dropdownMatchSelectWidth={false}
              >
                {
                  logSummaryLists.filter(item => item.system_conf_type === SYSTEM_CONF_TYPE_PAGE).map(item =>
                    <Select.Option
                      key={item.id}
                      value={`${item.page_identify}`}
                    >
                      { item.page_name }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item label="按钮名称" style={styles.item}>
          {
            getFieldDecorator('button_identify', {
              initialValue: buttonIdentify
            })(
              <Select
                allowClear
                showSearch
                style={{ minWidth: '200px' }}
                placeholder="请选择按钮名称"
                filterOption={filterOption}
                dropdownMatchSelectWidth={false}
              >
                {
                  logSummaryLists.filter(item => item.system_conf_type === SYSTEM_CONF_TYPE_BUTTON).map(item =>
                    <Select.Option
                      key={item.id}
                      value={`${item.button_identify}`}
                    >
                      { `${item.page_name}_${item.button_name}` }
                    </Select.Option>
                  )
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item label="操作人" style={styles.item}>
          {
            getFieldDecorator('operater', {
              initialValue: operater
            })(
              <Input
                placeholder="请输入操作人"
                style={{ width: '200px' }}
              />
            )
          }
        </Form.Item>

        <Form.Item label="邮箱" style={styles.item}>
          {
            getFieldDecorator('operater_email', {
              initialValue: operaterEmail
            })(
              <Input
                placeholder="请输入邮箱"
                style={{ width: '200px' }}
              />
            )
          }
        </Form.Item>

        <Form.Item label="操作时间" style={styles.item}>
          {
            getFieldDecorator('date', {
              initialValue: date
            })(
              <DatePicker.RangePicker
                format={timeFormat}
                style={{ width: '380px' }}
                showTime={{ format: 'HH:mm:ss' }}
                placeholder={['开始时间', '结束时间']}
                disabledDate={(date, currentDate) => momentToTime(date) < SYSTEM_START_TIME}
              />
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
          disabled={handleButtonDisabled('SEARCH')}
        >
          查询
        </Button>

        <Button
          type="primary"
          style={styles.btn}
          onClick={handleExport}
          disabled={handleButtonDisabled('EXPORT')}
        >
          导出
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
