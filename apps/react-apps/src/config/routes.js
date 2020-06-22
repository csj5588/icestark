import { renderNotFound } from '@ice/stark-app';
import BasicLayout from '@/layouts/BasicLayout';

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
        path: '*',
        component: () => {
          return renderNotFound();
        },
      },
    ],
  },

];

export default routerConfig;
