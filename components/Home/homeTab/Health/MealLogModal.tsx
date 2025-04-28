// src/components/Health/MealLogModal.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  FlatList,
  TextInput
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

interface MealLogModalProps {
  onClose: () => void;
}

// 식사 데이터 인터페이스
interface MealData {
  dietId: number;
  mealType: string;
  calories: number;
  protein: number;
  carbs: number;
  createdAt: string;
}

const MealLogModal = ({ onClose }: MealLogModalProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // 임시 데이터 - 실제로는 API나 로컬 저장소에서 가져옴
  const [meals, setMeals] = useState<MealData[]>([
    { 
      dietId: 1, 
      mealType: '아침', 
      calories: 450, 
      protein: 20,
      carbs: 60,
      createdAt: '2025-04-10'
    },
    { 
      dietId: 2, 
      mealType: '점심', 
      calories: 650, 
      protein: 35,
      carbs: 70,
      createdAt: '2025-04-10'
    }
  ]);
  
  // 새 식사 데이터
  const [newMeal, setNewMeal] = useState({
    mealType: '',
    calories: '',
    protein: '',
    carbs: ''
  });
  
  // 수정 데이터
  const [editMeal, setEditMeal] = useState({
    mealType: '',
    calories: '',
    protein: '',
    carbs: ''
  });
  
  // 총 영양소 계산
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  
  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    setDatePickerVisible(false);
    // 여기서 선택한 날짜에 맞는 데이터를 불러오는 로직
  };
  
  // 추가 모드 전환
  const handleToggleAddMode = (value: boolean) => {
    setIsAdding(value);
    if (value) {
      setNewMeal({
        mealType: '',
        calories: '',
        protein: '',
        carbs: ''
      });
    }
  };
  
  // 수정 모드 전환
  const handleToggleEditMode = (meal: MealData | null) => {
    if (meal) {
      setEditingId(meal.dietId);
      setEditMeal({
        mealType: meal.mealType,
        calories: meal.calories.toString(),
        protein: meal.protein.toString(),
        carbs: meal.carbs.toString()
      });
    } else {
      setEditingId(null);
    }
  };
  
  // 식사 추가
  const handleAddMeal = () => {
    const newMealData = {
      dietId: Date.now(), // 임시 ID 생성
      mealType: newMeal.mealType,
      calories: parseInt(newMeal.calories),
      protein: parseInt(newMeal.protein),
      carbs: parseInt(newMeal.carbs),
      createdAt: selectedDate
    };
    
    setMeals([...meals, newMealData]);
    handleToggleAddMode(false);
  };
  
  // 식사 수정
  const handleUpdateMeal = (id: number) => {
    const updatedMeals = meals.map(meal => 
      meal.dietId === id ? {
        ...meal,
        mealType: editMeal.mealType,
        calories: parseInt(editMeal.calories),
        protein: parseInt(editMeal.protein),
        carbs: parseInt(editMeal.carbs)
      } : meal
    );
    
    setMeals(updatedMeals);
    setEditingId(null);
  };
  
  // 식사 삭제
  const handleDeleteMeal = (id: number) => {
    const updatedMeals = meals.filter(meal => meal.dietId !== id);
    setMeals(updatedMeals);
  };
  
  // 식사 유형 옵션
  const mealTypes = ['아침', '점심', '저녁', '간식'];
  
  // 식사 목록 렌더링
  const renderMealItem = ({ item }: { item: MealData }) => (
    <View style={styles.mealItem}>
      {editingId === item.dietId ? (
        // 수정 모드
        <View style={styles.editForm}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>식사 종류:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={editMeal.mealType}
                onValueChange={(value) => setEditMeal({...editMeal, mealType: value})}
                style={styles.picker}
              >
                {mealTypes.map((type, index) => (
                  <Picker.Item key={index} label={type} value={type} />
                ))}
              </Picker>
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>칼로리 (kcal):</Text>
            <TextInput
              style={styles.formInput}
              value={editMeal.calories}
              onChangeText={(text) => setEditMeal({...editMeal, calories: text})}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>단백질 (g):</Text>
            <TextInput
              style={styles.formInput}
              value={editMeal.protein}
              onChangeText={(text) => setEditMeal({...editMeal, protein: text})}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>탄수화물 (g):</Text>
            <TextInput
              style={styles.formInput}
              value={editMeal.carbs}
              onChangeText={(text) => setEditMeal({...editMeal, carbs: text})}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.editActions}>
            <TouchableOpacity
              style={[styles.editButton, styles.saveButton]}
              onPress={() => handleUpdateMeal(item.dietId)}
            >
              <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.editButton, styles.cancelButton]}
              onPress={() => handleToggleEditMode(null)}
            >
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // 보기 모드
        <View>
          <View style={styles.mealHeader}>
            <View style={styles.mealTypeContainer}>
              <Text style={styles.mealType}>{item.mealType}</Text>
              <Text style={styles.mealTime}>
                {new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </Text>
            </View>
            
            <View style={styles.mealActions}>
              <TouchableOpacity
                style={styles.actionIcon}
                onPress={() => handleToggleEditMode(item)}
              >
                <Ionicons name="create-outline" size={18} color="#5c6bc0" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionIcon}
                onPress={() => handleDeleteMeal(item.dietId)}
              >
                <Ionicons name="trash-outline" size={18} color="#f44336" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.mealDetails}>
            <Text style={styles.nutrientItem}>칼로리: {item.calories} kcal</Text>
            <Text style={styles.nutrientItem}>단백질: {item.protein}g</Text>
            <Text style={styles.nutrientItem}>탄수화물: {item.carbs}g</Text>
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
          <Text style={styles.formTitle}>새 식사 추가</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>식사 종류:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={newMeal.mealType}
                onValueChange={(value) => setNewMeal({...newMeal, mealType: value})}
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
            <Text style={styles.formLabel}>칼로리 (kcal):</Text>
            <TextInput
              style={styles.formInput}
              value={newMeal.calories}
              onChangeText={(text) => setNewMeal({...newMeal, calories: text})}
              keyboardType="numeric"
              placeholder="칼로리 입력"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>단백질 (g):</Text>
            <TextInput
              style={styles.formInput}
              value={newMeal.protein}
              onChangeText={(text) => setNewMeal({...newMeal, protein: text})}
              keyboardType="numeric"
              placeholder="단백질 입력"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>탄수화물 (g):</Text>
            <TextInput
              style={styles.formInput}
              value={newMeal.carbs}
              onChangeText={(text) => setNewMeal({...newMeal, carbs: text})}
              keyboardType="numeric"
              placeholder="탄수화물 입력"
            />
          </View>
          
          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleAddMeal}
            >
              <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => handleToggleAddMode(false)}
            >
              <Text style={styles.buttonText}>취소</Text>
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
              <Text style={styles.summaryLabel}>총 칼로리:</Text>
              <Text style={styles.summaryValue}>{totalCalories} kcal</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>단백질:</Text>
              <Text style={styles.summaryValue}>{totalProtein}g</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>탄수화물:</Text>
              <Text style={styles.summaryValue}>{totalCarbs}g</Text>
            </View>
          </View>
          
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>식사 목록</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleToggleAddMode(true)}
            >
              <Text style={styles.addButtonText}>추가</Text>
            </TouchableOpacity>
          </View>
          
          {meals.length > 0 ? (
            <FlatList
              data={meals}
              renderItem={renderMealItem}
              keyExtractor={item => item.dietId.toString()}
              style={styles.mealsList}
            />
          ) : (
            <View style={styles.noData}>
              <Text style={styles.noDataText}>해당 날짜에 기록된 식사가 없습니다.</Text>
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
  mealsList: {
    maxHeight: 300,
  },
  mealItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  mealTime: {
    fontSize: 14,
    color: '#666',
  },
  mealActions: {
    flexDirection: 'row',
  },
  actionIcon: {
    marginLeft: 15,
  },
  mealDetails: {
    marginTop: 5,
  },
  nutrientItem: {
    marginBottom: 3,
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
  formLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  formInput: {
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editForm: {
    padding: 5,
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
});

export default MealLogModal;