import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { customerRoutes } from 'routes/customer';
import { adminRoutes } from 'routes/admin';
import { lazy, Suspense } from 'react';
import Loading from 'common/Customer/Components/Loading';
import Products from 'pages/Admin/Products';
const Customer = lazy(() => import('pages/Customer'));
const Admin = lazy(() => import('pages/Admin'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Customer />}>
            {customerRoutes.map(({ path, Component }, index) => (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loading />}>
                    <Component />
                  </Suspense>
                }
              />
            ))}
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Navigate to="products" />} />
            {adminRoutes.map(({ path, Component }, index) => (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loading />}>
                    <Component />
                  </Suspense>
                }
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
