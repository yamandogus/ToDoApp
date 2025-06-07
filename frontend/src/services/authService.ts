import axios from 'axios';
import toast from 'react-hot-toast';

export const BASE_URL = 'http://localhost:3000';

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  name: string;
  username: string;
  password: string;
  verifyPassword: string;
}

export const authService = {
  login: async (data: LoginData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, data);
      const responseData = response.data;
      
      if (responseData.status === 'success' && responseData.data?.token) {
        localStorage.setItem('token', responseData.data.token);
        toast.success('Giriş başarılı');
        return responseData;
      }
      throw new Error('Invalid response format');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Giriş yapılırken bir hata oluştu');
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Başarıyla kayıt olundu!');
      }
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Kayıt olurken bir hata oluştu');
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    toast.success('Başarıyla çıkış yapıldı!');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
}; 