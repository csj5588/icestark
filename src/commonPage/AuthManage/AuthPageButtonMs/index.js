/**
 *  @name 页面与按钮管理
 *  @author wanghl
 *  @date 2019.04.16
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $user from '@/utils/user';
import * as actions from '@/store/action'
import { Tree, Icon, Popconfirm, message } from 'antd'

import S from './apis'
import srcConfig from '@/config'
import { ADD, MODIFY, ADD_PAGE, ADD_BUTTON } from './constants/modalTypes'

import ModalForm from './components/ModalForm'
import './index.scss'

const { TreeNode } = Tree

const STATUS_DELETE = 2

const mapDispatchToProps = (dispatch, props) => ({
  actions: bindActionCreators(actions, dispatch)
})

const creatFormData = () => {
  return {
    id: '',
    parent: '',
    name: '',
    apipath: '/',
    root: '',
    code: undefined,
    type: ''
  }
}

export default
@connect(state => ({
  buttonCtrl: state.auth.buttonCtrl,
  routeAuthority: state.auth.routeAuthority,
  pageButtonTreeRightUid: state.auth.pageButtonTreeRightUid,
}), mapDispatchToProps)
class TreeList extends Component {
  state = {
    modalConfig: {
      visible: false, // 弹窗是否显示
      title: '', // 弹窗标题
      type: '', // 弹窗类型
    },
    formData: creatFormData(),
    nodeData: {},
  }

  showDeleteBtn = srcConfig.SUPER_ADMIN.indexOf($user.get().email) >= 0

  // 新增
  appendModule = (data, type) => {
    this.setState({
      modalConfig: {
        visible: true,
        title: '新增',
        type: ADD,
      },
      formData: {
        ...creatFormData(),
        type
      },
      nodeData: data,
    })
  }

  // 编辑
  modifyModule = data => {
    const { id, parent, name, apipath, root, code, type } = data

    this.setState({
      modalConfig: {
        visible: true,
        title: '编辑',
        type: MODIFY,
      },
      formData: { id, parent, name, apipath, root, code, type },
      nodeData: {},
    })
  }

  // 删除，此为隐藏功能，慎用
  deleteModule = data => {
    const { id, parent, name, apipath, root, code, type } = data

    S.postModuleModify({ id, parent, name, apipath, root, code, type, status: STATUS_DELETE })
      .then(() => {
        message.success('删除成功')
        this.hundleSubmitSuccess()
      })
  }

  // 弹窗关闭
  hideDialog = () => {
    this.setState({
      modalConfig: {
        ...this.state.modalConfig,
        visible: false,
        type: ''
      },
      formData: creatFormData(),
      nodeData: {},
    })
  }

  renderTreeListButton = (level, data) => {
    const handleButtonDisabled = key => this.props.routeAuthority.indexOf(this.props.buttonCtrl[key].id) < 0

    // 根节点（新增子页面）
    if (level === 1) {
      return <span>
        <button
          className="tree-button"
          onClick={() => this.appendModule(data, ADD_PAGE)}
          disabled={handleButtonDisabled('ADD')}
        >新增子页面</button>
      </span>
    }

    // 一级页面（新增子页面）
    if (level === 2 && data.type === ADD_PAGE) {
      return <span>
        {
          ((!data.children.length) || (data.children.length && data.children[0].type === ADD_PAGE)) && <button
            className="tree-button"
            onClick={() => this.appendModule(data, ADD_PAGE)}
            disabled={handleButtonDisabled('ADD')}
          >新增子页面</button>
        }
        {
          ((!data.children.length) || (data.children.length && data.children[0].type === ADD_BUTTON)) && <button
            className="tree-button"
            onClick={() => this.appendModule(data, ADD_BUTTON)}
            disabled={handleButtonDisabled('ADD')}
          >
            新增按钮
          </button>
        }
        <button
          className="tree-button"
          onClick={() => this.modifyModule(data)}
          disabled={handleButtonDisabled('MODIFY')}
        >编辑</button>
        {
          this.showDeleteBtn && <Popconfirm
            okText="确定"
            cancelText="取消"
            placement="topRight"
            onConfirm={() => { this.deleteModule(data) }}
            title={'确认删除这条数据吗？'}
          >
            <button
              className="tree-button tree-button-del"
            >删除</button>
          </Popconfirm>
        }
      </span>
    }

    // 二级页面（新增子页面 or 新增按钮）
    if (level === 3 && data.type === ADD_PAGE) {
      return <span>
        {
          // 不存在三级项 or 三级项为页面（新增子页面）
          ((!data.children.length) || (data.children.length && data.children[0].type === ADD_PAGE)) &&
          <button
            className="tree-button"
            onClick={() => this.appendModule(data, ADD_PAGE)}
            disabled={handleButtonDisabled('ADD')}
          >新增子页面</button>
        }
        {
          // 不存在三级项 or 三级项为按钮（新增按钮）
          ((!data.children.length) || (data.children.length && data.children[0].type === ADD_BUTTON)) &&
          <button
            className="tree-button"
            onClick={() => this.appendModule(data, ADD_BUTTON)}
            disabled={handleButtonDisabled('ADD')}
          >新增按钮</button>
        }
        <button
          className="tree-button"
          onClick={() => this.modifyModule(data)}
          disabled={handleButtonDisabled('MODIFY')}
        >编辑</button>
        {
          this.showDeleteBtn && <Popconfirm
            okText="确定"
            cancelText="取消"
            placement="topRight"
            onConfirm={() => { this.deleteModule(data) }}
            title={'确认删除这条数据吗？'}
          >
            <button
              className="tree-button tree-button-del"
            >删除</button>
          </Popconfirm>
        }
      </span>
    }

    return <span>
      {
        level === 4 && data.type === ADD_PAGE &&
        <button
          className="tree-button"
          onClick={() => this.appendModule(data, ADD_BUTTON)}
          disabled={handleButtonDisabled('ADD')}
        >新增按钮</button>
      }
      <button
        className="tree-button"
        onClick={() => this.modifyModule(data)}
        disabled={handleButtonDisabled('MODIFY')}
      >编辑</button>
      {
        this.showDeleteBtn && <Popconfirm
          okText="确定"
          cancelText="取消"
          placement="topRight"
          onConfirm={() => { this.deleteModule(data) }}
          title={'确认删除这条数据吗？'}
        >
          <button
            className="tree-button tree-button-del"
          >删除</button>
        </Popconfirm>
      }
    </span>
  }

  renderTreeListContent = (item, level) => {
    return <span className="custom-tree-node">
      <span>{item.name}</span>
      <span>
        {
          this.renderTreeListButton(level, item)
        }
      </span>
    </span>
  }

  renderTreeList = (data, level = 1) => data.map(item => {
    const nextLevel = level + 1

    return <TreeNode
      key={item.id}
      selectable={false}
      title={this.renderTreeListContent(item, level)}
    >
      {
        item.children && item.children.length > 0 ? this.renderTreeList(item.children, nextLevel) : null
      }
    </TreeNode>
  })

  // 提交成功，更新权限树
  hundleSubmitSuccess = () => {
    this.props.actions.getPageButtonTree()
    this.props.actions.getPageButtonTreeUid()
  }

  render () {
    const {
      pageButtonTreeRightUid
    } = this.props

    const {
      modalConfig,
      formData,
      nodeData
    } = this.state

    const {
      hideDialog,
      renderTreeList,
      hundleSubmitSuccess
    } = this

    return (
      <div style={{ padding: '15px' }}>
        {
          pageButtonTreeRightUid[0].children.length > 0 ? <Tree
            {...this.props}
            switcherIcon={<Icon type="down" />}
            className="auth-tree-list"
            defaultExpandAll
            checkStrictly
          >
            {
              renderTreeList(pageButtonTreeRightUid, 1)
            }
          </Tree> : <div style={{ lineHeight: '40px', textAlign: 'center' }}>loading tree</div>
        }

        <ModalForm
          {...this.props}
          modalConfig={modalConfig}
          formData={formData}
          nodeData={nodeData}
          hideDialog={hideDialog}
          hundleSubmitSuccess={hundleSubmitSuccess}
        />
      </div>
    )
  }
}
