// src/components/Health/AddExerciseModal.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface AddExerciseModalProps {
  onClose: () => void;
}

const AddExerciseModal = ({ onClose }: AddExerciseModalProps) => {
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('30');
  const [calories, setCalories] = useState('150');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  
  // 더미 운동 종류 데이터
  const exerciseTypes = [
    '달리기', '걷기', '수영', '사이클링', '웨이트 트레이닝', 
    '요가', '필라테스', '등산', '테니스', '축구', '농구'
  ];
  
  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate.toISOString().split('T')[0]);
    setDatePickerVisible(false);
  };
  
  const handleSubmit = () => {
    // 여기에 데이터 저장 로직 추가
    console.log({
      exerciseType,
      duration: parseInt(duration),
      calories: parseInt(calories),
      date
    });
    onClose();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>운동 종류:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={exerciseType}
            onValueChange={(itemValue) => setExerciseType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="운동 선택" value="" />
            {exerciseTypes.map((type, index) => (
              <Picker.Item key={index} label={type} value={type} />
            ))}
          </Picker>
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>운동 시간(분):</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          placeholder="시간 입력"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>소모 칼로리(kcal):</Text>
        <TextInput
          style={styles.input}
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
          placeholder="칼로리 입력"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>날짜:</Text>
        <TouchableOpacity 
          style={styles.dateInput}
          onPress={() => setDatePickerVisible(true)}
        >
          <Text>{date}</Text>
        </TouchableOpacity>
      </View>
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
      
      <View style={styles.modalActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.actionButtonText}>운동 추가</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.cancelButton]}
          onPress={onClose}
        >
          <Text style={styles.actionButtonText}>취소</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  modalActions: {
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#4caf50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddExerciseModal;