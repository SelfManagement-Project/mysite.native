import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from './ThemedText';
import Tabs from '@/components/ui/HomeTabBar';
import HomeScreen from '@/screens/Home/HomeScreen';
import DashboardScreen from '@/screens/Home/homeTab/DashBoard/DashboardScreen';
import ScheduleScreen from '@/screens/Home/homeTab/Schedule/ScheduleScreen';
import HabitScreen from '@/screens/Home/homeTab/Schedule/HabitScreen';
import HealthScreen from '@/screens/Home/homeTab/Health/HealthScreen';
import FinanceScreen from '@/screens/Home/homeTab/Finance/FinanceScreen';
import LocationScreen from '@/screens/Home/homeTab/Location/LocationScreen';
import NoticeScreen from '@/screens/Home/homeTab/Notice/NoticeScreen';
import LearnMoreScreen from '@/screens/Home/homeTab/LearnMore/LearnMoreScreen';
import HelpCenterScreen from '@/screens/Home/homeTab/HelpCenter/HelpCenterScreen';
import { useSelector } from 'react-redux';

const ParallaxScrollView = () => {
  const [tab, setTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAuthenticated = useSelector((state: any) => state.user?.isAuthenticated);

  // 로컬 상태와 Redux 상태를 동기화
  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  // 컴포넌트가 마운트될 때와 화면에 포커스될 때마다 로그인 상태 확인
  useFocusEffect(
    React.useCallback(() => {
      const checkAuth = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          console.log('화면 포커스 - 토큰 확인:', token);
          setIsLoggedIn(!!token);
        } catch (error) {
          console.error('토큰 확인 중 오류:', error);
          setIsLoggedIn(false);
        }
      };

      checkAuth();
    }, [])
  );

  const content = useMemo(() => {
    switch (tab) {
      case 0: return <HomeScreen />;
      case 1: return <DashboardScreen />;
      case 2: return <ScheduleScreen />;
      case 3: return <HabitScreen />;
      case 4: return <HealthScreen />;
      case 5: return <FinanceScreen />;
      case 6: return <LocationScreen />;
      case 7: return <NoticeScreen />;
      case 8: return <LearnMoreScreen />;
      case 9: return <HelpCenterScreen />;
      default: return null;
    }
  }, [tab]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {isLoggedIn ? (
          <>
            <View style={styles.searchContainer}>
              <Image
                source={require('@/assets/images/OneFlowLogo.webp')} // 이미지 경로를 실제 이미지 파일 경로로 변경해주세요
                style={styles.buttonImage}
                resizeMode="contain"
              />
              <View style={styles.searchInputContainer}>

                <TextInput
                  style={styles.searchInput}
                  placeholder="검색어를 입력하세요"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <TouchableOpacity style={styles.searchButton}>
                <ThemedText style={styles.searchButtonText}>검색</ThemedText>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.searchContainer}>
            <Image
              source={require('@/assets/images/OneFlowLogo.webp')} // 이미지 경로를 실제 이미지 파일 경로로 변경해주세요
              style={styles.buttonImage}
              resizeMode="contain"
            />
          </View>
        )}
      </View>

      {isLoggedIn ? (
        <>
          <Tabs
            menus={['홈', '대시보드', '일정', '습관', '건강', '재정', '위치', '알림', '더보기', '도움말']}
            onSelectHandler={(index: number) => {
              setTab(index);
            }}
            type='fixed'
            selectedIndex={tab}
          />
          <View style={styles.contentContainer}>
            {content}
          </View>
        </>
      ) : (
        <HomeScreen />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    height: 44,
    backgroundColor: '#334155',
    borderRadius: 12,
    marginRight: 12,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#475569',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#F8FAFC',
  },
  searchButton: {
    backgroundColor: '#3B82F6',
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  contentContainer: {
    flex: 1,
  },
  buttonImage: {
    width: 24, // 원하는 크기로 조정
    height: 24, // 원하는 크기로 조정
  },
});

export default ParallaxScrollView;