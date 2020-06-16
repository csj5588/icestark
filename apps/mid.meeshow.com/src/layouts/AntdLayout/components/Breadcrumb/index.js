import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Breadcrumb } from 'antd'

import { asideMenuConfig } from 'src/menuConfig'

export default
@withRouter
@connect(state => ({
  breadList: state.breadcrumb.breadList
}))
class BreadcrumbList extends PureComponent {
  render () {
    const { breadList = [] } = this.props
    console.log(breadList)
    return <div style={styles.warp}>
      <Breadcrumb>
        {
          breadList.map(item => <Breadcrumb.Item key={item.key}>
            {item.link ? <Link style={styles.color} to={item.link}>{item.name}</Link> : <span style={styles.color}>{item.name}</span>}
          </Breadcrumb.Item>)
        }
      </Breadcrumb>
    </div>
  }
}

const styles = {
  warp: {
    marginTop: 12,
    marginLeft: 16,
  },
  color: {
    color: '#333'
  }
}
