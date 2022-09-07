import CustomerLayout from 'layouts/Home';
import { Outlet } from 'react-router-dom';
import { useCustomerSelector } from 'store/Customer/hooks';
import { isShowInfo, isShowPurchaseDetail } from 'store/Customer/selectors';
import MyInformationDialog from './MyInformationDialog';
import PurchaseHistory from './PurchaseHistory';

const Customer = () => {
  const showInfo = useCustomerSelector(isShowInfo);
  const showPurchaseHistory = useCustomerSelector(isShowPurchaseDetail);
  return (
    <CustomerLayout>
      <>
        <Outlet />
        {showInfo && <MyInformationDialog />}
      </>
    </CustomerLayout>
  );
};

export default Customer;
