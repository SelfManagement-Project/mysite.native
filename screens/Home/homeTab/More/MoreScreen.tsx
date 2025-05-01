import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const MoreScreen = () => {
  const router = useRouter();

  const menuItems = [
    { title: '📢 공지사항', screen: '/(router)/announcements' },
    { title: '📝 더 알아보기', screen: '/(router)/learnMore' },
    { title: '❓ 고객센터', screen: '/(router)/helpCenter' },
    { title: '👤 회원 정보 수정', screen: '/(router)/authUpdate' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>더 보기</Text>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.screen}
          style={styles.menuButton}
          onPress={() => router.push((item.screen) as any)}
        >
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuButton: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 16,
  },
});

export default MoreScreen;
