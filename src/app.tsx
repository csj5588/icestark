import * as React from 'react';
import { createApp } from 'ice';
import { store as stark } from '@ice/stark-data';
import '@/entry';
import { Provider } from 'react-redux';
import PageLoading from '@/components/PageLoading';
import FrameworkLayout from '@/layouts/FrameworkLayout';

import StoreInjectionToStark from './stark'
import store from './store'

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
      const apps = [
      {
        path: '/vue-app',
        title: 'Vue',
        sandbox: false,
        // Angular app demo: https://github.com/ice-lab/icestark-child-apps/tree/master/child-common-angular-9 
        // entry: 'http://localhost:3334/',
        url: process.env.NODE_ENV === 'development' ? [
          'http://localhost:4444/app.js',
          'http://localhost:4444/css/app.css'
        ] : [
          './../apps/vue/js/app.js',
          './../apps/vue/css/app.css'
        ]
      },
      {
        path: '/react',
        title: 'React',
        sandbox: true,
        // Angular app demo: https://github.com/ice-lab/icestark-child-apps/tree/master/child-common-angular-9 
        entry: process.env.NODE_ENV === 'development' ? 'http://localhost:3444/' : null,
        url: process.env.NODE_ENV === 'development' ? null : [
          './../apps/react/js/index.js',
          './../apps/react/css/index.css'
        ]
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

createApp(appConfig)
