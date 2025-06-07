import { useState } from 'react';
import { createTodo, TodoPayload } from '@/services/todoService';

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

  return { addTodo, loading, error };
}
