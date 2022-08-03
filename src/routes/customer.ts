import { lazy } from 'react';

const Main = lazy(() => import('pages/Customer/Main'));
const Cart = lazy(() => import('pages/Customer/Cart'));
const SignUp = lazy(() => import('pages/Customer/SignUp'));
const SignIn = lazy(() => import('pages/Customer/SignIn'));
const Products = lazy(() => import('pages/Customer/Products'));
const Search = lazy(() => import('pages/Customer/Search'));
const Checkout = lazy(() => import('pages/Customer/Checkout'));
const Success = lazy(() => import('pages/Customer/Success'));

export const customerRoutes = [
  {
    path: '',
    Component: Main,
  },
  {
    path: 'cart',
    Component: Cart,
  },
  {
    path: 'sign-up',
    Component: SignUp,
  },
  {
    path: 'sign-in',
    Component: SignIn,
  },
  {
    path: 'new-products',
    Component: Products,
  },
  {
    path: 'promotional-products',
    Component: Products,
  },
  {
    path: 'feature-products',
    Component: Products,
  },
  {
    path: 'products',
    Component: Products,
  },
  {
    path: 'product-group/:productGroupId',
    Component: Products,
  },
  {
    path: 'product-type/:productTypeId',
    Component: Products,
  },
  {
    path: 'search',
    Component: Search,
  },
  {
    path: 'checkout',
    Component: Checkout,
  },
  {
    path: 'success',
    Component: Success,
  },
  // {
  //   path: '',
  //   Component: ,
  // },
];
