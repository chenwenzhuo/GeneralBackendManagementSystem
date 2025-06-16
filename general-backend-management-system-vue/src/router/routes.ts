const routes: any[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/about',
    component: () => import('@/pages/AboutView.vue'),
  },
  {
    path: '/login',
    component: () => import('@/pages/login/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/error/NotFound.vue'),
  },
];

export default routes;
