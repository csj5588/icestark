import _findIndex from 'lodash/findIndex';
import _filter from 'lodash/filter';
import config from '@/config';

const systemManage = [
  {
    name: 'Stark',
    path: '/inside',
    icon: 'setting',
  },
];

const asideMenuConfig = [
  {
    name: 'Home',
    path: '/',
    icon: 'chart-pie',
     // 不需要权限控制
     escapeAuthorityControl: true,
  },
  {
    name: 'Vue',
    path: '/vue',
    icon: 'atm',
  },{
    name: 'React',
    path: '/react',
    icon: 'account',
  },
];

const headerMenuConfig = [
  // ...systemManage
];

const asideMixMenuConfig = asideMenuConfig.concat(systemManage);

let asideReolve;
const asidePromise = new Promise((resolve, reject) => {
  asideReolve = resolve;
});
let headerReolve;
const headerPromise = new Promise((resolve, reject) => {
  headerReolve = resolve;
});
// 获取到权限树后，加入侧边栏
export function setAuthorityTree(tree) {
  const asideTreeWithAuthority = getAuthorityMenuTree(tree, asideMixMenuConfig);
  const headerTreeWithAuthority = getAuthorityMenuTree(tree, headerMenuConfig);
  asideReolve(asideTreeWithAuthority);
  headerReolve(headerTreeWithAuthority);
}

if (process.env.NODE_ENV === 'development') {
  asidePromise.then(menu => {
    window.__asideMenuTree__ = menu;
  });
}

// 通过接口返回的tree数据 获取 侧边栏的数权限
function getAuthorityMenuTree(tree, menu) {
  if (!config.authority) {
    // asideReolve(menu)
    return menu;
  }
  // 递归遍历权限树
  const setMenuNode = (node, menuNode = [], path = '/') => {
    menuNode.map(menuItem => {
      // 如果不是不需要权限控制的menu, 则authrity赋值为空数组, 在checkPermissions时, 或过滤掉
      if (!menuItem.escapeAuthorityControl) {
        menuItem.authority = [];
      }
      return menuItem;
    });

    node.forEach((item, index, array) => {
      // console.log(tree, menu, node)
      if (item.type === '2') {
        return;
      }
      const id = _findIndex(menuNode, me => {
        return me.path === path + item.root;
      });
      // console.log('setMenuNode id: ', id)
      if (id !== -1) {
        // 匹配成功，设置权限, 这样设置了每个权限都
        menuNode[id].authority = ['user', 'admin'];
      }

      if (
        item.children &&
        Array.isArray(item.children) &&
        item.children.length
      ) {
        if (id > -1) {
          setMenuNode(
            item.children,
            menuNode[id].children,
            `${path}${item.root}/`
          );
        }
      }
    });
  };
  // 这种写法会产生地址引用, 对后续是否有副作用? 有待考证, 还是故意地址引用?
  setMenuNode(tree, [...menu]);
  return menu;
}
export {
  headerPromise,
  asideMixMenuConfig as asideMenuConfig,
};
export default asidePromise;
