import axios from 'axios';

// Add a request interceptor to automatically add the token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Axios Interceptor - Token:', token ? 'Found' : 'Not found');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Axios Interceptor - Added Authorization header');
    }
    return config;
  },
  (error) => {
    console.error('Axios Interceptor - Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axios;
