// src/components/Schedule/ScheduleProgressBar.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressChartProps {
  completedTasks: number;
  totalTasks: number;
}

const ScheduleProgressBar = ({ completedTasks, totalTasks }: ProgressChartProps) => {
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            {width: `${percentage}%`}
          ]} 
        />
      </View>
      <Text style={styles.progressText}>{percentage.toFixed(0)}% 달성</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  progressContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4a90e2',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default ScheduleProgressBar;