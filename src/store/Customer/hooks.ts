import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, CustomerState } from 'store/Customer';

export const useCustomerDispatch = () => useDispatch<AppDispatch>();
export const useCustomerSelector: TypedUseSelectorHook<CustomerState> =
  useSelector;
