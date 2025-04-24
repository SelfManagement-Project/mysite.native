// src/screens/MyPage/HealthScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import HealthModal from '@/components/MyPage/Health/HealthModal';
import DateSelectionModal from '@/components/MyPage/Health/DateSelectionModal';
import AddSleepModal from '@/components/MyPage/Health/AddSleepModal';
import AddExerciseModal from '@/components/MyPage/Health/AddExerciseModal';
import AddMealModal from '@/components/MyPage/Health/AddMealModal';
import AddWeightInfoModal from '@/components/MyPage/Health/AddWeightInfoModal';
import SleepTrackingModal from '@/components/MyPage/Health/SleepTrackingModal';
// import ExerciseTrackingModal from '@/components/Health/ExerciseTrackingModal';
// import MealLogModal from '@/components/Health/MealLogModal';

const HealthScreen = () => {
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
  const openModal = (type) => {
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>종합 건강 관리</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.currentDate}>
            적용 날짜: {selectedDate.toLocaleDateString()}
          </Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => openModal('dateSelection')}
          >
            <Text style={styles.dateButtonText}>날짜 선택</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 운동 데이터 */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.cardTitle}>운동 트래킹</Text>
          <TouchableOpacity 
            style={styles.trackButton}
            onPress={() => openModal('exerciseTracking')}
          >
            <Text style={styles.buttonText}>운동 현황 보기</Text>
          </TouchableOpacity>

          <View style={styles.listContainer}>
            {exerciseData.length > 0 ? (
              exerciseData.map((exercise) => (
                <View key={exercise.exerciseId} style={styles.listItem}>
                  <Text>{exercise.exerciseType} {exercise.duration}분</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>운동 데이터 없음</Text>
            )}
          </View>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => openModal('addExercise')}
          >
            <Text style={styles.buttonText}>운동 추가</Text>
          </TouchableOpacity>
        </View>

        {/* 식단 데이터 */}
        <View style={styles.metricCard}>
          <Text style={styles.cardTitle}>식단 관리</Text>
          <TouchableOpacity 
            style={styles.trackButton}
            onPress={() => openModal('mealLog')}
          >
            <Text style={styles.buttonText}>오늘의 식사 기록</Text>
          </TouchableOpacity>

          <View style={styles.listContainer}>
            {dietData.length > 0 ? (
              dietData.map((meal) => (
                <View key={meal.dietId} style={styles.listItem}>
                  <Text>{meal.mealType}: {meal.calories}kcal</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>식단 데이터 없음</Text>
            )}
          </View>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => openModal('addMeal')}
          >
            <Text style={styles.buttonText}>식사 추가</Text>
          </TouchableOpacity>
        </View>

        {/* 수면 데이터 */}
        <View style={styles.metricCard}>
          <Text style={styles.cardTitle}>수면 관리</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.trackButton, styles.smallButton]}
              onPress={() => openModal('sleepTracking')}
            >
              <Text style={styles.buttonText}>수면 시간/품질</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.trackButton, styles.smallButton]}
              onPress={() => openModal('sleepDetail')}
            >
              <Text style={styles.buttonText}>수면 데이터 상세</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            {sleepData.length > 0 ? (
              sleepData.map((sleep) => (
                <View key={sleep.sleepId} style={styles.sleepData}>
                  <Text style={styles.sleepItem}>취침: {new Date(sleep.sleepStart).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                  <Text style={styles.sleepItem}>기상: {new Date(sleep.sleepEnd).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                  <Text style={styles.sleepItem}>수면 품질: {sleep.sleepQuality}%</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>수면 데이터 없음</Text>
            )}
          </View>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => openModal('addSleep')}
          >
            <Text style={styles.buttonText}>수면 추가</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 건강 지표 */}
      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>주간 요약</Text>
        {healthMetrics.length > 0 ? (
          healthMetrics.map((metrics) => (
            <View key={metrics.metricId} style={styles.metricsCard}>
              <View style={styles.metricsActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => openModal('editMetrics')}
                >
                  <Text style={styles.actionButtonText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.deleteButton]}
                >
                  <Text style={styles.actionButtonText}>삭제</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.metricsData}>
                <Text style={styles.metricItem}>키: {metrics.height}cm</Text>
                <Text style={styles.metricItem}>현재: {metrics.weight}kg</Text>
                <Text style={styles.metricItem}>목표: {metrics.targetWeight}kg</Text>
                <Text style={styles.metricItem}>BMI: {metrics.bmi}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.metricsCard}>
            <Text style={styles.emptyText}>체중 데이터 없음</Text>
          </View>
        )}
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.summaryButton}
            onPress={() => openModal('weightGraph')}
          >
            <Text style={styles.buttonText}>체중 그래프 보기</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.summaryButton}
            onPress={() => openModal('addWeightInfo')}
          >
            <Text style={styles.buttonText}>체중 정보 추가</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 분석 및 AI 추천 */}
      <View style={styles.analysisSection}>
        <Text style={styles.sectionTitle}>주간 분석 리포트</Text>
        <View style={styles.toolButtons}>
          <TouchableOpacity 
            style={styles.toolButton}
            onPress={() => openModal('exerciseAchievement')}
          >
            <Text style={styles.toolButtonText}>운동 달성률</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.toolButton}
            onPress={() => openModal('calorieBalance')}
          >
            <Text style={styles.toolButtonText}>칼로리 섭취/소모</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.toolButton}
            onPress={() => openModal('sleepPattern')}
          >
            <Text style={styles.toolButtonText}>수면 패턴</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.toolButton}
            onPress={() => openModal('weightChange')}
          >
            <Text style={styles.toolButtonText}>체중 변화</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.toolButton}
            onPress={() => openModal('nearbyGyms')}
          >
            <Text style={styles.toolButtonText}>운동시설 찾기</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.toolButton}
            onPress={() => openModal('dietRecommendation')}
          >
            <Text style={styles.toolButtonText}>식단 추천</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 모달 렌더링 */}
      {renderModal()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentDate: {
    fontSize: 14,
    color: '#666',
  },
  dateButton: {
    backgroundColor: '#5c6bc0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dateButtonText: {
    color: 'white',
    fontSize: 12,
  },
  metricsContainer: {
    padding: 15,
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  trackButton: {
    backgroundColor: '#5c6bc0',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  smallButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  listContainer: {
    marginVertical: 10,
  },
  listItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sleepData: {
    marginVertical: 5,
  },
  sleepItem: {
    marginBottom: 3,
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summarySection: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  metricsCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  metricsActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#5c6bc0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
  },
  metricsData: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    marginBottom: 5,
  },
  summaryButton: {
    backgroundColor: '#5c6bc0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  analysisSection: {
    padding: 15,
    paddingBottom: 30,
  },
  toolButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolButton: {
    backgroundColor: '#5c6bc0',
    width: '48%',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  toolButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HealthScreen;