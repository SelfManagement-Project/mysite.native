import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

const GoogleMap = forwardRef((props, ref) => {
  // 현재 위치를 저장할 상태
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // 지도 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  // 스트리트뷰 표시 여부
  const [showStreetView, setShowStreetView] = useState(false);
  // 스트리트뷰 위치
  const [streetViewLocation, setStreetViewLocation] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
  });
  // 맵뷰 참조
  const mapViewRef = React.useRef<MapView | null>(null);

  // 초기 위치 설정 (서울 좌표)
  const initialRegion = {
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // 부모 컴포넌트에 노출할 메서드
  useImperativeHandle(ref, () => ({
    moveToLocation: (location: { latitude: number; longitude: number }) => {
      if (mapViewRef.current) {
        mapViewRef.current.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
        
        // 위치에 마커 표시를 위해 스트리트뷰 위치 업데이트
        setStreetViewLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      }
    }
  }));

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

  // 지도에서 위치를 터치했을 때 스트리트뷰 위치 설정
  const handleMapPress = (e: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => {
    const { coordinate } = e.nativeEvent;
    setStreetViewLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  // 스트리트뷰 토글
  const toggleStreetView = () => {
    setShowStreetView(!showStreetView);
  };

  // 스트리트뷰를 위한 HTML 생성
  const getStreetViewHtml = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <style>
            html, body, #street-view { height: 100%; width: 100%; margin: 0; padding: 0; }
            
            /* 구글 저작권, 단축키 정보 등을 숨기는 CSS */
            .gmnoprint, .gm-style-cc { display: none !important; }
            // a[href^="https://maps.google.com/maps"] { display: none !important; }

          </style>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAuoG9-NYLZ0hxesA1iLNIbG3iNCN6OluE"></script>
          <script>
            function initialize() {
              // 여기서부터는 기존 코드와 동일
              const panorama = new google.maps.StreetViewPanorama(
                document.getElementById('street-view'),
                {
                  position: {lat: ${streetViewLocation.latitude}, lng: ${streetViewLocation.longitude}},
                  pov: {heading: 165, pitch: 0},
                  zoom: 1,
                  addressControl: true,
                  // enableCloseButton: true,
                  fullscreenControl: true,
                  motionTracking: true,
                  zoomControl: true,
                  showRoadLabels: true
                }
              );
            }
          </script>
        </head>
        <body onload="initialize()">
          <div id="street-view"></div>
        </body>
      </html>
    `;
  };

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
      ) : showStreetView ? (
        // 스트리트뷰 표시
        <View style={styles.webviewContainer}>
          <WebView
            source={{ html: getStreetViewHtml() }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={toggleStreetView}
          >
            <Text style={styles.buttonText}>지도로 돌아가기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // 일반 지도 표시
        <View style={styles.mapContainer}>
          <MapView
            ref={mapViewRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={currentLocation || initialRegion}
            showsUserLocation={true}
            showsMyLocationButton={true}
            mapType="standard" // 지도 타입 설정 (검은 화면 이슈 해결)
            onPress={handleMapPress}
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

            {/* 선택한 위치 마커 */}
            <Marker
              coordinate={streetViewLocation}
              title="선택한 위치"
              description="이 위치의 스트리트뷰를 볼 수 있습니다"
              pinColor="green"
            />
          </MapView>

          <TouchableOpacity
            style={styles.streetViewButton}
            onPress={toggleStreetView}
          >
            <Text style={styles.buttonText}>스트리트뷰 보기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});

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
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  webviewContainer: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
  },
  streetViewButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,  // 왼쪽으로 위치 변경
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,  // 안드로이드 그림자
    shadowColor: '#000',  // iOS 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,  // 왼쪽으로 위치 변경
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,  // 안드로이드 그림자
    shadowColor: '#000',  // iOS 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default GoogleMap;