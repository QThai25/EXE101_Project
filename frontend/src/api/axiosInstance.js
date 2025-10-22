import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { getItem } from '../utils/storage';

function resolveApiBase() {
  try {
    const FIXED_API_BASE = 'http://10.10.2.210:5000/api';

    if (FIXED_API_BASE) {
      console.log('✅ Using fixed API base:', FIXED_API_BASE);
      return FIXED_API_BASE;
    }

    const debuggerHost = Constants.manifest?.debuggerHost || Constants.expoConfig?.hostUri;
    if (debuggerHost) {
      const host = debuggerHost.split(':')[0];
      const url = `http://${host}:5000/api`;
      console.log('✅ Using debugger host API base:', url);
      return url;
    }

    if (Platform.OS === 'android') {
      console.log('✅ Using Android emulator API base');
      return 'http://10.0.2.2:5000/api';
    }

    if (Platform.OS === 'ios') {
      console.log('✅ Using iOS simulator API base');
      return 'http://localhost:5000/api';
    }

    console.log('✅ Using default localhost API base');
    return 'http://localhost:5000/api';
  } catch (error) {
    console.error('❌ resolveApiBase error:', error);
    return 'http://localhost:5000/api';
  }
}

const BASE_URL = resolveApiBase();
console.log('🌐 Final API Base URL:', BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('⚠️ axios interceptor getItem token error:', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
