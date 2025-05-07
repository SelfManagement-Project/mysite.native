import AiParallaxScrollView from '@/components/AiParallaxScrollView';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function aiTab() {

  return (
    <SafeAreaView style={styles.container}>
      <AiParallaxScrollView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});