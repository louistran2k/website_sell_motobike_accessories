import { ISignIn } from './../../../types/Customer/home';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from 'api/axiosClient';

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
