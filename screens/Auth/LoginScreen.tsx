import React from 'react';
import { View, useColorScheme } from 'react-native';
import { styles, darkStyles } from './LoginScreen.styles';
import useLoginForm from '@/hooks/Auth/useLoginForm';
import BackButton from '@/components/Auth/BackButton';
import LoginForm from '@/components/Auth/LoginForm';
import LoginHeader from '@/components/Auth/LoginHeader';

const LoginScreen = () => {
  const {
    email, password, setEmail, setPassword, 
    handleLogin, handleKakaoLogin
  } = useLoginForm();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkStyles : styles;

  return (
    <View style={theme.container}>
      <BackButton theme={theme} />
      <LoginHeader theme={theme} />
      <LoginForm 
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleKakaoLogin={handleKakaoLogin}
        theme={theme}
      />
    </View>
  );
};

export default LoginScreen;