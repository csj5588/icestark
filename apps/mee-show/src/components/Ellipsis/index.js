import React from 'react';
import common from 'utils/common';
import { Tooltip } from 'antd';
import styles from './index.less';

const cx = common.classnames('comp-ellipsis', styles);

class Ellipsis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'index',
    };
  }

  render() {
    const {
      width = '',
      className = '',
    } = this.props;
    return (
      <div
        className={cx('root')}
      >
        <Tooltip placement="top" title={this.props.children} overlayStyle={{ maxWidth: '50%' }}>
          <nobr
            style={width ? { maxWidth: width + 'px' } : {}}
            className={className}
          >
            {this.props.children}
          </nobr>
        </Tooltip>
      </div>
    );
  }
}

export default Ellipsis;
