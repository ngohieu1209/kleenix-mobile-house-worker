import axios from 'axios';
import axiosInstance, { endpoints } from '../../utils/axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authApi = {
  login: async (loginData) => {
    const { data } = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/house-worker/auth/login`, loginData);
    return data;
  },
  changePassword: async(eventData) => {
    const { data } = await axiosInstance.post(endpoints.auth.changePassword, eventData)
    return data.result
  }
}

export default authApi;