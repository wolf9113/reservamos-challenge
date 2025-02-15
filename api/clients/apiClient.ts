import axios from 'axios';

const SERVER_BASE_URL = 'https://search.reservamos.mx/api/v2';

const apiClient = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = 'TOKEN';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
