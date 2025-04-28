import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';

const DashboardScreen = () => {
  const colorScheme = useColorScheme();
  
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>오늘의 요약</ThemedText>
        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, { backgroundColor: colorScheme === 'dark' ? '#333' : '#f5f5f5' }]}>
            <ThemedText style={styles.cardTitle}>할 일</ThemedText>
            <ThemedText style={styles.cardValue}>8개</ThemedText>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: colorScheme === 'dark' ? '#333' : '#f5f5f5' }]}>
            <ThemedText style={styles.cardTitle}>약속</ThemedText>
            <ThemedText style={styles.cardValue}>2개</ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>최근 활동</ThemedText>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <ThemedText style={styles.activityTitle}>프로젝트 미팅 완료</ThemedText>
              <ThemedText style={styles.activityTime}>2시간 전</ThemedText>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <ThemedText style={styles.activityTitle}>보고서 제출</ThemedText>
              <ThemedText style={styles.activityTime}>5시간 전</ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>빠른 실행</ThemedText>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <ThemedText style={styles.actionButtonText}>일정 추가</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <ThemedText style={styles.actionButtonText}>할 일 추가</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4078f5',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4078f5',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DashboardScreen;