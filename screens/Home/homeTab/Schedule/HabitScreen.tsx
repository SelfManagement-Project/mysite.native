import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import HabitHubBar from '@/components/Home/homeTab/Schedule/HabitHubBar';

interface HabitData {
  habitId: number;
  name: string;
  completed: number;
  remaining: number;
}

const HabitScreen = () => {
  // 타입을 명확하게 지정
  const [isLoading, setIsLoading] = useState(true);
  const [habits, setHabits] = useState<HabitData[]>([]);
  
  // 임시 데이터 (추후 API에서 가져올 데이터)
  const mockHabits: HabitData[] = [
    { habitId: 1, name: '운동하기', completed: 70, remaining: 30 },
    { habitId: 2, name: '독서하기', completed: 50, remaining: 50 },
    { habitId: 3, name: '물 마시기', completed: 90, remaining: 10 },
  ];

  const todayHabits = [
    { habitId: 1, name: '운동하기', completed: 70, isCompleted: false, description: '매일 30분 운동하기', goalCount: 5 },
    { habitId: 3, name: '물 마시기', completed: 90, isCompleted: true, description: '하루 2리터 물 마시기', goalCount: 7 },
  ];

  const [activeRange, setActiveRange] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    // const loadData = async () => {
    //   try {
    //     // 실제로는 여기서 API 호출
    //     await new Promise(resolve => setTimeout(resolve, 100));
    //     setHabits(mockHabits);
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error('데이터 로딩 실패:', error);
    //     setIsLoading(false);
    //   }
    // };
    setHabits(mockHabits);
    setIsLoading(false);
    // loadData();
  }, []);

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#5c6bc0" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>습관 관리</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>기간선택</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => openModal('add')}>
            <Text style={styles.btnText}>추가하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>습관</Text>
        {habits.length > 0 ? (
          <HabitHubBar data={habits} />
        ) : (
          <Text style={styles.noDataText}>습관 데이터가 없습니다.</Text>
        )}
      </View>

      <View style={styles.todayHabits}>
        <Text style={styles.sectionTitle}>오늘의 습관</Text>
        {todayHabits.map(habit => (
          <View key={habit.habitId} style={styles.habitItem}>
            <View style={styles.habitHeader}>
              <Text style={styles.habitName}>{habit.name}</Text>
              <View style={[styles.checkbox, habit.isCompleted && styles.checkedBox]} />
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${habit.completed}%` }]} />
            </View>
            <Text style={styles.progressText}>{habit.completed}% 달성</Text>
            <View style={styles.habitDetails}>
              <Text style={styles.habitDetailText}>
                <Text style={styles.label}>설명:</Text> {habit.description}
              </Text>
              <Text style={styles.habitDetailText}>
                <Text style={styles.label}>목표 완료 일 수:</Text> {habit.goalCount}
              </Text>
              <Text style={styles.habitDetailText}>
                <Text style={styles.label}>달성 일 수:</Text> 2
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.reportButtons}>
        <TouchableOpacity 
          style={styles.reportBtn}
          onPress={() => openModal('report')}
        >
          <Text style={styles.reportBtnText}>주간/월간 리포트 보기</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.reportBtn}
          onPress={() => openModal('goal')}
        >
          <Text style={styles.reportBtnText}>목표 설정</Text>
        </TouchableOpacity>
      </View>

      {/* 여기에 모달 컴포넌트를 추가할 수 있습니다 */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#5c6bc0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 8,
  },
  btnText: {
    color: 'white',
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  todayHabits: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  habitItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  habitName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#5c6bc0',
  },
  checkedBox: {
    backgroundColor: '#5c6bc0',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e2e8f0',
    borderRadius: 5,
    marginBottom: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4a90e2',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  habitDetails: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 4,
  },
  habitDetailText: {
    fontSize: 14,
    marginBottom: 3,
  },
  label: {
    fontWeight: 'bold',
  },
  reportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    marginBottom: 30,
  },
  reportBtn: {
    backgroundColor: '#5c6bc0',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  reportBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HabitScreen;