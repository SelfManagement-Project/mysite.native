import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { styles } from '@/screens/AiChat/ChatHistoryScreen.styles';

interface EmptyStateProps {
  iconName: string;
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ iconName, title, message }) => {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name={iconName as any} size={80} color="#ccc" />
      <Text style={styles.emptyText}>{title}</Text>
      <Text style={styles.emptySubText}>{message}</Text>
    </View>
  );
};