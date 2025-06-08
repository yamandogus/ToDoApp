import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/services/api';

// CategoryPage ile senkronize
interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;
  created_at?: string; // Opsiyonel alan
  categories?: Array<{ categoryId: string; Category: any }>; // Backend yapısı
  category_ids: string[]; // Dönüşüm sonrası
}

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (token: string) => {
    const response = await api.get('/api/todos', { 
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API response from /api/todos:", response.data); 
    return response.data.data.data; 
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [] as Todo[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    clearTodos: (state) => {
      state.todos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const rawTodos = action.payload || [];
        state.todos = rawTodos.map((todo: any) => ({
          ...todo,
          category_ids: todo.categories ? todo.categories.map((cat: any) => cat.categoryId) : [],
        }));
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Görevler yüklenemedi';
      });
  },
})

export default todoSlice.reducer 