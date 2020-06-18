import Home from '@/pages/Home';
import AuthPageButtonMs from '@/pages/AuthManage/AuthPageButtonMs';
import AuthRoleTypeMs from '@/pages/AuthManage/AuthRoleTypeMs';
import AuthRoleMs from '@/pages/AuthManage/AuthRoleMs';
import AuthUserMs from '@/pages/AuthManage/AuthUserMs';
import AuthLogMs from '@/pages/AuthManage/AuthLogMs';
import Login from '@/pages/Login';
import NotFound from '@/components/NotFound';

const routes = [
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
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    component: NotFound,
  }
];

export default routes;