import React, { useState, useEffect } from 'react';
import { View, Platform, Keyboard, Dimensions } from 'react-native';
import { styles } from '@/screens/AiChat/AiChatScreen.styles';
import ChatList from '@/components/AiChat/ChatList';
import ChatInput from '@/components/AiChat/ChatInput';
import useChat from '@/hooks/AiChat/useChat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const AiChatScreen = () => {
  const { messages, input, setInput, sendMessage, flatListRef } = useChat();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAuthenticated = useSelector((state: any) => state.user?.isAuthenticated);

  // 각 메시지 전송 후 스크롤을 아래로 이동
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // 로컬 상태와 Redux 상태를 동기화
  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  useFocusEffect(
    React.useCallback(() => {
      const checkAuth = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          console.log('화면 포커스 - 토큰 확인:', token);
          if (!token) {
            router.replace('/(tabs)/loginTab');
            return;
          }
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
      <View style={styles.chatContainer}>
        <ChatList ref={flatListRef} messages={messages} />
        <ChatInput input={input} setInput={setInput} onSend={() => {
          sendMessage();
          // 메시지 전송 후 스크롤을 아래로 이동
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }} />
      </View>
  );
};

export default AiChatScreen;