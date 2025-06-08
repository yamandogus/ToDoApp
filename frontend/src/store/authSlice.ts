import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  username: string | null;
  userId: string | null;
  name: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

const storedToken = localStorage.getItem('token');
const storedUsername = localStorage.getItem('username');
const storedUserId = localStorage.getItem('userId');
const storedName = localStorage.getItem('name');
const storedRole = localStorage.getItem('role');

const initialState: AuthState = {
  token: storedToken,
  username: storedUsername,
  userId: storedUserId,
  name: storedName,
  role: storedRole,
  isAuthenticated: !!storedToken, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; username: string }>) => {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.username);
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<{
      id: string;
      name: string;
      username: string;
      role: string;
      token: string;
    }>) => {
      state.userId = action.payload.id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("userId", action.payload.id);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
      state.token = null;
      state.username = null;
      state.userId = null;
      state.name = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;