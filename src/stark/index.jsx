import React from 'react';
import { connect } from 'react-redux';
import { store as stark } from '@ice/stark-data';
import _isEmpty from 'lodash/isEmpty';
import * as action from '@/store/action';

class StoreInjectionToStark extends React.Component {
  componentDidMount() {
    this.syncStarkUp()
  }

  syncStarkUp = () => {
    const { dispatch } = this.props;
    stark.on('dispatch', (muster = {}) => {
      if (!_isEmpty(muster)) {
        const { starkAction, payload } = muster;
        dispatch(action[starkAction](payload));
      }
    }, true);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(stores => ({
  store: stores.stark,
}))(StoreInjectionToStark)
