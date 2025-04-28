// src/components/Health/AddWeightInfoModal.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface AddWeightInfoModalProps {
  onClose: () => void;
}

const AddWeightInfoModal = ({ onClose }: AddWeightInfoModalProps) => {
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [height, setHeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [bmi, setBmi] = useState(0);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  
  useEffect(() => {
    calculateBMI();
  }, [weight, height]);
  
  const calculateBMI = () => {
    if (weight && height) {
      const weightValue = parseFloat(weight);
      const heightValue = parseFloat(height) / 100; // Convert cm to meters
      
      if (weightValue > 0 && heightValue > 0) {
        const bmiValue = weightValue / (heightValue * heightValue);
        setBmi(parseFloat(bmiValue.toFixed(1)));
      }
    }
  };
  
  const handleDateConfirm = (selectedDate: Date) => {
    setDate(selectedDate.toISOString().split('T')[0]);
    setDatePickerVisible(false);
  };
  
  const handleSubmit = () => {
    // 여기에 데이터 저장 로직 추가
    console.log({
      weight: parseFloat(weight),
      targetWeight: parseFloat(targetWeight),
      height: parseFloat(height),
      date,
      bmi
    });
    onClose();
  };
  
  // BMI 카테고리 및 클래스 결정 함수
  const getBMICategory = (bmi: number): string => {
    if (bmi <= 0) return "";
    if (bmi < 18.5) return "저체중";
    if (bmi < 23) return "정상";
    if (bmi < 25) return "과체중";
    if (bmi < 30) return "비만";
    return "고도비만";
  };
  
  const getBMIColor = (bmi: number): string => {
    if (bmi <= 0) return "#000";
    if (bmi < 18.5) return "#2196F3"; // Blue
    if (bmi < 23) return "#4CAF50"; // Green
    if (bmi < 25) return "#FF9800"; // Orange
    if (bmi < 30) return "#F44336"; // Red
    return "#9C27B0"; // Purple
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>현재 체중(kg):</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="체중 입력"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>목표 체중(kg):</Text>
        <TextInput
          style={styles.input}
          value={targetWeight}
          onChangeText={setTargetWeight}
          keyboardType="numeric"
          placeholder="목표 체중 입력"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>키(cm):</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholder="키 입력"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>기록 날짜:</Text>
        <TouchableOpacity 
          style={styles.dateInput}
          onPress={() => setDatePickerVisible(true)}
        >
          <Text>{date}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.bmiDisplay}>
        <View style={styles.bmiValue}>
          <Text style={styles.bmiLabel}>BMI:</Text>
          <Text style={[
            styles.bmiNumber, 
            { color: getBMIColor(bmi) }
          ]}>
            {bmi > 0 ? bmi.toFixed(1) : '-'}
          </Text>
        </View>
        <View style={styles.bmiCategory}>
          {bmi > 0 && (
            <Text style={[
              styles.bmiCategoryText, 
              { color: getBMIColor(bmi) }
            ]}>
              {getBMICategory(bmi)}
            </Text>
          )}
        </View>
      </View>
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
      
      <View style={styles.modalActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.cancelButton]}
          onPress={onClose}
        >
          <Text style={styles.actionButtonText}>취소</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.actionButtonText}>체중 정보 저장</Text>
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
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  bmiDisplay: {
    alignItems: 'center',
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  bmiValue: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bmiLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  bmiNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bmiCategory: {
    marginTop: 5,
  },
  bmiCategoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
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

export default AddWeightInfoModal;