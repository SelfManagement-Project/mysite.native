// src/screens/Auth/LoginScreen.tsx 수정
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { styles, darkStyles } from './LoginScreen.styles';
import useLoginForm from '@/hooks/Auth/useLoginForm';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 임포트

const LoginScreen = () => {
  const {
    email, password, setEmail, setPassword, 
    handleLogin, handleKakaoLogin
  } = useLoginForm();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkStyles : styles;

  return (
    <View style={theme.container}>
      {/* 뒤로가기 버튼 추가 */}
      <TouchableOpacity
        // onPress={() => navigation.goBack()} 
        style={theme.backButton || { position: 'absolute', top: 40, left: 20 }}
      >
        <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? '#fff' : '#333'} />
      </TouchableOpacity>

      <Text style={theme.title}>로그인</Text>
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
    </View>
  );
};

export default LoginScreen;