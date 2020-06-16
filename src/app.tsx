import * as React from 'react';
import { createApp } from 'ice'
import userInit from '@/entry/user-init';
import { userPromise } from '@/utils/user';
import { ConfigProvider } from '@alifd/next';
import PageLoading from '@/components/PageLoading';
import FrameworkLayout from '@/layouts/FrameworkLayout';

const appConfig = {
  app: {
    rootId: 'icestark-container',
    addProvider: ({ children }) => (
      <ConfigProvider prefix="next-icestark-">{children}</ConfigProvider>
    ),
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
        path: '/zd-imilive',
        title: '种子视频',
        sandbox: false,
        // Angular app demo: https://github.com/ice-lab/icestark-child-apps/tree/master/child-common-angular-9 
        entry: 'http://localhost:3334/',
      },
      {
        path: '/mid',
        title: 'mid',
        sandbox: true,
        // Angular app demo: https://github.com/ice-lab/icestark-child-apps/tree/master/child-common-angular-9 
        entry: 'http://localhost:3444/',
      }
    ];
      return apps;
    },
    appRouter: {
      LoadingComponent: PageLoading,
    },
  },
};

userInit();

userPromise.finally(function() {
  createApp(appConfig)
});
