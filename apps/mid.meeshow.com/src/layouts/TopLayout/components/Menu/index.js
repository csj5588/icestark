import React, { useState, useEffect } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import _isEmpty from 'lodash/isEmpty'
import config from 'src/config'

import menuPromise, { asideMenuConfig } from '../../../../menuConfig'

const SubMenu = Menu.SubMenu
const defaultOpenMenu = '/index'
const classPrefix = 'm-container-sidebar'

const mode = 'horizontal'
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

/**
 * 获取默认展开菜单项
 */
const getDefaultOpenKeys = (pathname, menu) => {
  return pathname
    .split('/')
    .filter(i => i)
    .map((item, index, array) => `/${array.slice(0, index + 1).join('/')}`)
}

/**
 * 遍历权限菜单树，如果当前路由不存在于权限树中，跳转至首页
 * @param {*} menu 权限菜单树
 */
const traversalAuthMenu = (menu) => {
  // console.log('authority', config.authority)
  let authMenu = []
  if (Array.isArray(menu) && menu.length) {
    filterMenuAuthority(menu)
      .forEach(item => {
        authMenu.push(item)
        authMenu = authMenu.concat(traversalAuthMenu(item.children))
      })
  }
  return authMenu
}

function MMenu (props) {
  const { location: { pathname } } = props
  const [defaultOpenKeys, setDefaultOpenKeys] = useState(getDefaultOpenKeys(pathname) || [defaultOpenMenu])
  const [asideConifg, setAsideConifg] = useState(asideMenuConfig)

  useEffect(() => {
    getAsideConfig()
  }, [])

  /**
   * 异步获取菜单数据
   */
  const getAsideConfig = () => {
    const { location } = props
    menuPromise.then(menu => {
      const authMenu = traversalAuthMenu(menu)
      if (location.pathname === '/') {
        location.pathname = defaultOpenMenu
      } else if (!authMenu.find(item => item.path === location.pathname)) {
        // sidebar页面, 不耦合无权限跳转逻辑
        // window.location.href = defaultOpenMenu
      }

      let defaultOpenKeys = getDefaultOpenKeys(pathname, menu)

      setAsideConifg(menu)
      setDefaultOpenKeys(defaultOpenKeys)
    })
  }

  /**
   * 获取菜单项数据
   */
  const getNavMenuItems = menusData => {
    if (!menusData) {
      return []
    }
    return filterMenuAuthority(menusData)
      .map(renderMenu)
  }

  const renderMenu = (item, index) => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = getNavMenuItems(item.children)

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

  const onSelect = ({ item, key, keyPath }) => {
    // console.log(item, key, keyPath)
  }

  return <>
    <Menu
      // theme="dark"
      mode={mode}
      defaultOpenKeys={defaultOpenKeys}
      selectedKeys={[pathname]}
      onSelect={onSelect}
      style={{
        marginLeft: 20,
        display: 'inline-block'
      }}>
      {
        getNavMenuItems(asideConifg)
      }
    </Menu>
  </>
}

export default withRouter(MMenu)
