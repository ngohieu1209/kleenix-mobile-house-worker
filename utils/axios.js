import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_URL } from '@env';
import axios from 'axios';

// ----------------------------------------------------------------------
const axiosInstance = axios.create({ baseURL: REACT_APP_API_URL });

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken && accessToken) {
        try {
          const res = await axiosInstance.post(`/house-worker/auth/refresh-token`, { refreshToken, accessToken });
          if (res.status === 200 || res.status === 201) {
            await AsyncStorage.setItem('accessToken', res.data.result.accessToken);
            await AsyncStorage.setItem('refreshToken', res.data.result.refreshToken);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.result.accessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (err) {
          return Promise.reject((err.response && err.response.data) || 'Something went wrong')
        }
      }
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong')
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    login: '/house-worker/auth/login',
    logout: '/house-worker/auth/logout',
  },
  user: {
    getMe: '/house-worker/get-me',
  },
  assignment: {
    new: '/booking/new',
    cancel: '/booking/cancel',
    listBooking: '/house-worker/assignment/list-booking',
    detail: '/booking/detail',
  },
  schedule: {
    listAssignment: '/house-worker/schedule/list-assignment',
  }
};