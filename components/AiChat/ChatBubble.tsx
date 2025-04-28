import React from 'react';
import { View, Text } from 'react-native';

const ChatBubble = ({ sender, text }: { sender: 'user' | 'ai'; text: string }) => {
  const isUser = sender === 'user';
  return (
    <View
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        backgroundColor: isUser ? '#5c6bc0' : '#e0e0e0',
        padding: 10,
        borderRadius: 16,
        marginBottom: 10,
        maxWidth: '80%',
      }}
    >
      <Text style={{ color: isUser ? '#fff' : '#000' }}>{text}</Text>
    </View>
  );
};

export default ChatBubble;
