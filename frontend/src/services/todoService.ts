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