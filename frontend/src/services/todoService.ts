import { api } from './api';
import { FilterOptions } from '@/components/todo/TodoFilter';

export interface TodoPayload {
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate: string;
  category_ids?: string[];
}

export interface TodoListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  priority?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TodoListResponse {
  status: string;
  data: {
    data: any[];
    meta: {
      pagination: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
        from: number;
        to: number;
      };
    };
  };
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

export const getTodos = async (params: TodoListParams = {}, token?: string): Promise<TodoListResponse> => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  
  // Query parametreleri
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.search) searchParams.append('q', params.search);
  if (params.status) searchParams.append('status', params.status);
  if (params.priority) searchParams.append('priority', params.priority);
  if (params.sortBy) searchParams.append('sort', params.sortBy);
  if (params.sortOrder) searchParams.append('order', params.sortOrder);

  const queryString = searchParams.toString();
  const url = queryString ? `/api/todos?${queryString}` : '/api/todos';
  
  const response = await api.get(url, { headers });
  return response.data;
};

export const searchTodos = async (query: string, token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const response = await api.get(`/api/todos/search?q=${encodeURIComponent(query)}`, { headers });
  return response.data;
};

export const updateTodoStatus = async (id: string, status: string, token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const response = await api.patch(`/api/todos/${id}/status`, { status }, { headers });
  return response.data;
}; 