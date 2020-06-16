import { renderNotFound } from '@ice/stark-app';
import BasicLayout from '@/layouts/BasicLayout';

import Detail from '@/pages/Detail';
import List from '@/pages/List';
import Home from '@/pages/Home';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        exact: true,
        path: '/',
        component: Home,
      },
      {
        path: '/list',
        component: List,
      },
      {
        path: '/detail',
        component: Detail,

      },
      {
        path: '*',
        component: () => {
          return renderNotFound();
        },
      },
    ],
  },

];

export default routerConfig;
