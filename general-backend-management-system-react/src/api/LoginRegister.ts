import axiosInstance from '@/api/index';

export interface LoginRegisterDataType {
  username: string;
  password: string;
}

// 注册
export const register = (data: LoginRegisterDataType) => {
  const { username, password } = data;

  return axiosInstance.post('/api/register', {
    account: username,
    password,
  });
};

// 登录
export const login = (data: LoginRegisterDataType) => {
  const { username, password } = data;

  return axiosInstance.post('/api/login', {
    account: username,
    password,
  });
};
