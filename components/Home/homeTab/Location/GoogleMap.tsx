import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

const GoogleMap = () => {
  // 현재 위치를 저장할 상태
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // 지도 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  // 초기 위치 설정 (서울 좌표)
  const initialRegion = {
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // 컴포넌트 마운트 시 위치 권한 요청 및 현재 위치 가져오기
  useEffect(() => {
    (async () => {
      try {
        // 위치 권한 요청
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('위치 접근 권한이 거부되었습니다.');
          setIsLoading(false);
          return;
        }

        // 현재 위치 가져오기
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setIsLoading(false);
      } catch (error) {
        setErrorMsg('위치를 가져오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    })();
  }, []);

  // 맵 타입 설정 - 필요한 경우 standard로 설정
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>지도를 불러오는 중...</Text>
        </View>
      ) : errorMsg ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={currentLocation || initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
          mapType="standard" // 지도 타입 설정 (검은 화면 이슈 해결)
        >
          {/* 현재 위치 마커 */}
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="현재 위치"
              description="내 현재 위치입니다"
              pinColor="blue"
            />
          )}
          
          {/* 서울 마커 */}
          <Marker
            coordinate={{
              latitude: 37.5665,
              longitude: 126.9780,
            }}
            title="서울"
            description="대한민국의 수도"
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>서울</Text>
                <Text style={styles.calloutDescription}>대한민국의 수도</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
  },
  errorText: {
    color: '#721c24',
    textAlign: 'center',
    padding: 10,
  },
  calloutContainer: {
    width: 150,
    padding: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
  },
});

export default GoogleMap;