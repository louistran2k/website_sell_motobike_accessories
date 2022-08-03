import CustomerLayout from "layouts/Home"
import { Outlet } from "react-router-dom"

const Customer = () => {
  return (
    <CustomerLayout>
      <Outlet />
    </CustomerLayout>
  )
}

export default Customer;