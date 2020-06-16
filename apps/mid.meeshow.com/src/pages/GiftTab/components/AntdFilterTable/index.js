/**
 *  @name 项目名称
 *  @author 开发人员
 *  @date 开发时间
 *
 *  @overview
 *    1. 上报操作埋点日志，需将 this.$log 注释取消
 *    2. 开启系统权限控制，需将 index 的 connect、button 的 disabled 注释取消
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Message } from 'antd'
import { stringifyParams } from 'ik-utils'

import S from './apis'
import { ADD, VIEW, MODIFY } from './constants/modalTypes'

import PageFilter from './components/PageFilter'
import PageTable from './components/PageTable'
import ModalForm from './components/ModalForm'

import './index.less'

const creatSearchParams = () => ({
  name: '',
  id: '',
  page: 1,
  size: 10
})

const creatFormData = () => ({
  id: '',
  name: '',
  priority: '',
  enable: 1,
  start_time: null, // timestamp礼物开始启用时间点
  end_time: null, // timestamp礼物失效时间点
})

export default
@connect(state => (
  {
    userInfo: state.user.info
  // buttonCtrl: state.auth.buttonCtrl,
  // routeAuthority: state.auth.routeAuthority
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
    }
  }

  tableRef = null

  modalFormRef = null

  componentDidMount () {
  }

  // 获取数据
  getDataList = () => {
    const { searchParams } = this.state

    S.getDataList(searchParams)
      .then(({ data }) => {
        Message.success('查询成功')
        this.setState({
          tableData: data.data || [],
          tableTotal: +data.page.total_count || 0
        })
      })

    // this.$log.reportBtnWithButtonCtrl({
    //   key: 'SEARCH',
    //   request_params: searchParams
    // })
  }

  // 查询
  handleSearch = searchParams => {
    this.setState({
      searchParams: {
        ...searchParams,
        page: 1
      }
    }, () => {
      this.getDataList()
    })
  }

  // 新增
  handleAdd = () => {
    this.handleModalConfig({}, '新增', ADD)

    // this.$log.reportBtnWithButtonCtrl({
    //   key: 'ADD',
    //   request_params: ''
    // })
  }

  // 导出
  handleExport = searchParams => {
    delete searchParams.page
    delete searchParams.size

    console.log('导出', `${S.dataListExport}&${stringifyParams(searchParams)}`)
    window.open(`${S.dataListExport}&${stringifyParams(searchParams)}`)

    // this.$log.reportBtnWithButtonCtrl({
    //   key: 'EXPORT',
    //   request_params: searchParams
    // })
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
      this.getDataList()
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
      this.getDataList()
    })
  }

  // 编辑或查看弹窗
  handleModalConfig = (_formData, _title, _type) => {
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

    // this.$log.reportBtnWithButtonCtrl({
    //   key: 'VIEW',
    //   request_params: ''
    // })
  }

  // 编辑
  handleEdit = (params, type) => {
    // 列表里直接修改开启or关闭
    if (type === 'nomodal') {
      params.operator = this.props.userInfo.username
      // params.force = 1 // 是否强制修改 1是 2否
      params.start_time = parseInt(new Date(params.start_time).getTime() / 1000)
      params.end_time = parseInt(new Date(params.end_time).getTime() / 1000)
      S.postDataModify(params)
        .then(() => {
          Message.success('修改成功')
          this.getDataList()
        })
    } else {
      console.log('edit', params)
      this.handleModalConfig(params, '编辑', MODIFY)
    }

    // this.$log.reportBtnWithButtonCtrl({
    //   key: 'MODIFY',
    //   request_params: ''
    // })
  }

  // 删除
  handleDel = id => {
    const { searchParams, tableData } = this.state

    console.log('删除', id)
    S.postDataDel({ id })
      .then(() => {
        Message.success('删除成功')
        /**
         *  @overview 如果删除操作只是修改状态，需将以下判断注释
         */
        if (searchParams.page > 1 && tableData.length <= 1) {
          this.setState({
            searchParams: {
              ...searchParams,
              page: searchParams.page - 1
            }
          })
        }
        this.getDataList()
      })

    // this.$log.reportBtnWithButtonCtrl({
    //   key: 'DEL',
    //   request_params: { id }
    // })
  }

  // 提交内容
  handleSubmit = params => {
    const { modalConfig: { title, type } } = this.state
    params.priority = Number(params.priority)
    params.operator = this.props.userInfo.username
    params.start_time = 0;
    params.end_time = 0;
    if (params.time) {
      params.start_time = params.time.length ? parseInt(new Date(params.time[0]).getTime() / 1000) : 0
      params.end_time = params.time.length ? parseInt(new Date(params.time[1]).getTime() / 1000) : 0
    }
    switch (type) {
      case ADD:
        S.postDataAdd(params)
          .then(() => {
            Message.success('提交成功')
            this.getDataList()
            this.hideDialog()
          })
        break
      case MODIFY:
        S.postDataModify(params)
          .then(() => {
            Message.success('修改成功')
            this.getDataList()
            this.hideDialog()
          })
        break
      default:
        this.hideDialog()
    }

    // this.$log.reportBtn({
    //   btnId: `${type}_submit`,
    //   btnName: `${title}_提交`,
    //   request_params: params
    // })
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
      tableTotal
    } = this.state

    const {
      handleSearch,
      handleAdd,
      handleExport,
      handlePageChange,
      handleSizeChange,
      handleView,
      handleEdit,
      handleDel,
      handleSubmit,
      hideDialog
    } = this

    return <section>
      <PageFilter
        {...this.props}
        searchParams={searchParams}
        handleSearch={handleSearch}
        handleAdd={handleAdd}
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
        handleEdit={handleEdit}
        handleDel={handleDel}
        wrappedComponentRef={ref => { this.tableRef = ref }}
      />

      <ModalForm
        {...this.props}
        formData={formData}
        modalConfig={modalConfig}
        hideDialog={hideDialog}
        handleSubmit={handleSubmit}
        wrappedComponentRef={ref => { this.modalFormRef = ref }}
      />
    </section>
  }
}
