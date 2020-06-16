import React, { useState, useEffect } from 'react'
import { Menu, Icon, Layout, Button, Avatar, Dropdown } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withRouter } from 'react-router'
import $user from 'user'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import { Link } from 'react-router-dom'

import MMenu from '../Menu'

import './Header.scss'
import { getUserRole, postRoleAdjust } from 'entry/apis'
import * as action from 'src/store/action'
import srcConfig from 'src/config'

import { headerPromise, headerMenuConfig } from 'src/menuConfig'

const classPrefix = 'm-container-header'
const NOW_ROLE = 1
const { Header } = Layout
const MenuItemGroup = Menu.ItemGroup

const mapDispatchToProps = dispath => bindActionCreators(action, dispath)

// header 角色切换、系统管理 功能开关
const showRoleSwitch = true
const showSystemMange = true

const filterMenuAuthority = menu => menu
  .filter(item => item.name && !item.hideInMenu)
  .filter(item => {
    // 权限开关
    if (!srcConfig.authority || item.path === srcConfig) {
      return true
    }
    // 只有设置了权限的才展示
    if (item.authority === undefined) {
      return false
    }
    // 不能为空, 如果为空就过滤掉, 认为无权限
    return !_isEmpty(item.authority) && !!item.authority
  })

const getSystemMangeInfo = menu => {
  return _get(menu, [0, 'children'], [])
}

function MHeader (props) {
  const { userInfo: phoneUserInfo } = props
  const [ssoUserInfo, setSsoUserInfo] = useState($user.get())
  const [userRole, setUserRole] = useState([])
  const [currentRole, setCurrentRole] = useState({})
  const [headerConfig, setHeaderConfig] = useState(getSystemMangeInfo(filterMenuAuthority(headerMenuConfig)))

  useEffect(() => {
    getUserList()
    getHeaderConfig()
  }, [])

  const logout = () => {
    if (process.env.SSO_LOGIN) {
      $user.logout()
    }

    if (process.env.PHONE_LOGIN) {
      props.userLogout().then(() => {
        // console.log('logout')
        props.history.push(`/${srcConfig.PHONE_LOGGIN_PATH}`)
      })
    }
  }

  const getHeaderConfig = () => {
    headerPromise.then(menu => {
      setHeaderConfig(getSystemMangeInfo(filterMenuAuthority(menu)))
    })
  }

  // 获取当前账号有效角色列表
  const getUserList = () => {
    getUserRole({}).then(({ data }) => {
      const userRole = data || []
      userRole.forEach(item => {
        if (+item.is_set === NOW_ROLE) {
          setUserRole(userRole)
          setCurrentRole(item)
        }
      })
    })
  }

  // 切换当前账号角色
  const handleRoleChange = val => {
    if (val === currentRole.role_id) {
      return
    }

    postRoleAdjust({ role_id: val }).then(({ data }) => {
      window.location.href = '/index'
    })
  }

  const userInfo = process.env.SSO_LOGIN ? ssoUserInfo : phoneUserInfo

  const menu = <Menu
    className="m-header-menu"
    style={{ marginRight: '20px' }}
  >
    <MenuItemGroup>
      <Menu.Item
        style={styles.menuItem}>
        <Icon type="user" />
        欢迎你，{ userInfo.username || '小映' }&#12288;
        <Button onClick={() => { logout() }} size="small">退出</Button>
      </Menu.Item>
    </MenuItemGroup>
    <Menu.Divider />
    {
      showRoleSwitch ? <MenuItemGroup
        title={<span style={styles.menuItem}><Icon type="key" /> 角色切换</span>}
      >
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
      </MenuItemGroup> : null
    }
    <Menu.Divider />
    {
      // 系统管理
      showSystemMange && headerConfig.length > 0 && <MenuItemGroup
        title={<span style={styles.menuItem}><Icon type="setting" /> 系统管理</span>}
      >
        <Menu.Divider />
        {
          headerConfig.map(item => <Menu.Item
            key={item.path}
            style={{ textAlign: 'center' }}
          >
            <Link className="hover" to={item.path}><span className="nav-text">{ item.name }</span></Link>
          </Menu.Item>)
        }
      </MenuItemGroup>
    }
  </Menu>

  return <Header style={{ background: '#fff', padding: '0 0 0 24px' }} className={`${classPrefix}`} >
    {/* <span className={`${classPrefix}-title`}>{srcConfig.SYSTEM_US_NAME}</span> */}
    <span className={`${classPrefix}-title`}>{srcConfig.SYSTEM_CHINA_NAME}</span>
    <MMenu />
    <Dropdown
      className="m-header-dropdown"
      overlay={menu}
      // visible={true}
      // trigger={['click']}
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
      .ant-dropdown-menu-item > a:hover {
        color: #00d8c9;
      }
    `}</style>
  </Header>
}

export default
compose(
  withRouter,
  connect(state => ({
    userInfo: state.user.info
  }), mapDispatchToProps)
)(MHeader)

const styles = {
  menuItem: {
    color: 'rgba(0, 0, 0, 0.65)',
    cursor: 'default',
  }
}
