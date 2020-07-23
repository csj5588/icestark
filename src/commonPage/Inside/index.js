import React from 'react';
import { Empty } from 'antd';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'index',
    };
  }

  render() {
    return (
      <div>
        <Empty
          description="this can be any inside page"
        />
      </div>
    );
  }
}

export default index;
