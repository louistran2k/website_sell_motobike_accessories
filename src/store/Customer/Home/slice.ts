import {
  CartItemType,
  Product,
  ProductType,
  CustomerOrder,
  User,
} from './../../../types/Customer/home';
import {
  getAllProductGroupAsync,
  getAllProductTypeAsync,
  getFeatureProductsAsync,
  getNewProductsAsync,
  getProductByIdAsync,
  getProductsWithRangeAsync,
  getPromotionalProductsAsync,
  getRandomProductsAsync,
  searchByName,
  signIn,
} from './thunkActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomeState } from 'types/Customer/home';
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from 'utils/storage';

export const convertCurrency = (price: number) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);

export const productInit: Product = {
  productId: '',
  productName: '',
  description: '',
  images: [],
  isNew: false,
  unit: '',
  quantityInStock: 0,
  manufacturerName: '',
  warrantyPeriod: 0,
  price: 0,
  discountPercent: 0,
  discountPrice: 0,
  productTypeId: -1,
  productGroupId: -1,
};

const userInit: User = {
  citizenIdentification: '',
  firstName: '',
  lastName: '',
  gender: false,
  dateOfBirth: null,
  address: '',
  email: '',
  phoneNumber: '',
  taxCode: '',
};

export const initialState: HomeState = {
  categories: [],
  newProducts: [],
  promotionalProducts: [],
  featureProducts: [],
  anotherProducts: [],
  product: productInit,
  motorcycles: [],
  cart: [],
  products: [],
  search: [],
  accessToken:
    getAccessToken() !== null
      ? JSON.parse(getAccessToken() as string).accessToken
      : '',
  user:
    getAccessToken() !== null
      ? JSON.parse(getAccessToken() as string).user
      : userInit,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<CartItemType>) => {
      let isAdd = true;
      state.cart.forEach((item) => {
        if (item.product.productId === payload.product.productId) {
          item.quantity += payload.quantity;
          isAdd = false;
        }
      });
      isAdd && state.cart.push({ ...payload });
    },
    setQuantityCartItem: (state, { payload }) => {
      state.cart.forEach((item) => {
        if (item.product.productId === payload.productId) {
          item.quantity = payload.quantity;
        }
      });
    },
    logout: (state) => {
      console.log(123);
      removeAccessToken();
      // Object.assign(state, initialState);
      state.accessToken = null;
      state.user = userInit;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllProductGroupAsync.fulfilled, (state, { payload }) => {
      state.categories = payload.data;
    });
    builder.addCase(getAllProductTypeAsync.fulfilled, (state, { payload }) => {
      state.categories.forEach((item) => {
        item.productTypes = payload.data.filter(
          (item1: ProductType) => item1.groupId === item.id
        );
      });
    });
    builder.addCase(getNewProductsAsync.fulfilled, (state, { payload }) => {
      state.newProducts = payload.data.map((item: any) => ({
        ...item,
        images: item.images.split('|'),
      }));
    });
    builder.addCase(
      getPromotionalProductsAsync.fulfilled,
      (state, { payload }) => {
        state.promotionalProducts = payload.data.map((item: any) => ({
          ...item,
          images: item.images.split('|'),
        }));
      }
    );
    builder.addCase(getFeatureProductsAsync.fulfilled, (state, { payload }) => {
      state.featureProducts = payload.data.map((item: any) => ({
        ...item,
        images: item.images.split('|'),
      }));
    });
    builder.addCase(getRandomProductsAsync.fulfilled, (state, { payload }) => {
      state.anotherProducts = payload.data.map((item: any) => ({
        ...item,
        images: item.images.split('|'),
      }));
    });
    builder.addCase(getProductByIdAsync.fulfilled, (state, { payload }) => {
      state.product = {
        ...payload.data,
        images: payload.data.images.split('|'),
      };
    });
    builder.addCase(
      getProductsWithRangeAsync.fulfilled,
      (state, { payload }) => {
        state.products = payload.data.map((item: any) => ({
          ...item,
          images: item.images.split('|'),
        }));
      }
    );
    builder.addCase(searchByName.fulfilled, (state, { payload }) => {
      state.search = payload.data.map((item: any) => ({
        ...item,
        images: item.images.split('|'),
      }));
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.accessToken = payload.data.accessToken;
      setAccessToken(payload.data);
      state.user = payload.data.user;
    });
  },
});

const { reducer: homeReducer } = homeSlice;

export const { addToCart, setQuantityCartItem, logout } = homeSlice.actions;

export default homeReducer;
