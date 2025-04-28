// src/components/Health/DateSelectionModal.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface DateSelectionModalProps {
  onClose: () => void;
  onSelectDate: (date: Date) => void;
}

const DateSelectionModal = ({ onClose, onSelectDate }: DateSelectionModalProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisible(false);
  };

  const setToday = () => {
    setSelectedDate(new Date());
  };

  const setYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setSelectedDate(yesterday);
  };

  const setLastWeek = () => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    setSelectedDate(lastWeek);
  };

  const handleApply = () => {
    onSelectDate(selectedDate);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateInputContainer}>
        <Text style={styles.label}>날짜 선택:</Text>
        <TouchableOpacity 
          style={styles.dateInput}
          onPress={() => setDatePickerVisible(true)}
        >
          <Text>{selectedDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisible(false)}
        date={selectedDate}
      />
      
      <View style={styles.quickSelect}>
        <TouchableOpacity 
          style={styles.quickButton}
          onPress={setToday}
        >
          <Text style={styles.quickButtonText}>오늘</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickButton}
          onPress={setYesterday}
        >
          <Text style={styles.quickButtonText}>어제</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickButton}
          onPress={setLastWeek}
        >
          <Text style={styles.quickButtonText}>지난주</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.modalActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.cancelButton]}
          onPress={onClose}
        >
          <Text style={styles.actionButtonText}>취소</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.applyButton]}
          onPress={handleApply}
        >
          <Text style={styles.actionButtonText}>적용</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dateInputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  quickSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickButton: {
    backgroundColor: '#5c6bc0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  quickButtonText: {
    color: 'white',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  applyButton: {
    backgroundColor: '#4caf50',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DateSelectionModal;