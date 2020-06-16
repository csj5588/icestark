/**
 *  @name 用户管理
 *  @author wanghl
 *  @date 2019.04.16
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import S from './apis'
import { ADD, VIEW, MODIFY } from './constants/modalTypes'

import PageFilter from './components/PageFilter'
import PageTable from './components/PageTable'
import ModalForm from './components/ModalForm'

const creatSearchParams = () => {
  return {
    username: '',
    email: '',
    role_id: [],
    role_type: [],
    status: undefined,
    page: 1,
    size: 10
  }
}

const creatFormData = () => {
  return {
    id: '',
    username: '',
    email: '',
    department: '',
    role_id: [],
    status: undefined
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
      tableTotal: 0, // 列表条数
      roleList: [], // 角色名称列表
      roleTypeList: [] // 角色类型列表
    }
  }

  tableRef = null

  modalFormRef = null

  componentDidMount () {
    this.getRoleList()
    this.getRoleTypeList()
  }

  // 获取角色名称
  async getRoleList () {
    const { data = {} } = await S.getRoleList({
      size: 9999
    })

    this.setState({
      roleList: data.list || []
    })
  }

  // 获取角色类型
  async getRoleTypeList () {
    const { data = [] } = await S.getRoleTypeList({
      size: 9999
    })

    this.setState({
      roleTypeList: data || []
    })
  }

  // 获取数据
  getUserList = () => {
    const { searchParams } = this.state

    // console.log('查询', searchParams)
    S.getUserList(searchParams)
      .then(({ data }) => {
        this.$message.success('查询成功')
        this.setState({
          tableData: data.users || [],
          tableTotal: +data.total
        })
      })

    this.$log.reportBtnWithButtonCtrl({
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
      this.getUserList()
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
      this.getUserList()
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
      this.getUserList()
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

  // 编辑
  handleEdit = params => {
    this.handleModalConfig(params, '编辑', MODIFY)

    this.$log.reportBtnWithButtonCtrl({
      key: 'MODIFY',
      request_params: ''
    })
  }

  // 提交内容
  handleSubmit = params => {
    const { modalConfig: { title, type } } = this.state

    // console.log('提交', params)
    switch (type) {
      case ADD:
      case MODIFY:
        S.postUserModify(params)
          .then(() => {
            this.$message.success('提交成功')
            this.getUserList()
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
      tableData,
      tableTotal,
      roleList,
      roleTypeList
    } = this.state

    const {
      handleSearch,
      handleAdd,
      handlePageChange,
      handleSizeChange,
      handleEdit,
      handleSubmit,
      hideDialog
    } = this

    return (
      <section>
        <PageFilter
          {...this.props}
          searchParams={searchParams}
          roleList={roleList}
          roleTypeList={roleTypeList}
          handleSearch={handleSearch}
          handleAdd={handleAdd}
        />

        <PageTable
          {...this.props}
          tableData={tableData}
          tableTotal={tableTotal}
          searchParams={searchParams}
          handlePageChange={handlePageChange}
          handleSizeChange={handleSizeChange}
          handleEdit={handleEdit}
          wrappedComponentRef={ref => { this.tableRef = ref }}
        />

        <ModalForm
          {...this.props}
          formData={formData}
          modalConfig={modalConfig}
          roleList={roleList}
          hideDialog={hideDialog}
          handleSubmit={handleSubmit}
          wrappedComponentRef={ref => { this.modalFormRef = ref }}
        />
      </section>
    )
  }
}
