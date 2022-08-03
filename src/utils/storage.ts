import { User } from "types/Customer/home";

const ACCESS_TOKEN_KEY: string = 'access_token_sharma_shop';

export const setAccessToken = (value: {accessToken: string, user: User}) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(value));
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const removeAccessToken = () =>
  localStorage.removeItem(ACCESS_TOKEN_KEY);
