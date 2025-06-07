import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../services/authService';
import { setCredentials, logout as logoutAction } from '../store/authSlice';

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

export const useAuth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(data);
      
      if (response.data?.user && response.data?.token) {
        dispatch(setCredentials({
          token: response.data.token,
          username: response.data.user.username
        }));
        return response;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Giriş yapılırken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(data);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Kayıt olurken bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    dispatch(logoutAction());
  };

  return {
    login,
    register,
    logout,
    loading,
    error,
    isAuthenticated: authService.isAuthenticated()
  };
}; 