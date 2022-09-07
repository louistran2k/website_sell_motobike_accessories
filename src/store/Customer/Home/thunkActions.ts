import {
  GetMyOrdersReq,
  ISignIn,
  ISignUp,
  ORDER_STATUS,
  User,
} from './../../../types/Customer/home';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient, axiosClientWithToken } from 'api/axiosClient';

export const getAllProductGroupAsync = createAsyncThunk(
  'productGroup/getAll',
  async () => {
    try {
      const res = await axiosClient.get('api/productGroup/getAll');
      return res;
    } catch (errors) {
      throw new Error(String(errors));
    }
  }
);

export const getAllProductTypeAsync = createAsyncThunk(
  'productType/getAll',
  async () => {
    try {
      const res = await axiosClient.get('api/productType/getAll');
      return res;
    } catch (errors) {
      throw new Error(String(errors));
    }
  }
);

export const fetchNewProducts = async (top?: number) => {
  try {
    const res = await axiosClient.get('api/product/getNewProducts', {
      params: {
        top,
      },
    });
    return res;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getNewProductsAsync = createAsyncThunk(
  'products/getNewProducts',
  fetchNewProducts
);

export const fetchFeatureProducts = async (top?: number) => {
  try {
    const res = await axiosClient.get('api/product/getFeatureProducts', {
      params: {
        top,
      },
    });
    return res;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getFeatureProductsAsync = createAsyncThunk(
  'products/getFeatureProducts',
  fetchFeatureProducts
);

export const fetchPromotionalProducts = async (top?: number) => {
  try {
    const res = await axiosClient.get('api/product/getTopPromotionalProducts', {
      params: {
        top,
      },
    });
    return res;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getPromotionalProductsAsync = createAsyncThunk(
  'products/getPromotionalProducts',
  fetchPromotionalProducts
);

export const getProductByIdAsync = createAsyncThunk(
  'products/getProductById',
  async (id: string) => {
    try {
      const res = await axiosClient.get('api/product/getProductById', {
        params: {
          id,
        },
      });
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const fetchRandomProducts = async () => {
  try {
    const res = await axiosClient.get('api/product/getRandomProducts');
    return res;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getRandomProductsAsync = createAsyncThunk(
  'products/getRandomProducts',
  fetchRandomProducts
);

export const fetchProductsWithRange = async (params: {
  min: number;
  max: number;
}) => {
  try {
    const res = await axiosClient.get('api/product/getProductsWithRange', {
      params: {
        min: params.min,
        max: params.max,
      },
    });
    return res;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getProductsWithRangeAsync = createAsyncThunk(
  'products/getProductsWithRange',
  fetchProductsWithRange
);

export const fetchProductsByGroupId = async (params: {
  groupId: number;
  min: number;
  max: number;
}) => {
  try {
    const res = await axiosClient.get('api/product/getProductsByGroupId', {
      params: {
        groupId: params.groupId,
        min: params.min,
        max: params.max,
      },
    });
    return res;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const fetchProductsByTypeId = async (params: {
  typeId: number;
  min: number;
  max: number;
}) => {
  try {
    const res = await axiosClient.get('api/product/getProductsByTypeId', {
      params: {
        typeId: params.typeId,
        min: params.min,
        max: params.max,
      },
    });
    return res;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const searchByName = createAsyncThunk(
  'products/search',
  async (search: string) => {
    try {
      const res = await axiosClient.get('api/product/searchByName', {
        params: {
          search,
        },
      });
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const signIn = createAsyncThunk(
  'customer/signIn',
  async ({ username, password }: ISignIn) => {
    try {
      const res = await axiosClient.post('api/account/sign-in', {
        username,
        password,
      });
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
export const signUp = createAsyncThunk(
  'customer/signUp',
  async ({
    username,
    password,
    citizenIdentification,
    lastName,
    firstName,
    gender,
    dateOfBirth,
    address,
    phoneNumber,
    email,
    taxCode,
  }: ISignUp) => {
    try {
      const res = await axiosClient.post('api/account/sign-up', {
        username,
        password,
        roleId: 'KH',
        citizenIdentification,
        lastName,
        firstName,
        gender,
        dateOfBirth,
        address,
        phoneNumber,
        email,
        taxCode,
      });
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
export const updateUserInformation = createAsyncThunk(
  'customer/update',
  async ({
    citizenIdentification,
    lastName,
    firstName,
    gender,
    dateOfBirth,
    address,
    phoneNumber,
    email,
    taxCode,
  }: User) => {
    try {
      const res = await axiosClientWithToken.post('api/customer/update', {
        citizenIdentification,
        lastName,
        firstName,
        gender,
        dateOfBirth,
        address,
        phoneNumber,
        email,
        taxCode,
      });
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const getMyOrdersAsync = createAsyncThunk(
  'customer/myOrders',
  async ({ status, citizenIdentification }: GetMyOrdersReq) => {
    try {
      const res = await axiosClientWithToken.get('api/customerOrder/getMyOrders', {
        params: {
          citizenIdentification,
          status,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const cancelOrderAsync = createAsyncThunk(
  'customer/cancelOrder',
  async (id: number) => {
    try {
      const res = await axiosClientWithToken.put(
        'api/customerOrder/cancelled',
        {
          status: 4,
        },
        {
          params: {
            id,
          },
        }
      );
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
