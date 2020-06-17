import Home from '@/pages/Home';
import AuthPageButtonMs from '@/pages/AuthManage/AuthPageButtonMs';
import AuthRoleTypeMs from '@/pages/AuthManage/AuthRoleTypeMs';
import Login from '@/pages/Login';
import NotFound from '@/components/NotFound';

const routes = [
  {
    path: '/auth',
    component: AuthRoleTypeMs,
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