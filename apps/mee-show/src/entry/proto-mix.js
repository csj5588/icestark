import React from 'react';
import $user, { userPromise } from 'user';
import $log from 'utils/log';
import $common from 'utils/common';
import $loading from 'components/loading';

import { Modal, message } from 'antd'

const staicMixMap = {
  // 用户
  $user,

  // lib
  $log,
  $common,

  // ui
  $loading,
  $modal: Modal,
  $message: message,
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

  userPromise.then(data => {
    mix(source, { $userInfo: $user.get() });
  });
};
