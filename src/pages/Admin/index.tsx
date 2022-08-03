import AdminLayout from 'layouts/Admin';
import { Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default Admin;
