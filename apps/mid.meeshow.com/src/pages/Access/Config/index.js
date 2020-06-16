import React from 'react';
import { connect } from 'react-redux';
import $user from 'user'
import $common from 'utils/common';
import styles from './index.less'
import srcConfig from 'src/config'
const cx = $common.classnames('component-config', styles);
class Config extends React.Component {
  formatSrc = () => {
    const { curApp } = this.props
    const iframeRoot = srcConfig.APIS.iframeRoot
    const user = $user.get()
    const params = {
      ...user,
      ticket: $user.getToken(),
      app: curApp,
    }
    const paramsStr = $common.stringifyParams(params)
    return `${iframeRoot}config/index.html?${paramsStr}`
  }

  render () {
    return (
      <div className={cx('root')}>
        <iframe
          className={cx('iframe')}
          title='动态配置'
          src={this.formatSrc()}
          frameborder={0}
        >
        </iframe>
      </div>
    )
  }
}

export default connect(store => ({
  store: store.dispatcher,
  curApp: store.authApp.curApp
}))(Config)
