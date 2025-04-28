import axios from 'axios'; // AxiosResponse 제거
import AsyncStorage from '@react-native-async-storage/async-storage'
import { store } from '@/redux/store';

// 응답 타입 정의
export interface LoginResponse {
  apiData: {
      userId: number;
      email: string;
      username: string;
      token: string;
  }
}

export const loginApi = async (email: string, password: string) => {
  const { AppUrl } = store.getState().url;
  console.log('📤 로그인 요청:', email, password);
  console.log('📤 AppUrl:', AppUrl);

  // AxiosResponse 타입을 직접 지정하지 않고 axios의 제네릭 사용
  const response = await axios.post<LoginResponse>(
    `${AppUrl}/api/auth/login`,
    { email, password },
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  );

  const token = response.data?.apiData?.token;
  console.log('📥 로그인 응답:', token);
  if (token) {
    await AsyncStorage.setItem('token', token);
    console.log('✅ 저장된 토큰:', token);
  } else {
    console.warn('❌ 토큰이 응답에 없습니다.');
  }

  return response.data.apiData;
};