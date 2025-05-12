import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UrlState {
  AppUrl: string;
  PythonbaseUrl: string;
}

const initialState: UrlState = {
  // AppUrl: __DEV__ ? 'http://192.168.219.178:9000' : 'http://3.35.170.116',  // 개발용/서버용
  AppUrl: 'http://192.168.0.13:9000',  // 개발용/서버용
  PythonbaseUrl: 'http://192.168.0.13:8000',
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    setAppUrl: (state, action: PayloadAction<string>) => {
      state.AppUrl = action.payload;
    },
    setPythonBaseUrl: (state, action: PayloadAction<string>) => {
      state.PythonbaseUrl = action.payload;
    }
  }
});

export const { setAppUrl, setPythonBaseUrl } = urlSlice.actions;
export default urlSlice.reducer;