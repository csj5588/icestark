import React from 'react';
import { store as stark } from '@ice/stark-data';
import { syncStark } from '../store/action-stark';
import { connect } from 'react-redux';

class StarkInjectionToStore extends React.Component {
  componentDidMount() {
    this.syncStark()
  }

  syncStark = () => {
    const { dispatch } = this.props;
    stark.on('stark', (starks) => {
      dispatch(syncStark(starks));
    }, true)
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
}))(StarkInjectionToStore);
