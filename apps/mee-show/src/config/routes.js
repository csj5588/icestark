import { renderNotFound } from '@ice/stark-app';
import BasicLayout from '@/layouts/BasicLayout';
import Home from '@/pages/Home';
import Product from '@/pages/Product';
import ProductDetail from '@/pages/ProductDetail';
import OverView from '@/pages/OverView';
import Service from '@/pages/Access/Service';
import Config from '@/pages/Access/Config';
import Dispatcher from '@/pages/Access/Dispatcher';
import DispatcherDetail from '@/pages/Access/DispatcherDetail';
import LongLink from '@/pages/Access/LongLink';
import Buried from '@/pages/Access/Buried';

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
        path: '/productDetail',
        component: ProductDetail,
      },
      {
        path: '/overView',
        component: OverView,
      },
      {
        path: '/access/service',
        component: Service,
      },
      {
        path: '/access/config',
        component: Config,
      },
      {
        path: '/access/dispatcher',
        component: Dispatcher,
      },
      {
        path: '/access/dispatcherDetail',
        component: DispatcherDetail,
      },
      {
        path: '/access/longLink',
        component: LongLink,
      },
      {
        path: '/access/buried',
        component: Buried,
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
