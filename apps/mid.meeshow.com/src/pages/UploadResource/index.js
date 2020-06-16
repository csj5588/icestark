import React, { Component } from 'react';
import AntdFilterTable from './components/AntdFilterTable';

/**
 * 礼物资源管理
 */
export default class GiftIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="gift-resource-page">
        {/* 基于 ant-design v3.12.1 的表单模板 */}
        <AntdFilterTable />
      </div>
    );
  }
}
