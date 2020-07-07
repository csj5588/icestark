// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置
import _findIndex from 'lodash/findIndex';
import _filter from 'lodash/filter';
import config from 'src/config';

const noAuthorityPaths = ['/index'];


const headerMenuConfig = [
  // ...systemManage
];

const asideMenuConfig = [
  {
    name: '接入概览',
    path: '/overView',
    icon: 'home',
    // 不需要权限控制
    escapeAuthorityControl: true,
  },
  {
    name: '应用管理',
    path: '/productDetail',
    icon: 'bar-chart',
    escapeAuthorityControl: true,
  },
  {
    name: '接入管理',
    path: '/access',
    icon: 'pie-chart',
    escapeAuthorityControl: true,
    children: [
      {
        name: 'serviceInfo接入',
        path: '/access-service',
      },
      {
        name: '动态配置接入',
        path: '/access-config',
      },
      {
        name: 'dispatcher接入',
        path: '/access-dispatcher',
      },
      {
        name: '长链接接入',
        path: '/access-longLink',
      },
      {
        name: '埋点服务接入',
        path: '/access-buried',
      },
    ],
  }
];

export default asideMenuConfig;
