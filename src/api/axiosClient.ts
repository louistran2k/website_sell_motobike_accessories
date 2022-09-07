import axios from 'axios';
import { getAccessToken } from 'utils/storage';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosClientWithToken = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosClientWithToken.interceptors.request.use((request) => {
  const accessToken = JSON.parse(getAccessToken() as string).accessToken;
  const authorizationString = `Bearer ${accessToken}`;
  request.headers && (request.headers['Authorization'] = authorizationString);
  return request;
});

export { axiosClient, axiosClientWithToken };
