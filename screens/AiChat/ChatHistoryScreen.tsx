import React from "react";
import { View, StatusBar, Alert, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from './ChatHistoryScreen.styles';
import { HistoryChatList } from '@/components/AiChat/HistoryChatList';
import { ChatSearchHeader } from '@/components/AiChat/HistoryChatSearchHeader';
import { EmptyState } from '@/components/AiChat/HistoryEmptyState';
import { SelectionControls } from '@/components/AiChat/HistorySelectionControls';
import { useChatHistory } from '@/hooks/AiChat/useChatHistory';

interface ChatHistoryScreenProps {
  onSelectChat?: (sessionId: string, title: string) => void;
  onNewChat?: () => void;
}

const ChatHistoryScreen: React.FC<ChatHistoryScreenProps> = ({ onSelectChat, onNewChat }) => {
  const {
    displayedChatSessions,
    searchQuery,
    isSelectionMode,
    handleSearch,
    handleChatPress,
    toggleSelectionMode,
    deleteSelectedChats,
    setSearchQuery
  } = useChatHistory(onSelectChat);

  return (
    <View style={styles.container}>
      <StatusBar />

      {/* 헤더 */}
      <ChatSearchHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isSelectionMode={isSelectionMode}
        toggleSelectionMode={toggleSelectionMode}
        deleteSelectedChats={deleteSelectedChats}
      />

      {/* 선택 모드 컨트롤 */}
      {isSelectionMode && (
        <SelectionControls 
          toggleSelectionMode={toggleSelectionMode}
          deleteSelectedChats={deleteSelectedChats}
        />
      )}

      {/* 대화 목록 */}
      {displayedChatSessions.length > 0 ? (
        <HistoryChatList 
          chatSessions={displayedChatSessions}
          isSelectionMode={isSelectionMode}
          onChatPress={handleChatPress}
        />
      ) : (
        <EmptyState 
          iconName="chatbubbles-outline"
          title={searchQuery ? "검색 결과가 없습니다" : "대화 내역이 없습니다"}
          message={searchQuery ? "다른 검색어로 다시 시도해보세요" : "AI와 새로운 대화를 시작해보세요!"}
        />
      )}

      {/* 새 대화 버튼 - 선택 모드일 때는 숨김 */}
      {!isSelectionMode && (
        <TouchableOpacity style={styles.newChatButton} onPress={onNewChat}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChatHistoryScreen;