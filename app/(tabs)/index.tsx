import React, { useEffect } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const HomeTab = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <ParallaxScrollView />
    </SafeAreaView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});