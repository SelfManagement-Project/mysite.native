import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import CategoryFilter from '@/components/Home/homeTab/Location/CategoryFilter';
import FrequentPlaceList from '@/components/Home/homeTab/Location/FrequentPlaceList';
import LocationDetail from '@/components/Home/homeTab/Location/LocationDetail';
import RecentVisitList from '@/components/Home/homeTab/Location/RecentVisitList';
import { useLocationServices } from '@/hooks/Home/homeTab/Location/useLocationServices';

const LocationScreen = () => { 
  const locationProps = useLocationServices();         
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
            위치 기반 서비스
          </Text>
    
          <CategoryFilter {...locationProps} />
          <FrequentPlaceList {...locationProps} />
          <LocationDetail {...locationProps} />
    
          {/* 지도는 추후 추가 */}
          <View style={{
            height: 300,
            backgroundColor: '#eee',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
            <Text>📍 지도는 여기 들어올 예정</Text>
          </View>
    
          <RecentVisitList {...locationProps} />
        </ScrollView>
  );
}

export default LocationScreen; 