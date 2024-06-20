import { configureStore } from '@reduxjs/toolkit';
import users from './cultivation.slice';
import allUsers from './user.slice';
import userRoles from './userRoles.slice';

export const store = configureStore({
  reducer: {
    users,
    allUsers,
    userRoles,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;