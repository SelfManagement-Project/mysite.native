import React from 'react';
import { TextInput, TouchableOpacity, Text } from 'react-native';

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLogin: () => void;
  handleKakaoLogin: () => void;
  theme: any; // You can create a proper type for your theme
}

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
  handleKakaoLogin,
  theme,
}: LoginFormProps) => {
  return (
    <>
      <TextInput
        style={theme.input}
        placeholder="이메일"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={theme.input}
        placeholder="비밀번호"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={theme.button} onPress={handleLogin}>
        <Text style={theme.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={theme.button} onPress={handleKakaoLogin}>
        <Text style={theme.buttonText}>카카오 로그인</Text>
      </TouchableOpacity>
    </>
  );
};

export default LoginForm;