import { renderNotFound } from '@ice/stark-app';
import BasicLayout from '@/layouts/BasicLayout';
import Demo from '@/pages/demo';
import Own from '@/pages/own';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: '/', component: Own, exact: true },
      {
        path: '*',
        component: () => renderNotFound(),
      },
    ],
  },
];

export default routerConfig;
