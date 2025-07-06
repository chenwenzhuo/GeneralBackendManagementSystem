import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

const Login = lazy(() => import('@/pages/login/Login'));
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'));
const Home = lazy(() => import('@/pages/home/Home'));
const NotFound = lazy(() => import('@/pages/error/NotFound'));

const CustomSuspense = ({ children }: any) => <Suspense fallback={<Spin />}>{children}</Suspense>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: (
      <CustomSuspense>
        <Login />
      </CustomSuspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <CustomSuspense>
        <AdminLayout />
      </CustomSuspense>
    ),
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      {
        path: 'home',
        element: (
          <CustomSuspense>
            <Home />
          </CustomSuspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <CustomSuspense>
        <NotFound />
      </CustomSuspense>
    ),
  },
]);

export default router;
