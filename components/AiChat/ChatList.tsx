import React, { forwardRef } from 'react';
import { FlatList, View } from 'react-native';
import ChatBubble from '@/components/AiChat/ChatBubble';

const ChatList = forwardRef(({ messages }: { messages: { sender: 'user' | 'ai'; text: string }[] }, ref: any) => {
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
