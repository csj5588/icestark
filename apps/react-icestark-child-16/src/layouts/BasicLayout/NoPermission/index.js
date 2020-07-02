import React from 'react';
import { Empty, Button } from 'antd';
import { connect } from 'react-redux';
import common from 'utils/common';
import ProductCreate from './ProductCreate'
import { ADD } from './constants/modalTypes'
import { PRODUCT } from '../constant'
import { saveCreatePro, getDomailList } from './model/action'
import styles from './index.less';

const cx = common.classnames('no-permission', styles);
const FILE = 'FileUpload' // 域名用途， 可选值
class index extends React.Component {
  handleCreate = () => {
    const { dispatch, curApp } = this.props;
    dispatch(getDomailList({ app_key: curApp, use: FILE }));
    dispatch(saveCreatePro({ show: true, title: '产品新增', type: ADD }));
  };

  render() {
    const { pathname } = this.props
    const hasAdd = pathname.includes(PRODUCT)
    return (
      <div className={cx('root')}>
        <Empty
          image="https://img.ikstatic.cn/MTU5MzY1NTY0NDUwMCM0MDAjcG5n.png"
          imageStyle={{
            height: 100,
          }}
          description={<span>对不起，您当前无权限访问，请联系管理员开通权限</span>}
        >
          {hasAdd ? <Button type="primary" onClick={this.handleCreate}>
            创建新产品
          </Button> : null}
        </Empty>
        <ProductCreate />
      </div>
    );
  }
}

export default connect((stores) => ({
  store: stores.productDetail,
  curApp: stores.stark.authApp.curApp,
}))(index);
