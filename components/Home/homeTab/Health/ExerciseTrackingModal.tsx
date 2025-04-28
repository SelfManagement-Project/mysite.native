// src/components/Health/ExerciseTrackingModal.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  FlatList,
  TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';

interface ExerciseTrackingModalProps {
  onClose: () => void;
}

// 운동 데이터 인터페이스
interface ExerciseData {
  exerciseId: number;
  exerciseType: string;
  duration: number;
  caloriesBurned: number;
  createdAt: string;
}

const ExerciseTrackingModal = ({ onClose }: ExerciseTrackingModalProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // 임시 데이터 - 실제로는 API나 로컬 저장소에서 가져옴
  const [exercises, setExercises] = useState<ExerciseData[]>([
    { 
      exerciseId: 1, 
      exerciseType: '달리기', 
      duration: 30, 
      caloriesBurned: 250,
      createdAt: '2025-04-10'
    },
    { 
      exerciseId: 2, 
      exerciseType: '웨이트 트레이닝', 
      duration: 45, 
      caloriesBurned: 200,
      createdAt: '2025-04-10'
    }
  ]);
  
  // 새 운동 데이터
  const [newExercise, setNewExercise] = useState({
    exerciseType: '',
    duration: '',
    caloriesBurned: ''
  });
  
  // 수정 데이터
  const [editExercise, setEditExercise] = useState({
    exerciseType: '',
    duration: '',
    caloriesBurned: ''
  });
  
  // 운동 종류 목록
  const exerciseTypes = [
    '달리기', '걷기', '수영', '사이클링', '웨이트 트레이닝', 
    '요가', '필라테스', '등산', '테니스', '축구', '농구'
  ];
  
  // 총 운동 시간 및 칼로리 계산
  const totalDuration = exercises.reduce((sum, exercise) => sum + exercise.duration, 0);
  const totalCaloriesBurned = exercises.reduce((sum, exercise) => sum + exercise.caloriesBurned, 0);
  
  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    setDatePickerVisible(false);
    // 여기서 선택한 날짜에 맞는 데이터를 불러오는 로직이 들어감
  };
  
  // 추가 모드 전환
  const handleToggleAddMode = (value: boolean) => {
    setIsAdding(value);
    if (value) {
      setNewExercise({
        exerciseType: '',
        duration: '',
        caloriesBurned: ''
      });
    }
  };
  
  // 수정 모드 전환
  const handleToggleEditMode = (exercise: ExerciseData | null) => {
    if (exercise) {
      setEditingId(exercise.exerciseId);
      setEditExercise({
        exerciseType: exercise.exerciseType,
        duration: exercise.duration.toString(),
        caloriesBurned: exercise.caloriesBurned.toString()
      });
    } else {
      setEditingId(null);
    }
  };
  
  // 운동 추가
  const handleAddExercise = () => {
    const newExerciseData = {
      exerciseId: Date.now(), // 임시 ID 생성
      exerciseType: newExercise.exerciseType,
      duration: parseInt(newExercise.duration) || 0,
      caloriesBurned: parseInt(newExercise.caloriesBurned) || 0,
      createdAt: selectedDate
    };
    
    setExercises([...exercises, newExerciseData]);
    handleToggleAddMode(false);
  };
  
  // 운동 수정
  const handleUpdateExercise = (id: number) => {
    const updatedExercises = exercises.map(exercise => 
      exercise.exerciseId === id ? {
        ...exercise,
        exerciseType: editExercise.exerciseType,
        duration: parseInt(editExercise.duration) || 0,
        caloriesBurned: parseInt(editExercise.caloriesBurned) || 0
      } : exercise
    );
    
    setExercises(updatedExercises);
    setEditingId(null);
  };
  
  // 운동 삭제
  const handleDeleteExercise = (id: number) => {
    const updatedExercises = exercises.filter(exercise => exercise.exerciseId !== id);
    setExercises(updatedExercises);
  };
  
  // 운동 목록 렌더링
  const renderExerciseItem = ({ item }: { item: ExerciseData }) => (
    <View style={styles.exerciseItem}>
      {editingId === item.exerciseId ? (
        // 수정 모드
        <View style={styles.editForm}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>운동 종류:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={editExercise.exerciseType}
                onValueChange={(value) => setEditExercise({...editExercise, exerciseType: value})}
                style={styles.picker}
              >
                {exerciseTypes.map((type, index) => (
                  <Picker.Item key={index} label={type} value={type} />
                ))}
              </Picker>
            </View>
          </View>
          
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>시간 (분):</Text>
            <TextInput
              style={styles.formInput}
              value={editExercise.duration}
              onChangeText={(text) => setEditExercise({...editExercise, duration: text})}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>소모 칼로리:</Text>
            <TextInput
              style={styles.formInput}
              value={editExercise.caloriesBurned}
              onChangeText={(text) => setEditExercise({...editExercise, caloriesBurned: text})}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.editActions}>
            <TouchableOpacity
              style={[styles.editButton, styles.saveButton]}
              onPress={() => handleUpdateExercise(item.exerciseId)}
            >
              <Text style={styles.editButtonText}>저장</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.editButton, styles.cancelButton]}
              onPress={() => handleToggleEditMode(null)}
            >
              <Text style={styles.editButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // 보기 모드
        <View>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseType}>{item.exerciseType}</Text>
            <View style={styles.exerciseActions}>
              <TouchableOpacity
                style={styles.actionIcon}
                onPress={() => handleToggleEditMode(item)}
              >
                <Ionicons name="create-outline" size={18} color="#5c6bc0" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionIcon}
                onPress={() => handleDeleteExercise(item.exerciseId)}
              >
                <Ionicons name="trash-outline" size={18} color="#f44336" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.exerciseDetails}>
            <Text>시간: {item.duration}분</Text>
            <Text>소모 칼로리: {item.caloriesBurned}kcal</Text>
            <Text>날짜: {new Date(item.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>
      )}
    </View>
  );
  
  return (
    <View style={styles.container}>
      {isAdding ? (
        // 추가 화면
        <View style={styles.addForm}>
          <Text style={styles.formTitle}>새 운동 추가</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>운동 종류:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={newExercise.exerciseType}
                onValueChange={(value) => setNewExercise({...newExercise, exerciseType: value})}
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
            <Text style={styles.label}>시간 (분):</Text>
            <TextInput
              style={styles.input}
              value={newExercise.duration}
              onChangeText={(text) => setNewExercise({...newExercise, duration: text})}
              keyboardType="numeric"
              placeholder="운동 시간 입력"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>소모 칼로리:</Text>
            <TextInput
              style={styles.input}
              value={newExercise.caloriesBurned}
              onChangeText={(text) => setNewExercise({...newExercise, caloriesBurned: text})}
              keyboardType="numeric"
              placeholder="소모 칼로리 입력"
            />
          </View>
          
          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleAddExercise}
            >
              <Text style={styles.actionButtonText}>저장</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => handleToggleAddMode(false)}
            >
              <Text style={styles.actionButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // 목록 화면
        <>
          <View style={styles.dateFilter}>
            <Text style={styles.label}>날짜:</Text>
            <TouchableOpacity 
              style={styles.datePicker}
              onPress={() => setDatePickerVisible(true)}
            >
              <Text>{selectedDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => {/* 필터링 로직 */}}
            >
              <Text style={styles.filterButtonText}>조회</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.summaryBox}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>총 운동 시간:</Text>
              <Text style={styles.summaryValue}>{totalDuration} 분</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>소모 칼로리:</Text>
              <Text style={styles.summaryValue}>{totalCaloriesBurned} kcal</Text>
            </View>
          </View>
          
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>운동 목록</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleToggleAddMode(true)}
            >
              <Text style={styles.addButtonText}>추가</Text>
            </TouchableOpacity>
          </View>
          
          {exercises.length > 0 ? (
            <FlatList
              data={exercises}
              renderItem={renderExerciseItem}
              keyExtractor={item => item.exerciseId.toString()}
              style={styles.exerciseList}
            />
          ) : (
            <View style={styles.noData}>
              <Text style={styles.noDataText}>해당 날짜에 기록된 운동이 없습니다.</Text>
            </View>
          )}
        </>
      )}
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dateFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    flex: 1,
  },
  filterButton: {
    backgroundColor: '#5c6bc0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  filterButtonText: {
    color: 'white',
  },
  summaryBox: {
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
  },
  exerciseList: {
    maxHeight: 300,
  },
  exerciseItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseActions: {
    flexDirection: 'row',
  },
  actionIcon: {
    marginLeft: 15,
  },
  exerciseDetails: {
    marginTop: 5,
  },
  noData: {
    padding: 20,
    alignItems: 'center',
  },
  noDataText: {
    color: '#999',
  },
  addForm: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#4caf50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editForm: {
    padding: 5,
  },
  formRow: {
    marginBottom: 10,
  },
  formLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    backgroundColor: 'white',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default ExerciseTrackingModal;