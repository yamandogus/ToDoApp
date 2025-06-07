import { createSlice } from '@reduxjs/toolkit'


const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
})

export default todoSlice.reducer 