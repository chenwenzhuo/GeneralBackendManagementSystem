const routes: any[] = [
  {
    path: '/',
    component: () => import('@/pages/HomeView.vue'),
  },
  {
    path: '/about',
    component: () => import('@/pages/AboutView.vue'),
  },
];

export default routes;
