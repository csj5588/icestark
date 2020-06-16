import React from 'react';
import $common from 'utils/common';
import $loading from 'components/loading';

import { message, Modal } from 'antd'

const staicMixMap = {
  $common,

  $loading,
  $message: message,
  $modal: Modal
};

const inject = (source, key, val) => {
  if (source[key]) {
    inject(source, `_${key}`, val);
  } else {
    source[key] = val;
  }
};

const mix = (source, mixMap) => {
  /* eslint-disable-next-line array-callback-return */
  Object.keys(mixMap).map(key => {
    const val = mixMap[key];
    inject(source, key, val);
    inject(source.prototype, key, val);
  });
};

export default (source, more = {}) => {
  mix(source, {
    ...staicMixMap,
    ...more,
  });
};
