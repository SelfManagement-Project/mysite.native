// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/redux/reducers/Auth/userReducer';
import urlReducer from '@/redux/reducers/urlSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    url: urlReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;