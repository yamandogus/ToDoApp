import { api } from './api';

export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export const getCategories = async (token?: string): Promise<Category[]> => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const response = await api.get('/api/categories', { headers });
  return response.data.data;
};