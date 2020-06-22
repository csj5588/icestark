import { renderNotFound } from '@ice/stark-app';
import BasicLayout from '@/layouts/BasicLayout';
import List from '@/pages/List';
import Detail from '@/pages/Detail';
import Home from '@/pages/Home';
import Cod from '@/pages/codestatistics';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: '/', component: Home, exact: true },
      { path: '/list', component: List },
      { path: '/detail', component: Detail },
      { path: '/codestatistics', component: Cod },
      {
        path: '*',
        component: () => renderNotFound(),
      },
    ],
  },
];

export default routerConfig;
