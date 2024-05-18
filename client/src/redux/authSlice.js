import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
  userId: localStorage.getItem('userId') || null,
  role: localStorage.getItem('role') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.userId = user.id;
      state.role = user.role;

      // Save to localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('role', user.role);
    },
    removeAccessToken: (state) => {
      state.accessToken = null;
      state.userId = null;
      state.role = null;

      // Remove from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
    },
  },
});

export const { setAccessToken, removeAccessToken } = authSlice.actions;
export default authSlice.reducer;
