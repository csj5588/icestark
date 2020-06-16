import Home from '@/pages/Home';
import AuthPageButtonMs from '@/pages/AuthManage/AuthPageButtonMs';
import Login from '@/pages/Login';
import NotFound from '@/components/NotFound';

const routes = [{
  path: '/auth',
  component: AuthPageButtonMs,
}, {
  path: '/login',
  component: Login,
}, {
  path: '/',
  exact: true,
  component: Home,
}, {
  component: NotFound,
}];

export default routes;