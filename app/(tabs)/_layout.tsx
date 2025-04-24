import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: props => <HapticTab {...props} />,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
          height: 65, // 탭바 높이 증가
          paddingBottom: 10, // 하단 패딩 추가
        },
      }}>

      <Tabs.Screen
        name="AiTab"
        options={{
          title: 'AI',
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIconContainer}>
              <IconSymbol size={24} name="paperplane.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <View style={styles.centerButtonContainer}>
              <IconSymbol size={28} name="house.fill" color="white" />
            </View>
          ),
          tabBarLabel: () => null, // 텍스트 레이블 제거
        }}
      />
      <Tabs.Screen
        name="LoginTab"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIconContainer}>
              <IconSymbol size={24} name="paperplane.fill" color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  centerButtonContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4078f5', // 원하는 색상으로 변경
    justifyContent: 'center',
    alignItems: 'center',
    // 그림자 효과
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
  },
  tabIconContainer: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: -5, // 다른 아이콘들도 약간 위로 조정
  }
});