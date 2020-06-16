import React from 'react';

import style from './index.module.scss';

export default props => {
  return (
    <div className={style.main}>
      <h3>商家平台：基于 React@16.x</h3>
      {props.children}
    </div>
  );
};
