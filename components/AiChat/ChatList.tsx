import React, { forwardRef } from 'react';
import { FlatList, View } from 'react-native';
import ChatBubble from '@/components/AiChat/ChatBubble';

interface ChatListProps {
  messages: { sender: 'user' | 'ai'; text: string }[];
}

type ChatListRef = FlatList | null;

const ChatList = forwardRef<ChatListRef, ChatListProps>(({ messages }, ref) => {
  return (
    <FlatList
      ref={ref}
      data={messages}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <ChatBubble sender={item.sender} text={item.text} />
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
});

export default ChatList;