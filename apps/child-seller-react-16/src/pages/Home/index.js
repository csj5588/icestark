import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appHistory } from '@ice/stark-app';
import { Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import PageTitle from '@/components/PageTitle';

class Home extends React.Component {
  render() {
    return (
      <div className="root">这边开始写业务</div>
    )
  }
}

export default Home;

// 跳转demo
// <Link to="/detail">子应用内跳转</Link>
// <br />
// <Button type="primary" onClick={() => {
//   appHistory.push('/message');
// }}>子应用间跳转</Button>