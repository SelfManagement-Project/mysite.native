// hooks/AiChat/useChat.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

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
  const [userId, setUserId] = useState(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  // Redux에서 URL 가져오기
  const baseWsUrl = useSelector((state: any) =>
    state.url.PythonbaseUrl.replace('http', 'ws')
  );

  // 디바이스 ID 가져오기
  const getDeviceId = useCallback(async () => {
    try {
      // 저장된 디바이스 ID 확인
      let storedDeviceId = await AsyncStorage.getItem('device_id');
      
      // 없으면 DeviceInfo로 새로 생성
      if (!storedDeviceId) {
        // UniqueId는 비동기 함수
        const uniqueId = await DeviceInfo.getUniqueId();
        const deviceType = Platform.OS; // 'ios' 또는 'android'
        storedDeviceId = `mobile_${deviceType}_${uniqueId}`;
        
        // 디바이스 ID 저장
        await AsyncStorage.setItem('device_id', storedDeviceId);
      }
      
      console.log('디바이스 ID:', storedDeviceId);
      setDeviceId(storedDeviceId);
      return storedDeviceId;
    } catch (error) {
      console.error('디바이스 ID 생성 중 오류:', error);
      // 폴백 ID 생성
      const fallbackId = `mobile_${Platform.OS}_${Date.now()}`;
      setDeviceId(fallbackId);
      return fallbackId;
    }
  }, []);

  const checkAuth = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const userData = JSON.parse(userString);
        console.log('유저 ID:', userData.userId);
        setUserId(userData.userId);
        
        // 디바이스 ID도 함께 가져오기
        await getDeviceId();
      } else {
        console.log('저장된 유저 정보가 없습니다.');
      }
    } catch (error) {
      console.error('유저 정보 파싱 중 오류 발생:', error);
    }
  };

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
    
    // 디바이스 ID가 없으면 가져오기
    const currentDeviceId = deviceId || await getDeviceId();

    if (!token || !userId) {
      console.error('토큰 또는 사용자 ID가 없습니다.');
      return;
    }

    // 웹소켓 연결 설정 (디바이스 ID 추가)
    const wsUrl = `${baseWsUrl}/api/chat/ws/chat/${userId}/${chatId}/${currentDeviceId}`;
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
  }, [baseWsUrl, userId, deviceId, handleWebSocketMessage, getDeviceId]);

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

    // 웹소켓으로 메시지 전송 (디바이스 ID 포함)
    ws.current.send(JSON.stringify({ 
      message: input,
      device_id: deviceId
    }));
  }, [input, canSendMessage, isLoading, isTyping, deviceId]);

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
      // 비동기 함수로 실행 순서 보장
      const initConnection = async () => {
        // 1. 먼저 사용자 ID와 디바이스 ID 가져오기
        await checkAuth();

        // 2. 사용자 ID가 있으면 웹소켓 연결
        if (userId) {
          console.log('화면 포커스 얻음 - 웹소켓 연결 시도');
          console.log('사용자 ID:', userId);
          console.log('디바이스 ID:', deviceId);
          const chat_id = sessionId ?? Date.now().toString();
          initWebSocket(chat_id);
        } else {
          console.log('사용자 ID가 없어 웹소켓 연결을 시도하지 않습니다.');
        }
      };

      initConnection();

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
    }, [sessionId, initWebSocket, userId, deviceId])
  );

  // 컴포넌트 마운트 시 디바이스 ID 초기화, 언마운트 시 정리 작업
  useEffect(() => {
    // 첫 마운트 시 디바이스 ID 가져오기
    getDeviceId();

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
  }, [getDeviceId]);

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