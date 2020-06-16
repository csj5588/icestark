import React, { Component } from 'react'
import './NotPermission.scss'

export default class NotPermission extends Component {
  static displayName = 'NotPermission'

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="not-permission" style={styles.notPermission}>
        <div style={styles.content} className="exception-content">
          <img
            src={require('./images/TB1Gy4Yjv6H8KJjy0FjXXaXepXa-780-780.png')}
            style={styles.imgException}
            className="imgException"
            alt="prmission"
          />
          <div style={styles.prompt}>
            <h3 style={styles.title} className="title">
              抱歉，您无权限
            </h3>
            <p style={styles.description} className="description">
              您暂无权限访问此页面，请看看其他页面
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#333',
  },
  description: {
    color: '#666',
  },
}
