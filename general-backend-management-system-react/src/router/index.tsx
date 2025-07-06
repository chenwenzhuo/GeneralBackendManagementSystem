import { createBrowserRouter, Navigate } from 'react-router';

import App from '../App.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: 'home',
        element: <div>Home</div>,
      },
      {
        path: 'about',
        element: <div>About</div>,
      },
    ],
  },
]);

export default router;
