import { renderNotFound } from '@ice/stark-app';
import BasicLayout from '@/layouts/BasicLayout';
import Demo from '@/pages/Demo';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: '/', component: Demo, exact: true },
      {
        path: '*',
        component: () => renderNotFound(),
      },
    ],
  },
];

export default routerConfig;
