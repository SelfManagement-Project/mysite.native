import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { styles } from '@/screens/AiChat/ChatHistoryScreen.styles';

type ChatSession = {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messageCount: number;
  selected?: boolean;
};

interface ChatItemProps {
  chat: ChatSession;
  isSelectionMode: boolean;
  onPress: () => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  isSelectionMode,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chatItem,
        chat.selected && { backgroundColor: "#F0F4FF" }
      ]}
      onPress={onPress}
    >
      {isSelectionMode && (
        <View style={styles.checkboxContainer}>
          <View style={[
            styles.checkbox,
            chat.selected && styles.checkboxSelected
          ]}>
            {chat.selected && (
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            )}
          </View>
        </View>
      )}

      <View style={styles.chatIcon}>
        <Ionicons name="chatbubble-ellipses-outline" size={28} color="#4F6BFF" />
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatTitle} numberOfLines={1}>{chat.title}</Text>
          <Text style={styles.chatDate}>{chat.date}</Text>
        </View>
        <Text
          style={styles.chatMessage}
          numberOfLines={2}
        >
          {chat.lastMessage}
        </Text>
        <View style={styles.chatFooter}>
          <Text style={styles.messageCount}>
            <Ionicons name="chatbubble-outline" size={12} color="#888" /> {chat.messageCount}개 메시지
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};