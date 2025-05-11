import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemedText } from './ThemedText';
import Tabs from '@/components/ui/TabBar';
import HomeScreen from '@/screens/Home/HomeScreen';
import DashboardScreen from '@/screens/Home/homeTab/DashBoard/DashboardScreen';
import ScheduleScreen from '@/screens/Home/homeTab/Schedule/ScheduleScreen';
import HabitScreen from '@/screens/Home/homeTab/Schedule/HabitScreen';
import HealthScreen from '@/screens/Home/homeTab/Health/HealthScreen';
import FinanceScreen from '@/screens/Home/homeTab/Finance/FinanceScreen';
import LocationScreen from '@/screens/Home/homeTab/Location/LocationScreen';
import AlarmScreen from '@/screens/Home/homeTab/Alarm/AlarmScreen';
import MoreScreen from '@/screens/Home/homeTab/More/MoreScreen';
import SearchBar from './ui/SearchBar';

const HomeParallaxScrollView = () => {
  const [tab, setTab] = useState(0);

  // ✅ Redux 상태만 사용
  const isAuthenticated = useSelector((state: any) => state.user?.isAuthenticated);

  const content = useMemo(() => {
    switch (tab) {
      case 0: return <HomeScreen />;
      case 1: return <DashboardScreen />;
      case 2: return <ScheduleScreen />;
      case 3: return <HabitScreen />;
      case 4: return <AlarmScreen />;
      case 5: return <HealthScreen />;
      case 6: return <FinanceScreen />;
      case 7: return <LocationScreen />;
      case 8: return <MoreScreen />;
      default: return null;
    }
  }, [tab]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isAuthenticated ? (
          <SearchBar />
        ) : (
          <View style={styles.searchContainer}>
            <Image
              source={require('@/assets/images/OneFlowLogo.webp')}
              style={styles.buttonImage}
              resizeMode="contain"
            />
          </View>
        )}
      </View>

      {isAuthenticated ? (
        <>
          <Tabs
            menus={['Home', 'Dashboard', 'Schedule', 'Habit', 'Alarm', 'Health', 'Finance', 'Loacation', 'Moere']}
            iconName={['home', 'dashboard', 'calendar', 'check-square-o', 'bell', 'heartbeat', 'money', 'location-arrow', 'th-list']}
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
    </View>
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
  contentContainer: {
    flex: 1,
  },
  buttonImage: {
    width: 24,
    height: 24,
  },
});

export default HomeParallaxScrollView;
