import React from 'react';
import { Text } from 'react-native';

interface LoginHeaderProps {
  theme: any; // You can create a proper type for your theme
}

const LoginHeader = ({ theme }: LoginHeaderProps) => {
  return <Text style={theme.title}>로그인</Text>;
};

export default LoginHeader;