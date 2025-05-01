import AiScreen from '@/screens/AiChat/AiChatScreen';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function aiTab() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <AiScreen />
    </SafeAreaView>
  );
}

