import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CategoryFilter from '@/components/Home/homeTab/Location/CategoryFilter';
import FrequentPlaceList from '@/components/Home/homeTab/Location/FrequentPlaceList';
import LocationDetail from '@/components/Home/homeTab/Location/LocationDetail';
import RecentVisitList from '@/components/Home/homeTab/Location/RecentVisitList';
import { useLocationServices } from '@/hooks/Home/homeTab/Location/useLocationServices';
import GoogleMap from '@/components/Home/homeTab/Location/GoogleMap';

const LocationScreen = () => {
  const locationProps = useLocationServices();
  const [mapExpanded, setMapExpanded] = useState(false);

  // 지도 확대/축소 토글
  const toggleMapExpand = useCallback(() => {
    setMapExpanded(prev => !prev);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        위치 기반 서비스
      </Text>

      <CategoryFilter {...locationProps} />
      <FrequentPlaceList {...locationProps} />
      <LocationDetail {...locationProps} />

      {/* 지도 영역 */}
      <View style={[
        styles.mapContainer, 
        mapExpanded && styles.expandedMapContainer
      ]}>
        <GoogleMap />
        
        {/* 지도 확대/축소 버튼 */}
        <TouchableOpacity 
          style={styles.expandButton} 
          onPress={toggleMapExpand}
        >
          <Text style={styles.expandButtonText}>
            {mapExpanded ? '지도 축소' : '지도 확대'}
          </Text>
        </TouchableOpacity>
      </View>

      <RecentVisitList {...locationProps} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 16
  },
  mapContainer: {
    height: 300,
    marginVertical: 20,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  expandedMapContainer: {
    height: 500,
  },
  expandButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  expandButtonText: {
    fontSize: 14,
    color: '#333',
  },
});

export default LocationScreen;