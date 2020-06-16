import React, { isValidElement } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import loading from 'components/loading';

import { history } from '../store/configureStore';

import './service-intercept';
import userInit from './user-init';
import ticketReplace from './ticket-replace';
import protoMix from './proto-mix';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import moment from 'moment';
import 'moment/locale/zh-cn';
// 设置日历语言
moment.locale('zh-cn');

userInit();

ticketReplace();

// 页面加载完成监听
document.addEventListener('DOMContentLoaded', e => {
  // 结束loading
  loading.hide();
});

const ENTRY_CONTAINER = document.getElementById('entry-container');

export default (App, Opts = {}) => {
  const { store } = Opts;

  if (!ENTRY_CONTAINER) {
    throw new Error('当前页面不存在 <div id="entry-container"></div> 节点.');
  }

  const mixMap = {
    $store: store,
  };

  const Comp = isValidElement(App) ? App : <App />

  protoMix(React.Component, mixMap);
  protoMix(React.PureComponent, mixMap);

  ReactDOM.render(
    <Provider store={store}>
      <LocaleProvider locale={zhCN}>
        <ConnectedRouter history={history}>{Comp}</ConnectedRouter>
      </LocaleProvider>
    </Provider>,

    ENTRY_CONTAINER
  );
};
