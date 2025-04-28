import { useState, useRef } from 'react';
import { FlatList } from 'react-native';

type ChatMessage = {
  sender: 'user' | 'ai';
  text: string;
};

const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    setTimeout(() => {
      const aiMessage: ChatMessage = {
        sender: 'ai',
        text: '안녕하세요! 무엇을 도와드릴까요?',
      };
      setMessages((prev) => [...prev, aiMessage]);
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 500);
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    flatListRef,
  };
};

export default useChat;
