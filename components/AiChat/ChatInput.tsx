// components/AiChat/ChatInput.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ChatInputProps {
  input: string;
  setInput: (text: string) => void;
  onSend: () => void;
  isDisabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  onSend,
  isDisabled = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.imageButton, isDisabled && styles.disabledButton]}
        disabled={isDisabled}
      >
        <Text style={styles.imageButtonText}>📷</Text>
      </TouchableOpacity>

      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="메시지를 입력하세요..."
        style={[styles.input, isDisabled && styles.disabledInput]}
        editable={!isDisabled}
      />
      
      <TouchableOpacity 
        style={[
          styles.sendButton, 
          (!input.trim() || isDisabled) && styles.disabledSendButton
        ]}
        onPress={onSend}
        disabled={!input.trim() || isDisabled}
      >
        <Text style={styles.sendButtonText}>전송</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  imageButton: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  disabledButton: {
    opacity: 0.5,
    borderColor: '#eee',
  },
  imageButtonText: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    borderColor: '#eee',
    color: '#999',
  },
  sendButton: {
    backgroundColor: '#4F6BFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  disabledSendButton: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatInput;