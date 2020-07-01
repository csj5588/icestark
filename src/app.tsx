import * as React from 'react';
import { createApp } from 'ice';
import { store as stark } from '@ice/stark-data';
import '@/entry';
import { userPromise } from '@/utils/user';
// import { ConfigProvider } from '@alifd/next';
import { Provider } from 'react-redux';
import PageLoading from '@/components/PageLoading';
import FrameworkLayout from '@/layouts/FrameworkLayout';
import StoreInjectionToStark from './stark'
import store from './store'
import '@/assets/styles/index.less'

const appConfig = {
  app: {
    rootId: 'icestark-container',
    addProvider: ({ children }) => (
      <Provider store={store}>
        <StoreInjectionToStark>
          {children}
        </StoreInjectionToStark>
      </Provider>
    ),
    store: store,
  },
  router: {
    type: 'browser',
  },
  icestark: {
    type: 'framework',
    Layout: FrameworkLayout,
    getApps: async () => {
      const apps = [{
        path: '/seller',
        title: '商家平台',
        sandbox: true,
        // React app demo: https://github.com/ice-lab/icestark-child-apps/tree/master/child-seller-react-16
        url: [
          '//ice.alicdn.com/icestark/child-seller-react/index.js',
          '//ice.alicdn.com/icestark/child-seller-react/index.css',
        ],
      }, {
        path: '/waiter',
        title: '小二平台',
        sandbox: true,
        url: [
          // Vue app demo: https://github.com/ice-lab/icestark-child-apps/tree/master/child-waiter-vue-2
          '//ice.alicdn.com/icestark/child-waiter-vue/app.js',
          '//ice.alicdn.com/icestark/child-waiter-vue/app.css'
        ],
      }, {
        path: '/angular',
        title: 'Angular',
        sandbox: true,
        // Angular app demo: https://github.com/ice-lab/icestark-child-apps/tree/master/child-common-angular-9 
        entry: '//ice.alicdn.com/icestark/child-common-angular/index.html',
      },
      {
        path: '/vue-app',
        title: '工单系统',
        sandbox: false,
        // Angular app demo: https://github.com/ice-lab/icestark-child-apps/tree/master/child-common-angular-9 
        // entry: 'http://localhost:3334/',
        url: [
          'http://localhost:4444/app.js',
          'http://localhost:4444/css/app.css'
        ]
        // url: [
        //   './../apps/vue/js/app.js',
        //   './../apps/vue/css/app.css'
        // ] // 注意
      },
      {
        path: '/react',
        title: '管控中心',
        sandbox: true,
        // Angular app demo: https://github.com/ice-lab/icestark-child-apps/tree/master/child-common-angular-9 
        entry: 'http://localhost:3444/',
        // url: [
        //   './../apps/react/js/index.js',
        //   './../apps/react/css/index.css'
        // ] // 注意
      }
    ];
      return apps;
    },
    appRouter: {
      LoadingComponent: PageLoading,
    },
  },
};

store.subscribe(() => {
  stark.set('stark', store.getState());
})

userPromise.finally(function() {
  createApp(appConfig)
});
