import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useColorScheme } from 'react-native';

interface ScheduleCalendarProps {
  markedDates?: Record<string, any>;
  onDayPress?: (day: any) => void;
  selectedDate?: string;
}

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({
  markedDates = {},
  onDayPress,
  selectedDate,
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // 현재 날짜 계산
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식

  // 기본 마커에 오늘 날짜 추가
  const defaultMarkedDates = {
    [today]: { selected: true, marked: true, selectedColor: '#5c6bc0' },
    ...markedDates,
    // 선택된 날짜가 있다면 추가
    ...(selectedDate ? { [selectedDate]: { selected: true, selectedColor: '#5c6bc0' } } : {})
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        theme={{
          calendarBackground: isDarkMode ? '#333' : '#fff',
          textSectionTitleColor: isDarkMode ? '#e0e0e0' : '#666',
          selectedDayBackgroundColor: '#5c6bc0',
          selectedDayTextColor: '#fff',
          todayTextColor: '#5c6bc0',
          dayTextColor: isDarkMode ? '#e0e0e0' : '#333',
          textDisabledColor: isDarkMode ? '#555' : '#d9e1e8',
          monthTextColor: isDarkMode ? '#e0e0e0' : '#333',
          arrowColor: '#5c6bc0',
          indicatorColor: '#5c6bc0',
        }}
        markedDates={defaultMarkedDates}
        onDayPress={onDayPress}
        enableSwipeMonths={true}
        hideExtraDays={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  calendar: {
    borderRadius: 10,
  },
});

export default ScheduleCalendar;