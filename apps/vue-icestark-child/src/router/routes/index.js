import { renderNotFound } from '@ice/stark-app';
import BasicLayout from '@/layouts/BasicLayout';
import List from '@/pages/List';
import Detail from '@/pages/Detail';
import Home from '@/pages/Home';
import Cod from '@/pages/codestatistics';
import Highchart from '@/components/highchart';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: '/', component: Home, exact: true },
      { path: '/list', component: List },
      { path: '/detail', component: Detail },
      { path: '/codestatistics', component: Cod },
      { path: '/highchart', component: Highchart },
      {
        path: '*',
        component: () => renderNotFound(),
      },
    ],
  },
];

export default routerConfig;
