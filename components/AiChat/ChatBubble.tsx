import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChatBubbleProps {
  sender: 'user' | 'ai';
  text: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ sender, text }) => {
  const isUser = sender === 'user';
  
  return (
    <View style={[
      styles.bubbleContainer,
      isUser ? styles.userBubbleContainer : styles.aiBubbleContainer
    ]}>
      <View style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.aiBubble
      ]}>
        <Text style={isUser ? styles.userText : styles.aiText}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  userBubbleContainer: {
    alignItems: 'flex-end',
  },
  aiBubbleContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#4F6BFF',
  },
  aiBubble: {
    backgroundColor: '#E6EBFF',
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  aiText: {
    color: '#333333',
    fontSize: 15,
  },
});

export default ChatBubble;