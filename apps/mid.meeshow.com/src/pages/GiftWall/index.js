import React, { Component } from 'react';
// import AntdFilterTable from './components/AntdFilterTable';

import DragGift from './components/DragSort/index';

export default class GiftIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="gift-icon-page">
        <DragGift></DragGift>
      </div>
    );
  }
}
