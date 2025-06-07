import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
  name: string | null;
  username: string | null;
  role: string | null;
  token: string | null;
}

const initialState: UserState = {
  userId: null,
  name: null,
  username: null,
  role: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
    },
    clearUser: (state) => {
      state.userId = null;
      state.name = null;
      state.username = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
