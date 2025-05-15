import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '@/screens/AiChat/ChatHistoryScreen.styles';

interface SelectionControlsProps {
  toggleSelectionMode: () => void;
  deleteSelectedChats: () => void;
}

export const SelectionControls: React.FC<SelectionControlsProps> = ({
  toggleSelectionMode,
  deleteSelectedChats
}) => {
  return (
    <View style={styles.selectionControls}>
      <Text style={styles.selectionTitle}>
        삭제할 대화를 선택하세요
      </Text>
      <TouchableOpacity
        style={styles.selectionButton}
        onPress={deleteSelectedChats}
      >
        <Text style={[styles.selectionButtonText, styles.deleteButtonText]}>
          삭제
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.selectionButton}
        onPress={toggleSelectionMode}
      >
        <Text style={styles.selectionButtonText}>취소</Text>
      </TouchableOpacity>
    </View>
  );
};