// src/screens/MyPage/ScheduleScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScheduleProgressBar from '@/components/MyPage/Schedule/ScheduleProgressBar';

const ScheduleScreen = () => {
  // 임시 데이터
  const weeklyProgress = {
    completedTasks: 8,
    totalTasks: 12
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>일정 관리</Text>
      </View>

      <View style={styles.calendarContainer}>
        <Text style={styles.sectionTitle}>달력</Text>
        <View style={styles.calendarPlaceholder}>
          <Text>달력이 여기에 표시됩니다</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>오늘의 할 일</Text>
        <View style={styles.todoList}>
          <View style={styles.todoItem}>
            <Text style={styles.priorityBadge}>1</Text>
            <View style={styles.checkbox} />
            <Text style={styles.todoText}>미팅 준비하기</Text>
          </View>
          <View style={styles.todoItem}>
            <Text style={styles.priorityBadge}>2</Text>
            <View style={[styles.checkbox, styles.checkedBox]} />
            <Text style={[styles.todoText, styles.completedText]}>보고서 작성</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>다가오는 일정</Text>
        <View style={styles.upcomingList}>
          <View style={styles.dateHeader}>
            <Text style={styles.dateHeaderText}>2025-04-11</Text>
          </View>
          <View style={styles.upcomingItem}>
            <Text style={styles.timeText}>09:00 ~ 10:30</Text>
            <Text style={styles.eventText}>팀 미팅</Text>
          </View>
          <View style={styles.upcomingItem}>
            <Text style={styles.timeText}>14:00 ~ 15:00</Text>
            <Text style={styles.eventText}>클라이언트 통화</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>주간 할 일 완료율</Text>
        <View style={styles.progressBox}>
          <ScheduleProgressBar
            completedTasks={weeklyProgress.completedTasks}
            totalTasks={weeklyProgress.totalTasks}
          />
        </View>
      </View>
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
  },
  calendarContainer: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  calendarPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  section: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  todoList: {
    marginTop: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  priorityBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#5c6bc0',
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#5c6bc0',
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: '#5c6bc0',
  },
  todoText: {
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  upcomingList: {
    marginTop: 10,
  },
  dateHeader: {
    backgroundColor: '#e0e7ff',
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  dateHeaderText: {
    fontWeight: 'bold',
  },
  upcomingItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  timeText: {
    width: 120,
    color: '#666',
  },
  eventText: {
    flex: 1,
    fontWeight: '500',
  },
  progressSection: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    elevation: 2,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  progressBox: {
    padding: 10,
  },
});

export default ScheduleScreen;