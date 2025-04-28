// src/components/Health/AddSleepModal.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface AddSleepModalProps {
  onClose: () => void;
}

const AddSleepModal = ({ onClose }: AddSleepModalProps) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [sleepStart, setSleepStart] = useState('22:00');
  const [sleepEnd, setSleepEnd] = useState('07:00');
  const [sleepQuality, setSleepQuality] = useState(70);
  
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  
  const [pickerMode, setPickerMode] = useState<'date' | 'startTime' | 'endTime'>('date');
  
  const showPicker = (mode: 'date' | 'startTime' | 'endTime') => {
    setPickerMode(mode);
    switch (mode) {
      case 'date':
        setDatePickerVisible(true);
        break;
      case 'startTime':
        setStartTimePickerVisible(true);
        break;
      case 'endTime':
        setEndTimePickerVisible(true);
        break;
    }
  };
  
  const handleConfirm = (selectedDateTime: Date) => {
    switch (pickerMode) {
      case 'date':
        setDate(selectedDateTime.toISOString().split('T')[0]);
        setDatePickerVisible(false);
        break;
      case 'startTime':
        setSleepStart(
          selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        );
        setStartTimePickerVisible(false);
        break;
      case 'endTime':
        setSleepEnd(
          selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        );
        setEndTimePickerVisible(false);
        break;
    }
  };

  const handleSubmit = () => {
    // 여기에 데이터 저장 로직 추가
    console.log({
      date,
      sleepStart,
      sleepEnd,
      sleepQuality
    });
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>날짜:</Text>
        <TouchableOpacity 
          style={styles.input}
          onPress={() => showPicker('date')}
        >
          <Text>{date}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>취침 시간:</Text>
        <TouchableOpacity 
          style={styles.input}
          onPress={() => showPicker('startTime')}
        >
          <Text>{sleepStart}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>기상 시간:</Text>
        <TouchableOpacity 
          style={styles.input}
          onPress={() => showPicker('endTime')}
        >
          <Text>{sleepEnd}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>수면 품질 (0-100%):</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={sleepQuality}
          onValueChange={setSleepQuality}
          minimumTrackTintColor="#5c6bc0"
          maximumTrackTintColor="#d3d3d3"
        />
        <Text style={styles.qualityValue}>{sleepQuality}%</Text>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
      
      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => setStartTimePickerVisible(false)}
      />
      
      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => setEndTimePickerVisible(false)}
      />

      <View style={styles.modalActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.actionButtonText}>수면 데이터 추가</Text>
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
  slider: {
    height: 40,
  },
  qualityValue: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
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

export default AddSleepModal;