// src/screens/MyPage/ScheduleScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ScheduleProgressBar from '@/components/Home/homeTab/Schedule/ScheduleProgressBar';
import ScheduleCalendar from '@/components/Home/homeTab/Schedule/ScheduleCalendar';
import { styles, darkStyles } from '@/screens/Home/homeTab/Schedule/ScheduleScreen.styles';
import { useColorScheme } from 'react-native';

const ScheduleScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? darkStyles : styles;
  const [selectedDate, setSelectedDate] = useState('');

  // 임시 데이터
  const weeklyProgress = {
    completedTasks: 8,
    totalTasks: 12
  };

  // 캘린더 마커 데이터 (일정이 있는 날짜)
  const markedDates = {
    '2025-05-05': { marked: true, dotColor: '#5c6bc0' },
    '2025-05-10': { marked: true, dotColor: '#ff7043' },
    '2025-05-15': { marked: true, dotColor: '#66bb6a' },
    '2025-05-20': { marked: true, dotColor: '#5c6bc0' },
  };

  // 날짜 선택 핸들러
  const handleDatePress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  return (
    <ScrollView style={theme.container}>
      <View style={theme.header}>
        <Text style={theme.title}>일정 관리</Text>
      </View>

      <View style={theme.calendarContainer}>
        <Text style={theme.sectionTitle}>달력</Text>
        <ScheduleCalendar 
          markedDates={markedDates}
          onDayPress={handleDatePress}
          selectedDate={selectedDate}
        />
        
        {selectedDate && (
          <View style={theme.selectedDateContainer}>
            <Text style={theme.selectedDateText}>선택한 날짜: {selectedDate}</Text>
          </View>
        )}
      </View>

      <View style={theme.section}>
        <Text style={theme.sectionTitle}>오늘의 할 일</Text>
        <View style={theme.todoList}>
          <View style={theme.todoItem}>
            <Text style={theme.priorityBadge}>1</Text>
            <View style={theme.checkbox} />
            <Text style={theme.todoText}>미팅 준비하기</Text>
          </View>
          <View style={theme.todoItem}>
            <Text style={theme.priorityBadge}>2</Text>
            <View style={[theme.checkbox, theme.checkedBox]} />
            <Text style={[theme.todoText, theme.completedText]}>보고서 작성</Text>
          </View>
        </View>
      </View>

      <View style={theme.section}>
        <Text style={theme.sectionTitle}>다가오는 일정</Text>
        <View style={theme.upcomingList}>
          <View style={theme.dateHeader}>
            <Text style={theme.dateHeaderText}>2025-04-11</Text>
          </View>
          <View style={theme.upcomingItem}>
            <Text style={theme.timeText}>09:00 ~ 10:30</Text>
            <Text style={theme.eventText}>팀 미팅</Text>
          </View>
          <View style={theme.upcomingItem}>
            <Text style={theme.timeText}>14:00 ~ 15:00</Text>
            <Text style={theme.eventText}>클라이언트 통화</Text>
          </View>
        </View>
      </View>

      <View style={theme.progressSection}>
        <Text style={theme.progressTitle}>주간 할 일 완료율</Text>
        <View style={theme.progressBox}>
          <ScheduleProgressBar
            completedTasks={weeklyProgress.completedTasks}
            totalTasks={weeklyProgress.totalTasks}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ScheduleScreen;