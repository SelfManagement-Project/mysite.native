// src/components/Finance/AddTransactionModal.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Modal, 
  ScrollView 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

interface AddTransactionModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddTransactionModal = ({ isVisible, onClose }: AddTransactionModalProps) => {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // 임시 카테고리 데이터
  const categories = [
    { id: '1', name: '식비' },
    { id: '2', name: '교통비' },
    { id: '3', name: '주거/통신' },
    { id: '4', name: '쇼핑' },
    { id: '5', name: '여가' },
    { id: '6', name: '의료/건강' },
    { id: '7', name: '교육' },
    { id: '8', name: '기타' },
  ];
  
  const handleSubmit = () => {
    // 여기에 저장 로직 추가
    onClose();
  };
  
  const handleTypeChange = (newType: string) => {
    setType(newType);
  };
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>거래 추가</Text>
          
          <ScrollView style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>거래 유형:</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity 
                  style={[styles.radioButton, type === 'expense' && styles.radioButtonSelected]}
                  onPress={() => handleTypeChange('expense')}
                >
                  <Text style={styles.radioText}>지출</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.radioButton, type === 'income' && styles.radioButtonSelected]}
                  onPress={() => handleTypeChange('income')}
                >
                  <Text style={styles.radioText}>수입</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>금액:</Text>
              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="금액 입력"
                  keyboardType="numeric"
                />
                <Text style={styles.currencyText}>원</Text>
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>카테고리:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={category}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="카테고리 선택" value="" />
                  {categories.map((cat) => (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                  ))}
                </Picker>
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>설명:</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="거래 내용 입력"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>날짜:</Text>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{date.toLocaleDateString()}</Text>
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
          </ScrollView>
          
          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyText: {
    marginLeft: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  radioButtonSelected: {
    backgroundColor: '#5c6bc0',
  },
  radioText: {
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#5c6bc0',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddTransactionModal;