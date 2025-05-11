import { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/action/Auth/authActions';
import { AppDispatch } from '@/redux/store';
import { router, useLocalSearchParams } from 'expo-router';

const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { redirect } = useLocalSearchParams<{ redirect?: string }>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('알림', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(login({ email, password })).unwrap();
      
      // 리다이렉션 경로가 있으면 해당 경로로, 없으면 홈으로
      if (redirect) {
        router.replace(redirect as any);
      } else {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('❌ 로그인 오류:', error);
      Alert.alert('로그인 실패', '이메일 또는 비밀번호가 잘못되었습니다.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleKakaoLogin = () => {
    console.log('카카오 로그인 버튼 클릭됨!');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleKakaoLogin,
    isLoading,
  };
};

export default useLoginForm;
