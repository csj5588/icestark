import React, { Component } from 'react';
import ExcellentHomePage from './components/ExcellentHomePage';

export default class Banner extends Component {
  static displayName = 'Banner';

  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="banner-page">
        <ExcellentHomePage />
      </div>
    );
  }
}
