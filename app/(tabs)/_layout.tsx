import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '@/redux/reducers/Auth/userReducer';
import { useDispatch } from 'react-redux';
import { router } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isAuthenticated = useSelector((state: any) => state.user?.isAuthenticated);
  const dispatch = useDispatch();

  // console.log('isAuthenticated:', isAuthenticated);

  const handleLogout = async () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: async () => {
          try {
            dispatch(logout());
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
              <IconSymbol size={28} name="house.fill" color="white" />
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