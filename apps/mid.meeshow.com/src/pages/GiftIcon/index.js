import React, { Component } from 'react';
import AntdFilterTable from './components/AntdFilterTable';

import UploadRes from './../../components/UploadRes'

import DragGift from './components/DragGift/DragSort/index';

export default class GiftIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="gift-icon-page">
        {/* 基于 ant-design v3.12.1 的表单模板 */}
        <AntdFilterTable />
      </div>
    );
  }
}
