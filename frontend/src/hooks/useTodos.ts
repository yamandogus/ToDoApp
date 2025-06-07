import { useState } from 'react';
import { createTodo, TodoPayload, updateTodo as updateTodoService, deleteTodo as deleteTodoService } from '@/services/todoService';

export function useTodos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTodo = async (payload: TodoPayload, token?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createTodo(payload, token);
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
    try {
      return await updateTodoService(id, payload, token);
    } catch (err) {
      throw err;
    }
  };

  // Todo silme fonksiyonu
  const deleteTodo = async (id: string, token?: string) => {
    try {
      return await deleteTodoService(id, token);
    } catch (err) {
      throw err;
    }
  };

  return { addTodo, loading, error, updateTodo, deleteTodo };
}
