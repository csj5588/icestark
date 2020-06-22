import { renderNotFound } from '@ice/stark-app';
import BasicLayout from '@/layouts/BasicLayout';

import Home from '@/pages/Home';
import Product from '@/pages/Product';

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
        path: '/product',
        component: Product,
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
