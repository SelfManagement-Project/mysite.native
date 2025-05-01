import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '@/components/Home/homeTab/Location/FrequentPlaceList.styles';

const FrequentPlaceList = ({ markers, handleMarkerClick }) => {
  const frequentPlaces = markers.filter((m) => m.category === 'frequent');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>자주 가는 장소</Text>
      {frequentPlaces.length > 0 ? (
        frequentPlaces.map((marker, index) => (
          <TouchableOpacity key={index} onPress={() => handleMarkerClick(marker)}>
            <Text style={styles.itemText}>* {marker.content}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.emptyText}>등록된 장소가 없습니다.</Text>
      )}
    </View>
  );
};

export default FrequentPlaceList;
