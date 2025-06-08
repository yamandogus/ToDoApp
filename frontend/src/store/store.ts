import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './slices/todoSlice'
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    todos: todoSlice,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 