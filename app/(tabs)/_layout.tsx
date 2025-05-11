import { Tabs, useFocusEffect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '@/redux/action/Auth/authActions';
import { useDispatch } from 'react-redux';
import { router } from 'expo-router';
import { AppDispatch } from '@/redux/store';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();
  // Redux 상태 가져오기
  const reduxIsAuthenticated = useSelector((state: any) => state.user?.isAuthenticated);
  // 토큰 기반 로그인 상태
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  // 컴포넌트 마운트 시 토큰 확인
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('토큰 확인:', token);
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('토큰 확인 오류:', error);
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, [reduxIsAuthenticated]); // Redux 상태가 변경될 때마다 토큰도 확인

  // 포커스될 때마다 토큰 확인 (화면 전환 후 돌아올 때)
  useFocusEffect(
    React.useCallback(() => {
      const checkToken = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          setIsAuthenticated(!!token);
        } catch (error) {
          console.error('토큰 확인 오류:', error);
        }
      };

      checkToken();
    }, [])
  );

  const handleLogout = async () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: async () => {
          try {
            // console.log('로그아웃 시도');
            await dispatch(logout());
            // console.log('로그아웃 성공');
            setIsAuthenticated(false);
            router.replace('/(tabs)');
          } catch (error) {
            console.error('로그아웃 오류:', error);
          }
        },
      },
    ]);
  };

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
          height: 65,
          paddingBottom: 10,
        },
      }}>

      <Tabs.Screen
        name="aiTab"
        options={{
          title: 'AI',
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIconContainer}>
              <IconSymbol size={24} name={"ai.fill" as any} color={color} />
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
              <IconSymbol size={28} name="house.fill" color={ color } />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="loginTab"
        options={{
          title: isAuthenticated ? 'Sign-Out' : 'Sign-In',
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIconContainer}>
              <IconSymbol
                size={24}
                name={isAuthenticated ? ("logout.fill" as any) : ("login.fill" as any)}
                color={color}
              />
            </View>
          ),
          tabBarButton: (props: any) => {
            if (isAuthenticated) {
              return (
                <TouchableOpacity
                  {...props}
                  onPress={handleLogout}
                >
                  {props.children}
                </TouchableOpacity>
              );
            } else {
              return <HapticTab {...props} />;
            }
          },
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
    backgroundColor: '#4078f5',
    justifyContent: 'center',
    alignItems: 'center',
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
    top: -5,
  }
});