/**
 *  @name 角色管理
 *  @author wanghl
 *  @date 2019.04.17
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
    name: '',
    role_type: [],
    status: undefined,
    page: 1,
    size: 10
  }
}

const creatFormData = () => {
  return {
    id: '',
    name: '',
    type_id: undefined,
    status: undefined,
    dataPower: {},
    data_power: '{}' // 数据范围权限控制，传参 json 字符串
  }
}

export default
@connect(state => ({
  buttonCtrl: state.auth.buttonCtrl,
  routeAuthority: state.auth.routeAuthority,
  pageButtonTreeRightUid: state.auth.pageButtonTreeRightUid,
  authApp: state.authApp
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
      roleTypeList: [], // 角色类型列表
      checkedKeys: [], // 选中的权限树
      rolesAddParams: [] // 要提交的变更
    }
  }

  tableRef = null

  modalFormRef = null

  componentDidMount () {
    this.getRoleTypeList()
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
  getRoleList = () => {
    const { searchParams } = this.state

    // console.log('查询', searchParams)
    S.getRoleList(searchParams)
      .then(({ data }) => {
        this.$message.success('查询成功')
        this.setState({
          tableData: data.list || [],
          tableTotal: +data.count
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
      this.getRoleList()
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
      this.getRoleList()
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
      this.getRoleList()
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
    S.getRoleModule({
      role_id: params.id
    })
      .then(({ data }) => {
        const treeId = []

        this.treeData.forEach(item => {
          data.forEach(itemKey => {
            if (item.split('-').indexOf(itemKey) !== -1) {
              item.split('-').forEach(itemJoin => {
                treeId.push(itemJoin)
              })
            }
          })
        })

        const treeIdTrans = Array.from(new Set(treeId)).filter(i => (+i !== 0))

        this.setState({
          checkedKeys: data,
          rolesAddParams: treeIdTrans
        })
        let powerStr = params.data_power
        let dataPower = {};
        try {
          dataPower = JSON.parse(powerStr)
        } catch (err) {
          console.log('error', err, powerStr)
        }
        const { apps = [] } = dataPower
        Object.assign(params, { dataPower, apps })

        this.handleModalConfig(params, '编辑', MODIFY)
      })

    this.$log.reportBtnWithButtonCtrl({
      key: 'MODIFY',
      request_params: ''
    })
  }

  // 提交内容
  handleSubmit = params => {
    const { modalConfig: { title, type }, rolesAddParams } = this.state
    const moduleId = rolesAddParams.join()

    if (!moduleId) {
      this.$message.error('请选择页面权限')
      return
    }

    // console.log('提交', params)
    switch (type) {
      case ADD:
      case MODIFY:
        S.postRoleModify(params)
          .then(({ data }) => {
            S.postRoleModuleModify({
              role_id: data.id,
              module_id: moduleId
            })
              .then(() => {
                this.$message.success('提交成功')
                this.getRoleList()
                this.hideDialog()
              })
          })
        break
      default:
        this.hideDialog()
    }

    this.$log.reportBtn({
      btnId: `${type}_submit`,
      btnName: `${title}_提交`,
      request_params: {
        ...params,
        module_id: moduleId
      }
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
      },
      checkedKeys: [],
      rolesAddParams: []
    })
    this.modalFormRef.resetFields()
  }

  // 获取权限树
  get treeData () {
    const { pageButtonTreeRightUid } = this.props
    const treeData = []

    const traverse = (item, id) => {
      const children = item.children

      children.forEach(val => {
        treeData.push(`${id}-${val.id}`)
        traverse(val, `${id}-${val.id}`, val.id)
      })
    }

    pageButtonTreeRightUid.forEach(item => {
      traverse(item, item.id, item.id)
    })

    return treeData
  }

  // 监听权限树勾选事件
  handleCheck = (keys, transExtra) => {
    this.setState({
      checkedKeys: keys,
      rolesAddParams: transExtra
    })
  }

  render () {
    const {
      searchParams,
      formData,
      modalConfig,
      tableData,
      tableTotal,
      roleTypeList,
      checkedKeys,
      rolesAddParams
    } = this.state

    const {
      handleSearch,
      handleAdd,
      handlePageChange,
      handleSizeChange,
      handleEdit,
      handleSubmit,
      hideDialog,
      handleCheck
    } = this

    const { authApp: { authList = [] } } = this.props
    return (
      <section>
        <PageFilter
          {...this.props}
          searchParams={searchParams}
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
          authList={authList}
          formData={formData}
          modalConfig={modalConfig}
          roleTypeList={roleTypeList}
          checkedKeys={checkedKeys}
          rolesAddParams={rolesAddParams}
          hideDialog={hideDialog}
          handleSubmit={handleSubmit}
          handleCheck={handleCheck}
          wrappedComponentRef={ref => { this.modalFormRef = ref }}
        />
      </section>
    )
  }
}
