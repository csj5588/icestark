import React, { Component } from 'react';
import AntdFilterTable from './components/AntdFilterTable';

export default class AuthLogMs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="auth-log-ms-page">
        {/* 基于 ant-design v3.12.1 的表单模板 */}
        <AntdFilterTable />
      </div>
    );
  }
}
