import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_URL } from '@env';
import axios from 'axios';

// ----------------------------------------------------------------------
const axiosInstance = axios.create({ baseURL: REACT_APP_API_URL });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    login: '/house-worker/auth/login',
    logout: '/house-worker/auth/logout',
    changePassword: '/house-worker/auth/change-password'
  },
  user: {
    getMe: '/house-worker/get-me',
    edit: '/house-worker/edit',
  },
  assignment: {
    acceptBooking: '/house-worker/assignment/accept-booking',
    updateStatusBooking: '/house-worker/assignment/update-status-booking',
    completedBooking: '/house-worker/assignment/completed-booking',
    listBooking: '/house-worker/assignment/list-booking',
    detail: '/booking/detail',
  },
  schedule: {
    listAssignment: '/house-worker/schedule/list-assignment',
  }
};