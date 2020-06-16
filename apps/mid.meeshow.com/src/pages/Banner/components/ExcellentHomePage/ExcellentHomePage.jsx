import React, { Component } from 'react';
import './ExcellentHomePage.scss'

export default class ExcellentHomePage extends Component {
  static displayName = 'ExcellentHomePage';

  render () {
    return (
      <div className="excellent-home-page" style={{ height: '80vh' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundImage: `url(${require('./images/TB1oJNKsFOWBuNjy0FiXXXFxVXa-1900-1010.png')})`,
            backgroundPosition: 'center',
          }}
        />

        <div className="excellent-home-page-background" />
        <div className="excellent-home-page-content-wrapper">
          <div className="excellent-home-page-content">
            <p className="title">— 使命 —</p>
            <p className="desc">让快乐更简单</p>
            <p className="title">— 愿景 —</p>
            <p className="desc">让娱乐视频化</p>
            <p className="title">— 价值观 —</p>
            <p className="desc">拥抱用户&nbsp;&nbsp;激情担当<br />协作共享&nbsp;&nbsp;创新进取</p>
            <p className="desc"><a target='_blank' href='#/giftWall/upload'>上传资源文件</a></p>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  leftButton: {
    marginRight: '20px',
  },
  gitStar: {
    border: '0px',
    height: '32px',
    width: '145px',
    margin: '0 auto',
  },
  gitContainer: {
    marginTop: '30px',
    textAlign: 'center',
  },
  updateLogLinkWrap: {
    textAlign: 'center',
  },
  updateLogLink: {
    color: '#fff',
  },
};
