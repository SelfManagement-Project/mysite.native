import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const announcements = [
  {
    id: 1,
    title: '업데이트 안내',
    content: '앱 버전 1.2.0이 출시되었습니다. 새로운 기능과 버그 수정이 포함되어 있습니다.',
    date: '2025-04-30',
  },
  {
    id: 2,
    title: '서버 점검 공지',
    content: '5월 3일 오전 2시부터 4시까지 서버 점검이 예정되어 있습니다.',
    date: '2025-04-28',
  },
];

const AnnouncementScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📢 공지사항</Text>
      {announcements.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
  },
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default AnnouncementScreen;
