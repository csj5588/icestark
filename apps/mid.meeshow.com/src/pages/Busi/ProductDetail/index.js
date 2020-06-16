import React from 'react';
import { connect } from 'react-redux';
import $common from 'utils/common';
import { getUrlParams } from 'ik-utils';
import { getAppDetail } from './model/action';
import Title from './coms/Title';
import DomainAction from './coms/DomainAction';
import DomainDetail from './coms/DomainDetail';
import VersionAction from './coms/VersionAction';
import VersionDetail from './coms/VersionDetail';
import Env from './coms/Env';
import styles from './index.less'

const cx = $common.classnames('productDetail', styles);
class ProductDetail extends React.Component {
  componentDidMount () {
    this.getTableList();
  }

  getTableList = () => {
    const { dispatch, location = {} } = this.props;
    const { search } = location
    const { app_key: appKey } = getUrlParams(search);
    dispatch(getAppDetail({ app_key: appKey }));
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
}))(ProductDetail);
