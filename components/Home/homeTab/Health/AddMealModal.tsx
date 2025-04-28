// src/components/Health/AddMealModal.tsx
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

interface AddMealModalProps {
  onClose: () => void;
}

const AddMealModal = ({ onClose }: AddMealModalProps) => {
  const [mealType, setMealType] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  );
  
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  
  // 식사 종류
  const mealTypes = ['아침', '점심', '저녁', '간식'];
  
  const handleDateConfirm = (selectedDate: Date) => {
    setDate(selectedDate.toISOString().split('T')[0]);
    setDatePickerVisible(false);
  };
  
  const handleTimeConfirm = (selectedTime: Date) => {
    setTime(
      selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    );
    setTimePickerVisible(false);
  };
  
  const handleSubmit = () => {
    // 여기에 데이터 저장 로직 추가
    console.log({
      mealType,
      calories: parseInt(calories),
      protein: parseInt(protein),
      carbs: parseInt(carbs),
      date,
      time
    });
    onClose();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>식사 종류:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={mealType}
            onValueChange={(itemValue) => setMealType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="식사 선택" value="" />
            {mealTypes.map((type, index) => (
              <Picker.Item key={index} label={type} value={type} />
            ))}
          </Picker>
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>칼로리(kcal):</Text>
        <TextInput
          style={styles.input}
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
          placeholder="칼로리 입력"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>단백질(g):</Text>
        <TextInput
          style={styles.input}
          value={protein}
          onChangeText={setProtein}
          keyboardType="numeric"
          placeholder="단백질 입력"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>탄수화물(g):</Text>
        <TextInput
          style={styles.input}
          value={carbs}
          onChangeText={setCarbs}
          keyboardType="numeric"
          placeholder="탄수화물 입력"
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
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>시간:</Text>
        <TouchableOpacity 
          style={styles.dateInput}
          onPress={() => setTimePickerVisible(true)}
        >
          <Text>{time}</Text>
        </TouchableOpacity>
      </View>
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
      
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisible(false)}
      />
      
      <View style={styles.modalActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.actionButtonText}>식사 추가</Text>
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

export default AddMealModal;