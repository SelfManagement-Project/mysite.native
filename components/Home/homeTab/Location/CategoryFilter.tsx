import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles, { getCheckBoxStyle } from '@/components/Home/homeTab/Location/CategoryFilter.styles';

const CategoryFilter = ({ categories, handleCategoryChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>카테고리</Text>
      {['exercise', 'shopping', 'frequent'].map((key) => (
        <TouchableOpacity
          key={key}
          onPress={() => handleCategoryChange(key)}
          style={styles.item}
        >
          <View style={getCheckBoxStyle(categories[key])} />
          <Text>
            {key === 'exercise'
              ? '운동 시설'
              : key === 'shopping'
              ? '쇼핑 장소'
              : '자주 가는 곳'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryFilter;
