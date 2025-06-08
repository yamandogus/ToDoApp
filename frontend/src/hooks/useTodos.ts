import { useState } from 'react';
import { createTodo, TodoPayload, updateTodo as updateTodoService, deleteTodo as deleteTodoService } from '@/services/todoService';

export function useTodos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTodo = async (payload: TodoPayload, token?: string) => {
    setLoading(true);
    setError(null);
    const finalToken = token || localStorage.getItem('token') || undefined;
    try {
      const data = await createTodo(payload, finalToken);
      return data;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Todo güncelleme fonksiyonu
  type UpdateTodoPayload = Partial<TodoPayload>;

  const updateTodo = async (id: string, payload: UpdateTodoPayload, token?: string) => {
    setLoading(true);
    setError(null);
    const finalToken = token || localStorage.getItem('token') || undefined;
    try {
      const data = await updateTodoService(id, payload, finalToken);
      return data;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Todo silme fonksiyonu
  const deleteTodo = async (id: string, token?: string) => {
    setLoading(true);
    setError(null);
    const finalToken = token || localStorage.getItem('token') || undefined;
    try {
      const data = await deleteTodoService(id, finalToken);
      return data;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Bir hata oluştu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addTodo, loading, error, updateTodo, deleteTodo };
}
