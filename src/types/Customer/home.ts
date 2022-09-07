import { isCitizenIdentification } from './../../utils/schemas';
export interface HomeState {
  categories: ProductGroup[];
  newProducts: Product[];
  promotionalProducts: Product[];
  featureProducts: Product[];
  anotherProducts: Product[];
  product: Product;
  motorcycles: string[];
  cart: CartItemType[];
  products: Product[];
  search: Product[];
  accessToken: string | null;
  user: User;
  isShowInfo: boolean;
  isShowPurchaseDetail: boolean;
  orderId: number;
  myOrders: CustomerOrderDTO[];
}

export interface ProductType {
  id: number;
  name: string;
  groupId: number;
}

export interface ProductGroup {
  id: number;
  name: string;
  productTypes: ProductType[];
}

export interface Product {
  productId: string;
  name: string;
  description: string;
  images: string[];
  isNew: boolean;
  unit: string;
  quantityInStock: number;
  manufacturerName: string;
  warrantyPeriod: number;
  price: number;
  discountPercent: number;
  discountPrice: number;
  productTypeId: number;
  productGroupId: number;
}

export interface ProductDTO {
  productId: string;
  name: string;
  description: string;
  image: string;
  isNew: boolean;
  unit: string;
  quantityInStock: number;
  manufacturerName: string;
  warrantyPeriod: number;
  price: number;
  discountPercent: number;
  discountPrice: number;
  productTypeId: number;
  productGroupId: number;
}

export interface CartItemType {
  product: Product;
  quantity: number;
}

export interface ISignUp {
  username: string;
  password: string;
  passwordConfirmation: string;
  citizenIdentification: string;
  firstName: string;
  lastName: string;
  gender: boolean;
  dateOfBirth: Date | null;
  address: string;
  email: string;
  phoneNumber: string;
  taxCode: string;
}

export interface ISignIn {
  username: string;
  password: string;
}

export const PAGE_MAX = 16;

export interface User {
  citizenIdentification: string;
  firstName: string;
  lastName: string;
  gender: number | null;
  dateOfBirth: Date | null;
  address: string;
  email: string;
  phoneNumber: string;
  taxCode: string;
}

export interface CustomerOrder {
  receiverFullName: string;
  deliveryAddress: string;
  receiverEmail: string;
  receiverPhoneNumber: string;
  createAt: Date;
  status: number;
  deliveryDate: Date | null;
  totalPrice: number;
  citizenIdentification: string;
}

export interface CustomerOrderDTO {
  id: number;
  receiverFullName: string;
  deliveryAddress: string;
  receiverEmail: string;
  receiverPhoneNumber: string;
  createAt: Date;
  status: number;
  deliveryDate: Date | null;
  totalPrice: number;
  citizenIdentification: string;
  customerOrderDetails: CustomerOrderDetail[];
}

export interface ProductCheckoutReq {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface CustomerOrderDetail {
  customerComment: string | null;
  customerMark: number | null;
  customerOrderId: number;
  orderQuantity: number;
  returnCardId: number | null;
  returnQuantity: number | null;
  totalPrice: number;
  product: ProductDTO;
}

export enum ORDER_STATUS {
  'Chờ xác nhận' = 1,
  'Đang giao',
  'Đã giao',
  'Đã hủy',
}

export interface GetMyOrdersReq {
  status: ORDER_STATUS;
  citizenIdentification: string;
}
