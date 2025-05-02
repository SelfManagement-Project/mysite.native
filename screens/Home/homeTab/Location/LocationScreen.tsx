import React, { useState, useCallback, useRef } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, FlatList } from 'react-native';
import CategoryFilter from '@/components/Home/homeTab/Location/CategoryFilter';
import FrequentPlaceList from '@/components/Home/homeTab/Location/FrequentPlaceList';
import LocationDetail from '@/components/Home/homeTab/Location/LocationDetail';
import RecentVisitList from '@/components/Home/homeTab/Location/RecentVisitList';
import { useLocationServices } from '@/hooks/Home/homeTab/Location/useLocationServices';
import GoogleMap from '@/components/Home/homeTab/Location/GoogleMap';

const LocationScreen = () => {
  const locationProps = useLocationServices();
  const [mapExpanded, setMapExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: string; name: string; address: string; location: { latitude: number; longitude: number } }[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef<{ moveToLocation: (location: { latitude: number; longitude: number }) => void } | null>(null);

  // 지도 확대/축소 토글
  const toggleMapExpand = useCallback(() => {
    setMapExpanded(prev => !prev);
  }, []);

  // 장소 검색 함수
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      // 여기서는 간단한 예시로 임의의 장소 데이터를 생성합니다.
      // 실제로는 Google Places API를 호출해야 합니다.
      
      // 검색 딜레이 시뮬레이션 (실제 앱에서는 제거)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 예시 데이터
      const results = [
        { id: '1', name: `${searchQuery}역`, address: '서울특별시', location: { latitude: 37.5512, longitude: 126.9882 } },
        { id: '2', name: `${searchQuery} 공원`, address: '서울특별시', location: { latitude: 37.5612, longitude: 126.9962 } },
        { id: '3', name: `${searchQuery} 카페`, address: '서울특별시', location: { latitude: 37.5712, longitude: 126.9782 } },
      ];
      
      setSearchResults(results);
    } catch (error) {
      console.error('장소 검색 오류:', error);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery]);

  // 검색 결과 항목 클릭 처리
  const handleResultPress = useCallback((item: { id: string; name: string; address: string; location: { latitude: number; longitude: number } }) => {
    // GoogleMap 컴포넌트에 장소 정보 전달
    if (mapRef.current) {
      mapRef.current.moveToLocation(item.location);
    }
    
    // 검색 결과 목록 초기화
    setSearchResults([]);
  }, []);

  // 검색 결과 렌더링 함수
  const renderSearchResult = ({ item }: { item: { id: string; name: string; address: string; location: { latitude: number; longitude: number } } }) => (
    <TouchableOpacity 
      style={styles.resultItem} 
      onPress={() => handleResultPress(item)}
    >
      <Text style={styles.resultName}>{item.name}</Text>
      <Text style={styles.resultAddress}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        위치 기반 서비스
      </Text>

      {/* 장소 검색 영역 */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="장소 검색"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={isSearching}
        >
          <Text style={styles.searchButtonText}>검색</Text>
        </TouchableOpacity>
      </View>

      {/* 검색 중 로딩 표시 */}
      {isSearching && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>검색 중...</Text>
        </View>
      )}

      {/* 검색 결과 목록 */}
      {searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>검색 결과</Text>
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      )}

      <CategoryFilter {...locationProps} />
      <FrequentPlaceList {...locationProps} />
      <LocationDetail {...locationProps} />

      {/* 지도 확대/축소 버튼 */}
      <TouchableOpacity
        style={styles.expandButton}
        onPress={toggleMapExpand}
      >
        <Text style={styles.expandButtonText}>
          {mapExpanded ? '화면 축소' : '화면 확대'}
        </Text>
      </TouchableOpacity>

      {/* 지도 영역 */}
      <View style={[
        styles.mapContainer,
        mapExpanded && styles.expandedMapContainer
      ]}>
        <GoogleMap ref={mapRef} />
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
    width: 100,
    top: 20,
    alignItems: 'center',
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
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  loadingText: {
    marginLeft: 8,
    color: '#666',
  },
  resultsContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  resultAddress: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});

export default LocationScreen;