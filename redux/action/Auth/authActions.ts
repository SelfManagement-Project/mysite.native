import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '@/service/Auth/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    logout as logoutAction
} from '@/redux/reducers/Auth/authReducer';

export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, { dispatch }) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const userRaw = await AsyncStorage.getItem('user');

            if (token && userRaw) {
                const user = JSON.parse(userRaw);
                dispatch(loginSuccess(user)); // Redux 상태 복구
            } else {
                dispatch(logoutAction()); // 상태 초기화
            }
        } catch (error) {
            console.error('초기 로그인 상태 복원 실패:', error);
            dispatch(logoutAction());
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { dispatch }) => {
        try {
            dispatch(loginRequest());
            const response = await loginApi(email, password);
            if (response?.token) {
                await AsyncStorage.setItem('token', response.token);
                await AsyncStorage.setItem('user', JSON.stringify(response));
            }

            dispatch(loginSuccess(response));
            return response;
        } catch (error: any) {
            const message = error.response?.data?.message || '로그인 실패';
            dispatch(loginFailure(message));
            throw error;
        }
    }
);


export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('token');
            dispatch(logoutAction());
            return true;
        } catch (error) {
            console.error('로그아웃 실패:', error);
            throw error;
        }
    }
);