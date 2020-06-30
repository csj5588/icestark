import React from 'react';

import $common from 'utils/common';

import styles from './index.less';

const cx = $common.classnames('components-switch-page', styles);

class SwitchPage extends React.Component {
  render() {
    return (
      <div className={cx('root')}>
        切换应用，请稍后
      </div>
    )
  }
}

export default SwitchPage;
