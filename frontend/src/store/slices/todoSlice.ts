import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/services/api';

interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  category_ids: string[];
}

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (token: string) => {
    const response = await api.get('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data.todos;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Görevler yüklenemedi';
      });
  },
})

export default todoSlice.reducer 