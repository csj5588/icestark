/**
 * 上中下布局
 * @since 20190516
 * @author lizihan
 */
import React from 'react'
// import { Layout } from 'antd'
import { Layout, Menu } from 'antd'
import { withRouter } from 'react-router'

import MHeader from './components/Header'
import MainContent from './MainContent'
// import MSidebar from './components/Sidebar'
import MBreadcrumb from './components/Breadcrumb'

// import MainRouter from './MainRouter'

import './index.scss'
import config from 'src/config'

// const { Content, Footer } = Layout
const { Header, Content, Footer } = Layout

function TopLayout () {
  return <Layout className="layout">
    {/* <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header> */}
    <MHeader />
    <MBreadcrumb />
    <Content style={{
      // padding: '0 0',
      margin: '12px 24px 0',
      padding: 24,
      background: '#fff',
      minHeight: 280,
      overflow: 'auto'
    }}>
      <MainContent />
    </Content>
    <Footer style={{ padding: '12px 0', fontSize: '12px', lineHeight: '20px', textAlign: 'center' }}>{config.SYSTEM_CHINA_NAME} &copy; 2019 {config.SYSTEM_URL}</Footer>
  </Layout>
}

export default withRouter(TopLayout)
