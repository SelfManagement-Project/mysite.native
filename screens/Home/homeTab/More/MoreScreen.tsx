import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { styles, darkStyles } from '@/screens/Home/homeTab/More/MoreScreen.styles';

const MoreScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? darkStyles : styles;
  const router = useRouter();

  const menuItems = [
    { title: '📢 공지사항', screen: '/(router)/announcements' },
    { title: '📝 더 알아보기', screen: '/(router)/learnMore' },
    { title: '❓ 고객센터', screen: '/(router)/helpCenter' },
    { title: '👤 회원 정보 수정', screen: '/(router)/authUpdate' },
  ];

  return (
    <ScrollView contentContainerStyle={theme.container}>
      <Text style={theme.title}>더 보기</Text>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.screen}
          style={theme.menuButton}
          onPress={() => router.push((item.screen) as any)}
        >
          <Text style={theme.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};



export default MoreScreen;
