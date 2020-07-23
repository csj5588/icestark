import Home from '@/commonPage/Home';
import Inside from '@/commonPage/Inside';
import NotFound from '@/components/NotFound';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/inside',
    component: Inside,
  },
  {
    component: NotFound,
  }
];

export default routes;