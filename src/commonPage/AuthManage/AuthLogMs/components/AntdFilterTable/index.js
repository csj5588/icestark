/**
 *  @name 日志管理
 *  @author wanghl
 *  @date 2019.04.26
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { stringifyParams } from 'ik-utils'
import $log from '@/utils/log'
import { message } from 'antd'
import srcConfig from '@/config'
import moment from 'moment'
import S from './apis'
import { VIEW } from './constants/modalTypes'
import { SYSTEM_START_TIME, timeToMomentArray, currentDay } from './constants/timeFormat'

import PageFilter from './components/PageFilter'
import PageTable from './components/PageTable'
import ModalForm from './components/ModalForm'

const creatSearchParams = () => {
  return {
    system_source: srcConfig.AUTH_SYSTEM_ID,
    system_conf_type: undefined,
    page_identify: undefined,
    button_identify: undefined,
    operater: '',
    operater_email: '',
    date: timeToMomentArray(moment().format('YYYY-MM-DD 00:00:00'), currentDay()),
    page: 1,
    size: 10
  }
}

const creatFormData = () => {
  return {
    id: '',
    system_conf_type_show: '',
    page_name: '',
    button_name: '',
    operater: '',
    ctime: '',
    request_params: ''
  }
}

export default
@connect(state => ({
  buttonCtrl: state.auth.buttonCtrl,
  routeAuthority: state.auth.routeAuthority
}))
class PageFilterTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // 查询条件
      searchParams: creatSearchParams(),
      // 弹窗内容
      formData: creatFormData(),
      modalConfig: {
        visible: false, // 弹窗是否显示
        title: '', // 弹窗标题
        type: '' // 弹窗类型
      },
      tableData: [], // 列表数据
      tableTotal: 0, // 列表条数
      logSummaryLists: [] // 埋点汇总列表
    }
  }

  tableRef = null

  modalFormRef = null

  componentDidMount () {
    this.getLogSummaryLists()
  }

  // 获取页面、按钮名称
  async getLogSummaryLists () {
    const { data = {} } = await S.getLogSummaryLists({
      system_source: srcConfig.AUTH_SYSTEM_ID,
      stime: SYSTEM_START_TIME,
      etime: ''
    })

    this.setState({
      logSummaryLists: data.list || []
    })
  }

  // 获取数据
  getLogList = () => {
    const { searchParams } = this.state

    // console.log('查询', searchParams)
    S.getLogList(searchParams)
      .then(({ data }) => {
        message.success('查询成功')
        this.setState({
          tableData: data.list || [],
          tableTotal: +data.total
        })
      })

    $log.reportBtnWithButtonCtrl({
      key: 'SEARCH',
      request_params: searchParams
    })
  }

  // 查询
  handleSearch = searchParams => {
    this.setState({
      searchParams: {
        ...searchParams,
        page: 1
      }
    }, () => {
      this.getLogList()
    })
  }

  // 导出
  handleExport = searchParams => {
    delete searchParams.page
    delete searchParams.size

    // console.log('导出', `${S.logListExport}&${stringifyParams(searchParams)}`)
    window.open(`${S.logListExport}&${stringifyParams(searchParams)}`)

    $log.reportBtnWithButtonCtrl({
      key: 'EXPORT',
      request_params: searchParams
    })
  }

  handlePageChange = (page, size) => {
    this.setState({
      searchParams: {
        ...this.state.searchParams,
        ...{
          page,
          size
        }
      }
    }, () => {
      this.getLogList()
    })
  }

  handleSizeChange = (page, size) => {
    this.setState({
      searchParams: {
        ...this.state.searchParams,
        ...{
          page: 1,
          size
        }
      }
    }, () => {
      this.getLogList()
    })
  }

  handleModalConfig = (_formData, _title, _type) => {
    // console.log(_title, _formData)
    this.setState({
      formData: {
        ...this.state.formData,
        ..._formData
      },
      modalConfig: {
        visible: true,
        title: _title,
        type: _type
      }
    })
  }

  // 查看
  handleView = params => {
    this.handleModalConfig(params, '查看', VIEW)

    $log.reportBtnWithButtonCtrl({
      key: 'VIEW',
      request_params: ''
    })
  }

  // 关闭弹窗
  hideDialog = () => {
    this.setState({
      formData: creatFormData(),
      modalConfig: {
        ...this.state.modalConfig,
        ...{
          visible: false,
          type: ''
        }
      }
    })
    this.modalFormRef.resetFields()
  }

  render () {
    const {
      searchParams,
      formData,
      modalConfig,
      tableData,
      tableTotal,
      logSummaryLists
    } = this.state

    const {
      handleSearch,
      handleExport,
      handlePageChange,
      handleSizeChange,
      handleView,
      hideDialog
    } = this

    return (
      <section>
        <PageFilter
          {...this.props}
          searchParams={searchParams}
          logSummaryLists={logSummaryLists}
          handleSearch={handleSearch}
          handleExport={handleExport}
        />

        <PageTable
          {...this.props}
          tableData={tableData}
          tableTotal={tableTotal}
          searchParams={searchParams}
          handlePageChange={handlePageChange}
          handleSizeChange={handleSizeChange}
          handleView={handleView}
          wrappedComponentRef={ref => { this.tableRef = ref }}
        />

        <ModalForm
          {...this.props}
          formData={formData}
          modalConfig={modalConfig}
          hideDialog={hideDialog}
          wrappedComponentRef={ref => { this.modalFormRef = ref }}
        />
      </section>
    )
  }
}
