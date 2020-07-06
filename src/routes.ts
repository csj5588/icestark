import Home from '@/commonPage/Home';
import AuthPageButtonMs from '@/commonPage/AuthManage/AuthPageButtonMs';
import AuthRoleTypeMs from '@/commonPage/AuthManage/AuthRoleTypeMs';
import AuthRoleMs from '@/commonPage/AuthManage/AuthRoleMs';
import AuthUserMs from '@/commonPage/AuthManage/AuthUserMs';
import AuthLogMs from '@/commonPage/AuthManage/AuthLogMs';
import NotFound from '@/components/NotFound';

const routes = [
  {
    path: '/',
    exact: true,
    redirect: '/react/overView',
    component: Home,
  },
  {
    path: '/auth',
    component: AuthPageButtonMs,
  },
  {
    path: '/auth-roleTypeMs',
    component: AuthRoleTypeMs,
  },
  {
    path: '/auth-pageButtonMs',
    component: AuthPageButtonMs,
  },
  {
    path: '/auth-roleMs',
    component: AuthRoleMs,
  },
  {
    path: '/auth-userMs',
    component: AuthUserMs,
  },
  {
    path: '/auth-logMs',
    component: AuthLogMs,
  },
  {
    component: NotFound,
  }
];

export default routes;