import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles, darkStyles } from '@/screens/Home/homeTab/Schedule/HabitScreen.styles';
import HabitHubBar from '@/components/Home/homeTab/Schedule/HabitHubBar';
import { useColorScheme } from 'react-native';

interface HabitData {
  habitId: number;
  name: string;
  completed: number;
  remaining: number;
}

const HabitScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? darkStyles : styles;
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
      <View style={[theme.container, theme.loadingContainer]}>
        <ActivityIndicator size="large" color="#5c6bc0" />
      </View>
    );
  }

  return (
    <ScrollView style={theme.container}>
      <View style={theme.header}>
        <Text style={theme.title}>습관 관리</Text>
        <View style={theme.buttons}>
          <TouchableOpacity style={theme.btn}>
            <Text style={theme.btnText}>기간선택</Text>
          </TouchableOpacity>
          <TouchableOpacity style={theme.btn} onPress={() => openModal('add')}>
            <Text style={theme.btnText}>추가하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={theme.chartContainer}>
        <Text style={theme.sectionTitle}>습관</Text>
        {habits.length > 0 ? (
          <HabitHubBar data={habits} />
        ) : (
          <Text style={theme.noDataText}>습관 데이터가 없습니다.</Text>
        )}
      </View>

      <View style={theme.todayHabits}>
        <Text style={theme.sectionTitle}>오늘의 습관</Text>
        {todayHabits.map(habit => (
          <View key={habit.habitId} style={theme.habitItem}>
            <View style={theme.habitHeader}>
              <Text style={theme.habitName}>{habit.name}</Text>
              <View style={[theme.checkbox, habit.isCompleted && theme.checkedBox]} />
            </View>
            <View style={theme.progressBar}>
              <View style={[theme.progressFill, { width: `${habit.completed}%` }]} />
            </View>
            <Text style={theme.progressText}>{habit.completed}% 달성</Text>
            <View style={theme.habitDetails}>
              <Text style={theme.habitDetailText}>
                <Text style={theme.label}>설명:</Text> {habit.description}
              </Text>
              <Text style={theme.habitDetailText}>
                <Text style={theme.label}>목표 완료 일 수:</Text> {habit.goalCount}
              </Text>
              <Text style={theme.habitDetailText}>
                <Text style={theme.label}>달성 일 수:</Text> 2
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={theme.reportButtons}>
        <TouchableOpacity
          style={theme.reportBtn}
          onPress={() => openModal('report')}
        >
          <Text style={theme.reportBtnText}>주간/월간 리포트 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.reportBtn}
          onPress={() => openModal('goal')}
        >
          <Text style={theme.reportBtnText}>목표 설정</Text>
        </TouchableOpacity>
      </View>

      {/* 여기에 모달 컴포넌트를 추가할 수 있습니다 */}
    </ScrollView>
  );
};



export default HabitScreen;