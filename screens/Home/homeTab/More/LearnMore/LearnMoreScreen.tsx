import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles, darkStyles } from '@/screens/Home/homeTab/More/LearnMore/LearnMoreScreen.styles';

const features = [
  {
    title: '지능형 일정 관리',
    description: 'AI가 당신의 일정을 분석하고 최적의 스케줄을 제안합니다.',
  },
  {
    title: '건강 인사이트 제공',
    description: '개인 맞춤 건강 데이터를 기반으로 웰빙을 추적합니다.',
  },
  {
    title: '스마트 재무 분석',
    description: '소비 패턴을 분석해 효율적인 자산 관리를 도와드립니다.',
  },
];

const LearnMoreScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? darkStyles : styles;
  return (
    <ScrollView contentContainerStyle={theme.container}>
      <Text style={theme.header}>📝 더 알아보기</Text>
      {features.map((feature, index) => (
        <View key={index} style={theme.card}>
          <Text style={theme.title}>{feature.title}</Text>
          <Text style={theme.description}>{feature.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};



export default LearnMoreScreen;
