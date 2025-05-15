// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/redux/reducers/Auth/authReducer';
import searchReducer from '@/redux/reducers/searchReducer';
import urlReducer from '@/redux/urlSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,  // 'user' 대신 'auth'로 변경
    url: urlReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;