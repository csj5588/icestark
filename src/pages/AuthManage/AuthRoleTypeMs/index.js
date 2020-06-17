/**
 *  @name 角色类型管理
 *  @author wanghl
 *  @date 2019.08.16
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message } from 'antd';
import $log from '@/utils/log'
import S from './apis'
import { ADD, VIEW, MODIFY } from './constants/modalTypes'

import PageFilter from './components/PageFilter'
import PageTable from './components/PageTable'
import ModalForm from './components/ModalForm'

const creatSearchParams = () => {
  return {
    type_name: '',
    page: 1,
    size: 999
  }
}

const creatFormData = () => {
  return {
    id: '',
    type_name: ''
  }
}

export default
@connect(state => ({
  buttonCtrl: state.auth.buttonCtrl,
  routeAuthority: state.auth.routeAuthority,
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
    }
  }

  tableRef = null

  modalFormRef = null

  componentDidMount () {

  }

  // 获取数据
  getRoleTypeList = () => {
    const { searchParams } = this.state

    // console.log('查询', searchParams)
    S.getRoleTypeList(searchParams)
      .then(({ data }) => {
        let tableData = data || []

        tableData = searchParams.type_name ? tableData.filter(item =>
          item.type_name.indexOf(searchParams.type_name) > -1
        ) : tableData

        this.setState({
          tableData
        })

        message.success('查询成功')
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
      this.getRoleTypeList()
    })
  }

  // 新增
  handleAdd = () => {
    this.handleModalConfig({}, '新增', ADD)

    this.$log.reportBtnWithButtonCtrl({
      key: 'ADD',
      request_params: ''
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

  // 提交内容
  handleSubmit = params => {
    const { modalConfig: { title, type } } = this.state

    // console.log('提交', params)
    switch (type) {
      case ADD:
      case MODIFY:
        S.postRoleTypeModify(params)
          .then(() => {
            this.$message.success('提交成功')
            this.getRoleTypeList()
            this.hideDialog()
          })
        break
      default:
        this.hideDialog()
    }

    this.$log.reportBtn({
      btnId: `${type}_submit`,
      btnName: `${title}_提交`,
      request_params: params
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
      tableData
    } = this.state

    const {
      handleSearch,
      handleAdd,
      handleSubmit,
      hideDialog
    } = this

    return (
      <section>
        <PageFilter
          {...this.props}
          searchParams={searchParams}
          handleSearch={handleSearch}
          handleAdd={handleAdd}
        />

        <PageTable
          {...this.props}
          tableData={tableData}
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
    )
  }
}
