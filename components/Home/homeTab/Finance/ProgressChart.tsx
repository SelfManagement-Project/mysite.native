// src/components/Finance/ProgressChart.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressChartProps {
  percentage: number;
  label: string;
  color?: string;
}

const ProgressChart = ({ 
  percentage = 0, 
  label, 
  color = '#4a90e2' 
}: ProgressChartProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  progressContainer: {
    height: 20,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  }
});

export default ProgressChart;