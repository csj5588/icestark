import React from 'react';
import style from './index.module.scss';
import Header from './Header';
import ProductList from './ProductList';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'index'
    }
  }

  render() {
    return (
      <div className={style.main}>
        <ProductList />
        <Header />
        <div className={style.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default index;
