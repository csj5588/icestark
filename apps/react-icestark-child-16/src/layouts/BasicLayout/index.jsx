import React from 'react';

import style from './index.module.scss';

export default props => {
  return (
    <div className={style.main}>
      {props.children}
    </div>
  );
};
