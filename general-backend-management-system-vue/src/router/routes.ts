const routes: any[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/pages/admin/AdminLayout.vue'),
    redirect: '/admin/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/home/HomeView.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/error/NotFound.vue'),
  },
];

export default routes;
