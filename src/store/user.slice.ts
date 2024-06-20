import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers } from '../services/UserService'
import { User } from '../types/types';
export interface UserState {
  allUsers: User[];
  status: string;
}

const initialState: UserState = {
  allUsers: [],
  status: ''
}

export const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.status = 'failed';
      })
  },
})

export const actions = allUsersSlice.actions
export default allUsersSlice.reducer