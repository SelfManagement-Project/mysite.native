import React from 'react';
import { FlatList } from 'react-native';
import { ChatItem } from './HistoryChatItem';
import { styles } from '@/screens/AiChat/ChatHistoryScreen.styles';

type ChatSession = {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messageCount: number;
  selected?: boolean;
};

interface ChatListProps {
  chatSessions: ChatSession[];
  isSelectionMode: boolean;
  onChatPress: (chat: ChatSession) => void;
}

export const HistoryChatList: React.FC<ChatListProps> = ({
  chatSessions,
  isSelectionMode,
  onChatPress
}) => {
  const renderChatItem = ({ item }: { item: ChatSession }) => (
    <ChatItem
      chat={item}
      isSelectionMode={isSelectionMode}
      onPress={() => onChatPress(item)}
    />
  );

  return (
    <FlatList
      data={chatSessions}
      renderItem={renderChatItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};