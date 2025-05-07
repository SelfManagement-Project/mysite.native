// src/screens/MyPage/HealthScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import HealthModal from '@/components/Home/homeTab/Health/HealthModal';
import DateSelectionModal from '@/components/Home/homeTab/Health/DateSelectionModal';
import AddSleepModal from '@/components/Home/homeTab/Health/AddSleepModal';
import AddExerciseModal from '@/components/Home/homeTab/Health/AddExerciseModal';
import AddMealModal from '@/components/Home/homeTab/Health/AddMealModal';
import AddWeightInfoModal from '@/components/Home/homeTab/Health/AddWeightInfoModal';
import SleepTrackingModal from '@/components/Home/homeTab/Health/SleepTrackingModal';
// import ExerciseTrackingModal from '@/components/Health/ExerciseTrackingModal';
// import MealLogModal from '@/components/Health/MealLogModal';
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles, darkStyles } from '@/screens/Home/homeTab/Health/HealthScreen.styles';

const HealthScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkStyles : styles;

  // 임시 데이터
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // 임시 데이터 - 실제 앱에서는 API나 로컬 저장소에서 가져옴
  const exerciseData = [
    { exerciseId: 1, exerciseType: '달리기', duration: 30 },
    { exerciseId: 2, exerciseType: '웨이트 트레이닝', duration: 45 },
  ];

  const dietData = [
    { dietId: 1, mealType: '아침', calories: 450 },
    { dietId: 2, mealType: '점심', calories: 650 },
  ];

  const sleepData = [
    {
      sleepId: 1,
      sleepStart: '2025-04-09T23:00:00',
      sleepEnd: '2025-04-10T07:00:00',
      sleepQuality: 85
    }
  ];

  const healthMetrics = [
    {
      metricId: 1,
      height: 175,
      weight: 70,
      targetWeight: 68,
      bmi: 22.9
    }
  ];

  // 모달 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  // 모달 오픈 함수
  const openModal = (type: string) => {
    setModalType(type);
    setModalVisible(true);
  };

  // 모달 렌더링 함수
  const renderModal = () => {
    if (!modalVisible) return null;

    switch (modalType) {
      case 'dateSelection':
        return (
          <HealthModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="날짜 선택"
          >
            <DateSelectionModal
              onClose={() => setModalVisible(false)}
              onSelectDate={(date) => {
                setSelectedDate(date);
                setModalVisible(false);
              }}
            />
          </HealthModal>
        );
      case 'addSleep':
        return (
          <HealthModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="수면 추가"
          >
            <AddSleepModal onClose={() => setModalVisible(false)} />
          </HealthModal>
        );
      case 'sleepTracking':
        return (
          <HealthModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="수면 시간/품질 보기"
          >
            <SleepTrackingModal onClose={() => setModalVisible(false)} />
          </HealthModal>
        );
      case 'addExercise':
        return (
          <HealthModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="운동 추가"
          >
            <AddExerciseModal onClose={() => setModalVisible(false)} />
          </HealthModal>
        );
      //   case 'exerciseTracking':
      //     return (
      //       <HealthModal 
      //         isVisible={modalVisible} 
      //         onClose={() => setModalVisible(false)}
      //         title="운동 현황"
      //       >
      //         <ExerciseTrackingModal onClose={() => setModalVisible(false)} />
      //       </HealthModal>
      //     );
      case 'addMeal':
        return (
          <HealthModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="식사 추가"
          >
            <AddMealModal onClose={() => setModalVisible(false)} />
          </HealthModal>
        );
      //   case 'mealLog':
      //     return (
      //       <HealthModal 
      //         isVisible={modalVisible} 
      //         onClose={() => setModalVisible(false)}
      //         title="오늘의 식사 기록"
      //       >
      //         <MealLogModal onClose={() => setModalVisible(false)} />
      //       </HealthModal>
      //     );
      case 'addWeightInfo':
        return (
          <HealthModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="체중 정보 추가"
          >
            <AddWeightInfoModal onClose={() => setModalVisible(false)} />
          </HealthModal>
        );
      // 다른 모달들도 필요에 따라 추가
      default:
        return null;
    }
  };

  return (
    <ScrollView style={theme.container}>
      <View style={theme.header}>
        <Text style={theme.title}>종합 건강 관리</Text>
        <View style={theme.dateContainer}>
          <Text style={theme.currentDate}>
            적용 날짜: {selectedDate.toLocaleDateString()}
          </Text>
          <TouchableOpacity
            style={theme.dateButton}
            onPress={() => openModal('dateSelection')}
          >
            <Text style={theme.dateButtonText}>날짜 선택</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 운동 데이터 */}
      <View style={theme.metricsContainer}>
        <View style={theme.metricCard}>
          <Text style={theme.cardTitle}>운동 트래킹</Text>
          <TouchableOpacity
            style={theme.trackButton}
            onPress={() => openModal('exerciseTracking')}
          >
            <Text style={theme.buttonText}>운동 현황 보기</Text>
          </TouchableOpacity>

          <View style={theme.listContainer}>
            {exerciseData.length > 0 ? (
              exerciseData.map((exercise) => (
                <View key={exercise.exerciseId} style={theme.listItem}>
                  <Text>{exercise.exerciseType} {exercise.duration}분</Text>
                </View>
              ))
            ) : (
              <Text style={theme.emptyText}>운동 데이터 없음</Text>
            )}
          </View>

          <TouchableOpacity
            style={theme.addButton}
            onPress={() => openModal('addExercise')}
          >
            <Text style={theme.buttonText}>운동 추가</Text>
          </TouchableOpacity>
        </View>

        {/* 식단 데이터 */}
        <View style={theme.metricCard}>
          <Text style={theme.cardTitle}>식단 관리</Text>
          <TouchableOpacity
            style={theme.trackButton}
            onPress={() => openModal('mealLog')}
          >
            <Text style={theme.buttonText}>오늘의 식사 기록</Text>
          </TouchableOpacity>

          <View style={theme.listContainer}>
            {dietData.length > 0 ? (
              dietData.map((meal) => (
                <View key={meal.dietId} style={theme.listItem}>
                  <Text>{meal.mealType}: {meal.calories}kcal</Text>
                </View>
              ))
            ) : (
              <Text style={theme.emptyText}>식단 데이터 없음</Text>
            )}
          </View>

          <TouchableOpacity
            style={theme.addButton}
            onPress={() => openModal('addMeal')}
          >
            <Text style={theme.buttonText}>식사 추가</Text>
          </TouchableOpacity>
        </View>

        {/* 수면 데이터 */}
        <View style={theme.metricCard}>
          <Text style={theme.cardTitle}>수면 관리</Text>
          <View style={theme.buttonRow}>
            <TouchableOpacity
              style={[styles.trackButton, styles.smallButton]}
              onPress={() => openModal('sleepTracking')}
            >
              <Text style={theme.buttonText}>수면 시간/품질</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.trackButton, styles.smallButton]}
              onPress={() => openModal('sleepDetail')}
            >
              <Text style={theme.buttonText}>수면 데이터 상세</Text>
            </TouchableOpacity>
          </View>

          <View style={theme.listContainer}>
            {sleepData.length > 0 ? (
              sleepData.map((sleep) => (
                <View key={sleep.sleepId} style={theme.sleepData}>
                  <Text style={theme.sleepItem}>취침: {new Date(sleep.sleepStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                  <Text style={theme.sleepItem}>기상: {new Date(sleep.sleepEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                  <Text style={theme.sleepItem}>수면 품질: {sleep.sleepQuality}%</Text>
                </View>
              ))
            ) : (
              <Text style={theme.emptyText}>수면 데이터 없음</Text>
            )}
          </View>

          <TouchableOpacity
            style={theme.addButton}
            onPress={() => openModal('addSleep')}
          >
            <Text style={theme.buttonText}>수면 추가</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 건강 지표 */}
      <View style={theme.summarySection}>
        <Text style={theme.sectionTitle}>주간 요약</Text>
        {healthMetrics.length > 0 ? (
          healthMetrics.map((metrics) => (
            <View key={metrics.metricId} style={theme.metricsCard}>
              <View style={theme.metricsActions}>
                <TouchableOpacity
                  style={theme.actionButton}
                  onPress={() => openModal('editMetrics')}
                >
                  <Text style={theme.actionButtonText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                >
                  <Text style={theme.actionButtonText}>삭제</Text>
                </TouchableOpacity>
              </View>

              <View style={theme.metricsData}>
                <Text style={theme.metricItem}>키: {metrics.height}cm</Text>
                <Text style={theme.metricItem}>현재: {metrics.weight}kg</Text>
                <Text style={theme.metricItem}>목표: {metrics.targetWeight}kg</Text>
                <Text style={theme.metricItem}>BMI: {metrics.bmi}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={theme.metricsCard}>
            <Text style={theme.emptyText}>체중 데이터 없음</Text>
          </View>
        )}

        <View style={theme.buttonRow}>
          <TouchableOpacity
            style={theme.summaryButton}
            onPress={() => openModal('weightGraph')}
          >
            <Text style={theme.buttonText}>체중 그래프 보기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={theme.summaryButton}
            onPress={() => openModal('addWeightInfo')}
          >
            <Text style={theme.buttonText}>체중 정보 추가</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 분석 및 AI 추천 */}
      <View style={theme.analysisSection}>
        <Text style={theme.sectionTitle}>주간 분석 리포트</Text>
        <View style={theme.toolButtons}>
          <TouchableOpacity
            style={theme.toolButton}
            onPress={() => openModal('exerciseAchievement')}
          >
            <Text style={theme.toolButtonText}>운동 달성률</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={theme.toolButton}
            onPress={() => openModal('calorieBalance')}
          >
            <Text style={theme.toolButtonText}>칼로리 섭취/소모</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={theme.toolButton}
            onPress={() => openModal('sleepPattern')}
          >
            <Text style={theme.toolButtonText}>수면 패턴</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={theme.toolButton}
            onPress={() => openModal('weightChange')}
          >
            <Text style={theme.toolButtonText}>체중 변화</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={theme.toolButton}
            onPress={() => openModal('nearbyGyms')}
          >
            <Text style={theme.toolButtonText}>운동시설 찾기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={theme.toolButton}
            onPress={() => openModal('dietRecommendation')}
          >
            <Text style={theme.toolButtonText}>식단 추천</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 모달 렌더링 */}
      {renderModal()}
    </ScrollView>
  );
};



export default HealthScreen;