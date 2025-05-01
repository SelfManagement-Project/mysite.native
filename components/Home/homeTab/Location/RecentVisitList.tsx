import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '@/components/Home/homeTab/Location/RecentVisitList.styles';

const RecentVisitList = ({ recentLocations }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>최근 방문 기록</Text>
      {recentLocations.length === 0 ? (
        <Text style={styles.emptyText}>최근 방문 기록이 없습니다.</Text>
      ) : (
        <FlatList
          data={recentLocations}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <Text style={styles.itemText}>
              * {item.date} {item.place} {item.type} {item.amount ? `${item.amount.toLocaleString()}원 지출` : ''}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default RecentVisitList;
