import axios from 'axios';
import { REACT_APP_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authApi = {
  login: async (loginData) => {
    console.log('winter-loginData', loginData)
    const { data } = await axios.post(`${REACT_APP_API_URL}/house-worker/auth/login`, loginData);
    console.log('winter-data', data)
    const token = data.result.token
    await AsyncStorage.setItem('accessToken', token.accessToken);
    await AsyncStorage.setItem('refreshToken', token.refreshToken);
    return data;
  }
}

export default authApi;