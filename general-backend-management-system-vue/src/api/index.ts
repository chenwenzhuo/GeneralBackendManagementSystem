import axios, { AxiosInstance } from 'axios';

// 创建 Axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api', // 基础 API 地址
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
