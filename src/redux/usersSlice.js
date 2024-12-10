import { createSlice } from '@reduxjs/toolkit';
import mockData from '../mockData'; // Assume this is your mock API data

const usersSlice = createSlice({
  name: 'users',
  initialState: mockData,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.findIndex(user => user.id === action.payload.id);
      if (index >= 0) {
        state[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      return state.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;