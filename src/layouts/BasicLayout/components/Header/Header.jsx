import React, { PureComponent } from 'react'
import { Layout } from 'antd'

import './Header.scss'

const classPrefix = 'm-container-header'
const { Header } = Layout

class MHeader extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Header style={{ background: '#fff', padding: '0' }} className={`${classPrefix}`} >
        欢迎
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

export default MHeader
