import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { styles } from '@/screens/AiChat/AiChatScreen.styles';
import ChatList from '@/components/AiChat/ChatList';
import ChatInput from '@/components/AiChat/ChatInput';
import useChat from '@/hooks/AiChat/useChat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const AiChatScreen = () => {
  const { messages, input, setInput, sendMessage, flatListRef } = useChat();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAuthenticated = useSelector((state: any) => state.user?.isAuthenticated);

  // 로컬 상태와 Redux 상태를 동기화
  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated); 
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);
  // 시작하기 버튼 핸들러 함수

  useFocusEffect(
    React.useCallback(() => {
      const checkAuth = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          console.log('화면 포커스 - 토큰 확인:', token);
          if (!token) {
            router.replace('/(tabs)/LoginTab');
            return;
          }
          // 토큰이 존재하면 로그인 상태로 설정
          setIsLoggedIn(!!token);
        } catch (error) {
          console.error('토큰 확인 중 오류:', error);
          setIsLoggedIn(false);
        }
      };

      checkAuth();
    }, [])
  );


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.chatContainer}>
        <ChatList ref={flatListRef} messages={messages} />
        <ChatInput input={input} setInput={setInput} onSend={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AiChatScreen;