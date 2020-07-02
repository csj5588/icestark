import React from 'react';
import { connect } from 'react-redux';
import $common from 'utils/common';
import { getUrlParams } from 'ik-utils';
import { getAppDetail, getDomailList } from './model/action';
import Title from './coms/Title';
import DomainAction from './coms/DomainAction';
import DomainDetail from './coms/DomainDetail';
import VersionAction from './coms/VersionAction';
import VersionDetail from './coms/VersionDetail';
import Env from './coms/Env';
import styles from './index.less'

const FILE = 'FileUpload' // 域名用途， 可选值
const cx = $common.classnames('productDetail', styles);
class ProductDetail extends React.Component {
  componentDidMount () {
    this.getTableList();
  }

  getTableList = () => {
    const { dispatch, authApp } = this.props;
    const { curApp } = authApp || {}
    dispatch(getDomailList({ app_key: curApp, use: FILE }));
    if(!curApp) return
    dispatch(getAppDetail({ app_key: curApp }));
  }

  render () {
    const { location } = this.props;
    return (
      <div className={cx('root')}>
        <Title />
        <DomainAction location={location}/>
        <DomainDetail location={location}/>
        <VersionAction location={location}/>
        <VersionDetail location={location}/>
        <Env location={location}/>
      </div>
    )
  }
}

export default connect(store => ({
  store: store.productDetail,
  authApp: store.stark.authApp
}))(ProductDetail);
