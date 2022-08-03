import { lazy } from 'react';

const Products = lazy(() => import('pages/Admin/Products'));

export const adminRoutes = [
  {
    path: 'products',
    Component: Products,
  },
];
