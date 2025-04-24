import React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from '@/screens/AiChat/AiChatScreen.styles';
import ChatList from '@/components/AiChat/ChatList';
import ChatInput from '@/components/AiChat/ChatInput';
import useChat from '@/hooks/AiChat/useChat';

const AiChatScreen = () => {
  const { messages, input, setInput, sendMessage, flatListRef } = useChat();

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
