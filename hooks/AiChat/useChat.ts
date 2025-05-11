// hooks/AiChat/useChat.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type ChatMessage = {
  sender: 'user' | 'ai';
  text: string;
  timestamp?: string;
};

const useChat = (sessionId?: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [canSendMessage, setCanSendMessage] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const ws = useRef<WebSocket | null>(null);
  const typingInterval = useRef<NodeJS.Timeout | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  // Redux에서 URL 가져오기
  const baseWsUrl = useSelector((state: any) => 
    state.url.PythonbaseUrl.replace('http', 'ws')
  );
  const userId = 1;

  // 웹소켓 메시지 처리 함수를 useCallback으로 래핑
  const handleWebSocketMessage = useCallback((event: WebSocketMessageEvent) => {
    const data = JSON.parse(event.data);
    const aiContent = data.error || data.response;

    if (typingInterval.current) clearInterval(typingInterval.current);

    setIsLoading(false);
    setIsTyping(true);

    // 타이핑 효과로 AI 메시지 표시
    setMessages((prev) => [...prev, { sender: 'ai', text: '' }]);

    let charIndex = 0;
    typingInterval.current = setInterval(() => {
      setMessages((prev) => {
        const updatedMessages = [...prev];
        const lastIndex = updatedMessages.length - 1;
        updatedMessages[lastIndex].text = aiContent.slice(0, charIndex);
        return updatedMessages;
      });
      
      charIndex += 1;

      if (charIndex > aiContent.length) {
        if (typingInterval.current) clearInterval(typingInterval.current);
        setIsTyping(false);
      }
    }, 20);
  }, []);

  // 웹소켓 초기화 함수를 useCallback으로 래핑
  const initWebSocket = useCallback(async (chatId: string) => {
    // 기존 웹소켓 연결 닫기
    if (ws.current) {
      ws.current.close();
    }

    const token = await AsyncStorage.getItem('token');
    
    if (!token || !userId) {
      console.error('토큰 또는 사용자 ID가 없습니다.');
      return;
    }

    // 웹소켓 연결 설정
    const wsUrl = `${baseWsUrl}/api/chat/ws/chat/${userId}/${chatId}`;
    console.log('웹소켓 연결 시도:', wsUrl);
    
    try {
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log('웹소켓 연결 성공');
        setCanSendMessage(true);
      };

      ws.current.onmessage = handleWebSocketMessage;

      ws.current.onclose = () => {
        console.log('웹소켓 연결 종료');
        setCanSendMessage(false);
      };

      ws.current.onerror = (error) => {
        console.error('웹소켓 오류:', error);
        setCanSendMessage(false);
      };
    } catch (error) {
      console.error('웹소켓 연결 실패:', error);
    }
  }, [baseWsUrl, userId, handleWebSocketMessage]);

  // 메시지 전송
  const sendMessage = useCallback(() => {
    if (!input.trim() || !canSendMessage || isLoading || isTyping || !ws.current) return;
    
    const userMessage: ChatMessage = { 
      sender: 'user', 
      text: input, 
      timestamp: new Date().toISOString() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    // 웹소켓으로 메시지 전송
    ws.current.send(JSON.stringify({ message: input }));
  }, [input, canSendMessage, isLoading, isTyping]);

  // 새 대화 시작 함수를 useCallback으로 래핑
  const handleNewChat = useCallback(() => {
    setMessages([]);
    setInput('');

    // 새 웹소켓 연결 생성
    const newChatId = Date.now().toString();
    initWebSocket(newChatId);
  }, [initWebSocket]);

  // 화면 포커스 효과 추가 - 화면이 포커스를 얻거나 잃을 때 웹소켓 연결 관리
  useFocusEffect(
    React.useCallback(() => {
      // 화면이 포커스를 얻었을 때 웹소켓 연결
      console.log('화면 포커스 얻음 - 웹소켓 연결 시도');
      const chat_id = sessionId ?? Date.now().toString();
      initWebSocket(chat_id);
      
      // 화면이 포커스를 잃었을 때 웹소켓 연결 종료
      return () => {
        console.log('화면 포커스 잃음 - 웹소켓 연결 종료');
        if (typingInterval.current) {
          clearInterval(typingInterval.current);
          typingInterval.current = null;
        }
        if (ws.current) {
          ws.current.close();
          ws.current = null;
        }
        setCanSendMessage(false);
      };
    }, [sessionId, initWebSocket])
  );

  // 컴포넌트 언마운트 시 정리 작업
  useEffect(() => {
    return () => {
      console.log('컴포넌트 언마운트 - 모든 리소스 정리');
      if (typingInterval.current) {
        clearInterval(typingInterval.current);
        typingInterval.current = null;
      }
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, []);
  
  return {
    messages,
    input,
    setInput,
    sendMessage,
    flatListRef,
    isLoading,
    isTyping,
    canSendMessage,
    handleNewChat
  };
};

export default useChat;