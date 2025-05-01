import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '@/components/Home/homeTab/Location/LocationDetail.styles';

const LocationDetail = ({ selectedLocation, toggleRoadView, showRoadView, handleNavigation }) => {
  if (!selectedLocation) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>장소 상세 정보</Text>
      <Text style={styles.label}>장소명: {selectedLocation.content}</Text>
      <Text style={styles.label}>주소: {selectedLocation.address || '정보 없음'}</Text>
      <Text style={styles.label}>연락처: {selectedLocation.phone || '정보 없음'}</Text>
      <Text style={styles.label}>카테고리: {selectedLocation.category}</Text>
      <Text style={styles.label}>위도: {selectedLocation.position.lat}</Text>
      <Text style={styles.label}>경도: {selectedLocation.position.lng}</Text>

      <View style={styles.buttonGroup}>
        <Button title={showRoadView ? '지도 보기' : '로드뷰 보기'} onPress={toggleRoadView} />
        <Button title="네비게이션 시작" onPress={handleNavigation} />
      </View>
    </View>
  );
};

export default LocationDetail;
