import React, { PureComponent } from 'react'
import { Menu, Icon, Layout, Button, Avatar, Dropdown, Select } from 'antd'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import $user from '@/utils/user'
import buildConfig from '@/config/build'
import _get from 'lodash/get'

import { getUserRole, postRoleAdjust } from '@/entry/apis'
import * as action from '@/store/action'
import srcConfig from '@/config'

import './Header.scss'

const classPrefix = 'm-container-header'
const NOW_ROLE = 1
const { Header } = Layout
const MenuItemGroup = Menu.ItemGroup

class MHeader extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      userInfo: $user.get(),
      userRole: [],
      currentRole: {
        name: ''
      },
      app: props.defaultApp,
      appListOptions: props.appListOptions
    }
  }

  logout = () => {
    if (buildConfig.ENV.SSO_LOGIN) {
      $user.logout()
    }

    if (buildConfig.ENV.PHONE_LOGIN) {
      this.props.userLogout().then(() => {
        // console.log('logout')
        this.props.history.push(`/${srcConfig.PHONE_LOGGIN_PATH}`)
      })
    }
  }

  componentDidMount () {
    this.getUserList()
  }
  // 获取当前账号有效角色列表
  getUserList = () => {
    getUserRole({})
      .then(({ data }) => {
        const userRole = data || []
        userRole.forEach(item => {
          if (+item.is_set === NOW_ROLE) {
            this.setState({
              userRole: userRole,
              currentRole: item
            })
          }
        })
      })
  }

  // 切换当前账号角色
  handleRoleChange = val => {
    const { currentRole } = this.state
    if (val === currentRole.role_id) {
      return
    }

    postRoleAdjust({ role_id: val })
      .then(({ data }) => {
        window.location.href = '/'
      })
  }

  render () {
    const { userInfo: ssoUserInfo, userRole, currentRole, } = this.state
    const { defaultApp, appListOptions: appList } = this.props
    const { userInfo: phoneUserInfo } = this.props
    const { handleRoleChange } = this

    const userInfo = buildConfig.ENV.SSO_LOGIN ? ssoUserInfo : phoneUserInfo

    const menu = (
      <Menu
        className="m-header-menu"
        onClick={this.handleMenuClick}
        style={{ marginRight: '20px' }}
      >
        <MenuItemGroup>
          <Menu.Item
            style={styles.menuItem}>
            <Icon type="user" />
            欢迎你，{ userInfo.username || '小映' }&#12288;
            <Button onClick={() => { this.logout() }} size="small">退出</Button>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item style={styles.menuItem}>
            <Icon type="key" />
            角色切换
          </Menu.Item>
          <Menu.Divider />
          {
            userRole.length > 0 ? userRole.map(item => <Menu.Item
              // disabled={item.is_set === NOW_ROLE}
              key={item.role_id}
              className={ item.is_set === NOW_ROLE && 'user-current-role-set' }
              style={{ textAlign: 'center' }}
              onClick={(e) => {
                handleRoleChange(e.key)
              }}
            >
              { item.name }
            </Menu.Item>) : <Menu.Item style={{ textAlign: 'center' }}>无</Menu.Item>
          }
        </MenuItemGroup>
      </Menu>
    )

    return (
      <Header style={{ background: '#fff', padding: '0' }} className={`${classPrefix}`} >
        <Dropdown
          className="m-header-dropdown"
          overlay={menu}
          placement="bottomRight">
          <div className="user-info">
            <div className="user-current-role">
              当前角色：<span style={{ color: '#00cc98' }}>{ currentRole.name || '无' }</span>
              &#12288;
              <Icon type="right" size="xxs" style={{ color: '#666' }} />
              &#12288;
            </div>
            <Avatar
              className="avatar"
              size="large"
            >
              {/* {userInfo.username.substr(0, 3) || '小映'} */}
              {_get(userInfo, 'username', '小映').substr(0, 3)}
            </Avatar>
          </div>
        </Dropdown>

        <style>{`
          .ant-menu-submenu-horizontal > .ant-menu {
            width: 120px
            left: -40px
          }
        `}</style>
      </Header>
    )
  }
}

const styles = {
  menuItem: {
    color: 'rgba(0, 0, 0, 0.65)',
    cursor: 'default',
  }
}

export default connect(state => ({
  userInfo: state.user.info
}))(MHeader)
