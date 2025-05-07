import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles, darkStyles } from '@/screens/Home/homeTab/More/AuthUpdate/AuthUpdateScreen.styles'; 

const AuthUpdateScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? darkStyles : styles;

  const [name, setName] = useState('홍길동');
  const [email, setEmail] = useState('hong@example.com');
  const [password, setPassword] = useState('');

  const handleUpdate = () => {
    Alert.alert('수정 완료', '회원 정보가 업데이트되었습니다.');
    // 실제로는 API 호출 필요
  };

  return (
    <ScrollView contentContainerStyle={theme.container}>
      <Text style={theme.header}>👤 회원 정보 수정</Text>

      <Text style={theme.label}>이름</Text>
      <TextInput
        style={theme.input}
        value={name}
        onChangeText={setName}
        placeholder="이름을 입력하세요"
      />

      <Text style={theme.label}>이메일</Text>
      <TextInput
        style={theme.input}
        value={email}
        onChangeText={setEmail}
        placeholder="이메일을 입력하세요"
        keyboardType="email-address"
      />

      <Text style={theme.label}>비밀번호 변경</Text>
      <TextInput
        style={theme.input}
        value={password}
        onChangeText={setPassword}
        placeholder="새 비밀번호 입력"
        secureTextEntry
      />

      <TouchableOpacity style={theme.button} onPress={handleUpdate}>
        <Text style={theme.buttonText}>정보 수정하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



export default AuthUpdateScreen;
