import React, { PureComponent } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import _isEmpty from 'lodash/isEmpty'
import config from 'src/config'

import menuPromise, { asideMenuConfig } from '../../../../menuConfig'
import './Sidebar.scss'

const { Sider } = Layout
const SubMenu = Menu.SubMenu
const defaultOpenMenu = '/index'
const classPrefix = 'm-container-sidebar'

const filterMenuAuthority = menu => menu
  .filter(item => item.name && !item.hideInMenu)
  .filter(item => {
    // 权限开关
    if (!config.authority || item.path === defaultOpenMenu) {
      return true
    }
    // 只有设置了权限的才展示
    if (item.authority === undefined) {
      return false
    }
    // 不能为空, 如果为空就过滤掉, 认为无权限
    return !_isEmpty(item.authority) && !!item.authority
  }).map(item => item.children ? {
    ...item,
    children: filterMenuAuthority(item.children),
  } : item)

export default
@withRouter
class MSidebar extends PureComponent {
  constructor (props) {
    super(props)
    const defaultOpenKeys = this.getDefaultOpenKeys()
    const { location: { pathname } } = props
    this.state = {
      mode: 'inline',
      asideConifg: asideMenuConfig,
      defaultOpenKeys: defaultOpenKeys || [defaultOpenMenu]
    }
  }

  /**
   * 获取默认展开菜单项
   */
  getDefaultOpenKeys = menu => {
    const { location: { pathname } } = this.props
    return pathname
      .split('/')
      .filter(i => i)
      .map((item, index, array) => `/${array.slice(0, index + 1).join('/')}`)
  }

  /**
   * 异步获取菜单数据
   */
  getAsideConfig () {
    const { location } = this.props
    menuPromise.then(menu => {
      const authMenu = this.traversalAuthMenu(menu)
      if (location.pathname === '/') {
        location.pathname = defaultOpenMenu
      } else if (!authMenu.find(item => item.path === location.pathname)) {
        // sidebar页面, 不耦合无权限跳转逻辑
        // window.location.href = defaultOpenMenu
      }

      let defaultOpenKeys = this.getDefaultOpenKeys(menu)
      this.setState({
        asideConifg: menu,
        defaultOpenKeys: defaultOpenKeys
      })
    })
  }

  /**
   * 遍历权限菜单树，如果当前路由不存在于权限树中，跳转至首页
   * @param {*} menu 权限菜单树
   */
  traversalAuthMenu (menu) {
    // console.log('authority', config.authority)
    let authMenu = []
    if (Array.isArray(menu) && menu.length) {
      filterMenuAuthority(menu)
        .forEach(item => {
          authMenu.push(item)
          authMenu = authMenu.concat(this.traversalAuthMenu(item.children))
        })
    }
    return authMenu
  }

  componentDidMount () {
    this.getAsideConfig()
  }

  /**
   * 获取菜单项数据
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return []
    }
    return filterMenuAuthority(menusData)
      .map(this.renderMenu)
  }

  renderMenu = (item, index) => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children)

      if (childrenItems && childrenItems.length > 0) {
        return <SubMenu
          key={item.path}
          title={<span>{item.icon && <Icon type={item.icon} />}<span className="nav-text">{ item.name }</span></span>}
        >
          {childrenItems}
        </SubMenu>
      }
      return null
    }
    return <Menu.Item
      key={item.path} >
      <Link to={item.path}>{item.icon && <Icon type={item.icon} />}<span className="nav-text">{ item.name }</span></Link>
    </Menu.Item>
  }

  onSelect = ({ item, key, keyPath }) => {
    // console.log(item, key, keyPath)
  }

  render () {
    const {
      asideConifg,
      mode,
      defaultOpenKeys
    } = this.state
    const {
      collapsed,
      style,
      location: { pathname }
    } = this.props

    const { onSelect } = this

    return <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={style}
        className={classPrefix} >
        <div
          className="logo base-text-over"
          onClick={() => { window.location.href = '/index' }}
        >
          { collapsed ? config.SYSTEM_US_NAME : config.SYSTEM_CHINA_NAME }
        </div>
        <Menu
          theme="dark"
          mode={mode}
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={[pathname]}
          onSelect={onSelect}
          style={{ paddingBottom: 40 }}>
          {
            this.getNavMenuItems(asideConifg)
          }
        </Menu>
      </Sider>
    </>
  }
}
