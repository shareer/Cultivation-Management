

import { createSlice } from '@reduxjs/toolkit';
import { getUserRoles } from '../services/UserService';
import { UserRolesState } from '../types/types';

const initialState: UserRolesState = {
  roles: [],
  status: 'idle',
  error: null,
};

const userRolesSlice = createSlice({
  name: 'userRoles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserRoles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roles = action.payload;
      })
      .addCase(getUserRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userRolesSlice.reducer;
