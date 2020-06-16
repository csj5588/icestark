// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import { lazy } from 'react';
import { getRouterData } from './utils/formatter';
import { asideMenuConfig } from './menuConfig';

// 保留
import AntdLayout from './layouts/AntdLayout';

// import Banner from './pages/Banner';

// import GiftIcon from './pages/GiftIcon';
// import GiftTab from './pages/GiftTab';
// import GiftResource from './pages/GiftResource';
// import GiftManage from './pages/GiftManage';
// import GiftWall from './pages/GiftWall';
// import UploadResource from './pages/UploadResource';
// import AppManage from './pages/AppManage';
// import SecretManage from './pages/SecretManage';
// import Product from './pages/Busi/Product/index';
// import ProductDetail from './pages/Busi/ProductDetail/index';
// import Service from './pages/Access/Service';
// import Config from './pages/Access/Config';
// import Dispatcher from './pages/Access/Dispatcher';
// import OverView from './pages/OverView';

// 异步引入页面
const GiftIcon = lazy((_) => import('./pages/GiftIcon'));
const GiftTab = lazy((_) => import('./pages/GiftTab'));
const GiftResource = lazy((_) => import('./pages/GiftResource'));
const GiftManage = lazy((_) => import('./pages/GiftManage'));
const GiftWall = lazy((_) => import('./pages/GiftWall'));
const UploadResource = lazy((_) => import('./pages/UploadResource'));
const AppManage = lazy((_) => import('./pages/AppManage'));
const SecretManage = lazy((_) => import('./pages/SecretManage'));
const Product = lazy((_) => import('./pages/Busi/Product/index'));
const ProductDetail = lazy((_) => import('./pages/Busi/ProductDetail/index'));
const Service = lazy((_) => import('./pages/Access/Service'));
const Config = lazy((_) => import('./pages/Access/Config'));
const Dispatcher = lazy((_) => import('./pages/Access/Dispatcher'));
const DispatcherDetail = lazy((_) => import('./pages/Access/DispatcherDetail'));
const OverView = lazy((_) => import('./pages/OverView'));
/**
 * 系统管理 Auth
 * 原有三目运算符改成了 if 判断模式， 因为三目运算 在icework 生成的代码 eslint 报错 // ggf
 */
let AuthRouter = [];
if (process.env.SSO_LOGIN) {
  AuthRouter = [
    {
      // 页面与按钮管理
      path: '/auth/pageButtonMs',
      component: lazy((_) => import('./pages/AuthManage/AuthPageButtonMs')),
    },
    {
      // 角色类型管理
      path: '/auth/roleTypeMs',
      component: lazy((_) => import('./pages/AuthManage/AuthRoleTypeMs')),
    },
    {
      // 角色管理
      path: '/auth/roleMs',
      component: lazy((_) => import('./pages/AuthManage/AuthRoleMs')),
    },
    {
      // 用户管理
      path: '/auth/userMs',
      component: lazy((_) => import('./pages/AuthManage/AuthUserMs')),
    },
    {
      // 日志管理
      path: '/auth/logMs',
      component: lazy((_) => import('./pages/AuthManage/AuthLogMs')),
    },
  ];
}

const routerConfig = [
  {
    path: '/overView',
    component: OverView,
  },
  {
    path: '/giftWall/icon',
    component: GiftIcon,
  },
  {
    path: '/giftWall/tab',
    component: GiftTab,
  },
  {
    path: '/giftWall/resource',
    component: GiftResource,
  },
  {
    path: '/giftWall/gift',
    component: GiftManage,
  },
  {
    path: '/giftWall/wall',
    component: GiftWall,
  },
  {
    path: '/giftWall/upload',
    component: UploadResource,
  },
  {
    path: '/appManage',
    component: AppManage,
  },
  {
    path: '/secretManage',
    component: SecretManage,
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
];

const routerMixConfig = routerConfig.concat(AuthRouter);

const routerData = getRouterData(routerMixConfig, asideMenuConfig);

export { routerData, routerMixConfig as routerConfig };
