import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const ChatInput = ({
  input,
  setInput,
  onSend,
}: {
  input: string;
  setInput: (text: string) => void;
  onSend: () => void;
}) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      paddingVertical: 10,
      paddingHorizontal: 8,
    }}>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="메시지를 입력하세요..."
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderRadius: 20,
          paddingHorizontal: 16,
          paddingVertical: 8,
          marginRight: 8,
        }}
      />
      <TouchableOpacity onPress={onSend}>
        <Text style={{ color: '#5c6bc0', fontWeight: 'bold' }}>전송</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
