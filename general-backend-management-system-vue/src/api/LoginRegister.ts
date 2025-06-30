import axiosInstance from '@/api/index';

// 注册
export const register = (data: any) => {
  const { username, password } = data;

  return axiosInstance.post('/api/register', {
    account: username,
    password,
  });
};

// 登录
export const login = (data: any) => {
  const { username, password } = data;

  return axiosInstance.post('/api/login', {
    account: username,
    password,
  });
};
