import { api } from './api';

export interface TodoPayload {
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate: string;
  category_ids?: string[];
}

export const createTodo = async (payload: TodoPayload, token?: string) => {
    console.log(payload);
    console.log(token);
  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : undefined;
  const response = await api.post('/api/todos', payload, { headers });
  return response.data;
};

export const updateTodo = async (id: string, payload: Partial<TodoPayload>, token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const response = await api.put(`/api/todos/${id}`, payload, { headers });
  return response.data;
};

export const deleteTodo = async (id: string, token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const response = await api.delete(`/api/todos/${id}`, { headers });
  return response.data;
}; 