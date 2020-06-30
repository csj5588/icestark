import { renderNotFound } from '@ice/stark-app';
import BasicLayout from '@/layouts/BasicLayout';
import { lazy } from 'react';
import Home from '@/pages/Home';
import Product from '@/pages/Product';
import ProductDetail from '@/pages/ProductDetail';

// const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const OverView = lazy(() => import('@/pages/OverView'));
const Service = lazy(() => import('@/pages/Access/Service'));
const Config = lazy(() => import('@/pages/Access/Config'));
const Dispatcher = lazy(() => import('@/pages/Access/Dispatcher'));
const DispatcherDetail = lazy(() => import('@/pages/Access/DispatcherDetail'));
const LongLink = lazy(() => import('@/pages/Access/LongLink'));
const Buried = lazy(() => import('@/pages/Access/Buried'));

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
