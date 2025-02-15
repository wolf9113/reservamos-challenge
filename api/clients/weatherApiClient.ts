import axios from 'axios';

const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/3.0';

/**
 * Axios instance configured for the weather API
 */
const weatherApiClient = axios.create({
  baseURL: WEATHER_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to log requests
weatherApiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor to handle errors
weatherApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default weatherApiClient;
