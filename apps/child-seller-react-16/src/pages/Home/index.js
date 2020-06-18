import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { appHistory } from '@ice/stark-app';
import { Button } from '@alifd/next';
import { syncStarkUp } from '@/store/action-stark';

class Home extends React.Component {
  handleClick = () => {
    const { stark, dispatch } = this.props;
    dispatch(syncStarkUp('changeCount', 2));
  }

  render() {
    return (
      <div className="root">
        <Button onClick={this.handleClick}>点我改变stark</Button>
      </div>
    )
  }
}

export default connect(stores => ({
  stark: stores.stark,
}))(Home);

// 跳转demo
// <Link to="/detail">子应用内跳转</Link>
// <br />
// <Button type="primary" onClick={() => {
//   appHistory.push('/message');
// }}>子应用间跳转</Button>