import { CustomerState } from './index';
export const getCategories = (state: CustomerState) =>
  state.homeReducer.categories;

export const getNewProducts = (state: CustomerState) =>
  state.homeReducer.newProducts;

export const getPromotionalProducts = (state: CustomerState) =>
  state.homeReducer.promotionalProducts;

export const getFeatureProducts = (state: CustomerState) =>
  state.homeReducer.featureProducts;

export const getAnotherProducts = (state: CustomerState) =>
  state.homeReducer.anotherProducts;

export const getProduct = (state: CustomerState) => state.homeReducer.product;

export const getCart = (state: CustomerState) => state.homeReducer.cart;

export const getProducts = (state: CustomerState) => state.homeReducer.products;
export const getSearch = (state: CustomerState) => state.homeReducer.search;
export const getAccessTokenRedux = (state: CustomerState) =>
  state.homeReducer.accessToken;
export const getUser = (state: CustomerState) => state.homeReducer.user;

export const isShowInfo = (state: CustomerState) =>
  state.homeReducer.isShowInfo;

export const isShowPurchaseDetail = (state: CustomerState) =>
  state.homeReducer.isShowPurchaseDetail;

export const getOrderId = (state: CustomerState) => state.homeReducer.orderId;

export const getMyOrders = (state: CustomerState) => state.homeReducer.myOrders;
