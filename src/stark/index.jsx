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

// import { store } from '@ice/stark-data';

// const userInfo = { name: 'Tom', age: 18 };
// store.set('store', 'CH'); // 设置语言
// store.set('user', userInfo); // 设置登录后当前用户信息

// setTimeout(() => {
//   store.set('store', 'EN');
// }, 3000)
