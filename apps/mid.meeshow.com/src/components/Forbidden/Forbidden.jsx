import React, { Component } from 'react'
import NotPermission from './components/NotPermission'
import './Forbidden.scss'

import { logPageWithInstance } from 'utils/log'
import srcConfig from 'src/config'

export default class Forbidden extends Component {
  static displayName = 'Forbidden'

  constructor (props) {
    super(props)
    this.state = {}
    logPageWithInstance({
      identifier: '403',
      label: `${srcConfig.SYSTEM_US_NAME} 无权限访问`
    })
  }

  render () {
    return (
      <div className="forbidden-page">
        <NotPermission />
      </div>
    )
  }
}
