import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { styles } from '@/screens/AiChat/AiChatScreen.styles';
import ChatList from '@/components/AiChat/ChatList';
import ChatInput from '@/components/AiChat/ChatInput';
import useChat from '@/hooks/AiChat/useChat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

interface AiChatScreenProps {
  sessionId?: string | null;
  title?: string | null;
}

const AiChatScreen: React.FC<AiChatScreenProps> = ({ sessionId, title }) => {
  const { messages, input, setInput, sendMessage, flatListRef, isLoading } = useChat();
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

  useEffect(() => {
    if (sessionId) {
      // sessionId가 있으면 해당 대화 내용 불러오기
      console.log('대화 불러오기:', sessionId, title);
      // 여기서 데이터를 로드하는 함수를 호출...
    } else {
      // 새 대화 시작
      console.log('새 대화 시작');
      // 필요한 초기화 로직...
    }
  }, [sessionId, title]);

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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F6BFF" />
        <Text style={{ marginTop: 16, color: '#666' }}>대화 내용을 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 채팅 헤더 */}
      <View style={styles.chatHeader}>
        <Text style={styles.chatTitle}>{title ? title : '새 대화'}</Text>
      </View>

      {/* 세션 정보 (존재하는 대화인 경우에만 표시) */}
      {sessionId && title && (
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionTitle}>{title}</Text>
          <Text style={styles.sessionMeta}>
            대화 ID: {sessionId.substring(0, 8)}... • 메시지 {messages.length}개
          </Text>
        </View>
      )}

      {/* 채팅 내용 */}
      <View style={styles.messagesContainer}>
        {messages.length === 0 ? (
          <View style={styles.emptyChat}>
            <Ionicons name="chatbubble-ellipses-outline" size={70} color="#4F6BFF" />
            <Text style={styles.emptyTitle}>
              AI와 새로운 대화를 시작해보세요
            </Text>
            <Text style={styles.emptySubtitle}>
              궁금한 점이나 도움이 필요한 내용을 질문해보세요. AI가 답변해 드립니다.
            </Text>
          </View>
        ) : (
          <ChatList ref={flatListRef} messages={messages} />
        )}
      </View>

      {/* 채팅 입력 */}
      <View style={styles.inputContainer}>
        <ChatInput 
          input={input} 
          setInput={setInput} 
          onSend={() => {
            sendMessage();
            // 메시지 전송 후 스크롤을 아래로 이동
            setTimeout(() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
          }} 
        />
      </View>
    </SafeAreaView>
  );
};

export default AiChatScreen;