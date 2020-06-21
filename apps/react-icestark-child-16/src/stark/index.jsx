import React from 'react';
import { store as stark } from '@ice/stark-data';
import { syncStarkDown } from '../store/action-stark';
import { connect } from 'react-redux';

class StarkInjectionToStore extends React.Component {
  componentDidMount() {
    this.syncStarkDown()
  }

  syncStarkDown = () => {
    const { dispatch } = this.props;
    stark.on('stark', (starks) => {
      dispatch(syncStarkDown(starks));
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
