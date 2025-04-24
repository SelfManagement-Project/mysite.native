import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyPageScreen = () => {
  const navigation = useNavigation();

  const menuItems = [
    { title: '📅 일정 관리', screen: 'Schedule' },
    { title: '🧘 습관 관리', screen: 'Habit' },
    { title: '❤️ 건강 관리', screen: 'Health' },
    { title: '💰 재무 관리', screen: 'Finance' },
    { title: '🧭 위치 서비스', screen: 'Location' },
    { title: '📢 공지사항', screen: 'Announcements' },
    { title: '📝 더 알아보기', screen: 'LearnMore' },
    { title: '❓ 고객센터', screen: 'HelpCenter' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>마이페이지</Text>

      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.screen}
          style={styles.menuButton}
          onPress={() => navigation.navigate(item.screen as never)}
        >
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6fc',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  menuButton: {
    backgroundColor: '#e0e7ff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});
