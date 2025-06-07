import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './slices/todoSlice'
import categorySlice from './slices/categorySlice'
import authReducer from './authSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    todos: todoSlice,
    categories: categorySlice,
    auth: authReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 