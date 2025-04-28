// src/redux/slices/urlSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const urlSlice = createSlice({
  name: 'url',
  initialState: {
    // AppUrl: __DEV__ ? 'http://192.168.219.178:9000' : 'http://3.35.170.116',  // 개발용/서버용
    AppUrl: 'http://192.168.0.5:9000',  // 개발용/서버용
  },
  reducers: {
    setAppUrl: (state, action) => {
      state.AppUrl = action.payload;
    },

  }
});

export const { setAppUrl } = urlSlice.actions;
export default urlSlice.reducer;