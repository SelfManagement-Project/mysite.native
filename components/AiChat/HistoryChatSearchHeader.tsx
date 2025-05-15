import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { styles } from '@/screens/AiChat/ChatHistoryScreen.styles';

interface ChatSearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  isSelectionMode: boolean;
  toggleSelectionMode: () => void;
  deleteSelectedChats: () => void;
}

export const ChatSearchHeader: React.FC<ChatSearchHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isSelectionMode,
  toggleSelectionMode,
  deleteSelectedChats
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerActions}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="대화 검색"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleSearch}
        >
          <Ionicons name="search-outline" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.headerButton, isSelectionMode && styles.headerButtonActive]}
          onPress={isSelectionMode ? deleteSelectedChats : toggleSelectionMode}
        >
          <Ionicons
            name={isSelectionMode ? "trash" : "trash-outline"}
            size={20}
            color={isSelectionMode ? "#FF3B30" : "#666"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};