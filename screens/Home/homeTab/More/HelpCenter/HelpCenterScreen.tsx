import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles, darkStyles } from '@/screens/Home/homeTab/More/HelpCenter/HelpCenterScreen.styles';

const faqs = [
  {
    question: '앱 사용 중 문제가 발생했어요. 어떻게 해야 하나요?',
    answer: '문제가 발생한 화면을 캡처하고 고객센터로 문의해 주세요.',
  },
  {
    question: '비밀번호를 잊어버렸어요.',
    answer: '로그인 화면의 "비밀번호 찾기"를 이용해 주세요.',
  },
  {
    question: '회원 탈퇴는 어디서 하나요?',
    answer: '마이페이지 > 회원정보 수정 > 회원 탈퇴 메뉴에서 진행하실 수 있어요.',
  },
];

const HelpCenterScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? darkStyles : styles;

  const handleContact = () => {
    Alert.alert('문의 접수', '고객센터에 이메일로 문의해 주세요: support@example.com');
  };

  return (
    <ScrollView contentContainerStyle={theme.container}>
      <Text style={theme.header}>❓ 자주 묻는 질문</Text>
      {faqs.map((faq, idx) => (
        <View key={idx} style={theme.card}>
          <Text style={theme.question}>Q. {faq.question}</Text>
          <Text style={theme.answer}>A. {faq.answer}</Text>
        </View>
      ))}

      <TouchableOpacity style={theme.button} onPress={handleContact}>
        <Text style={theme.buttonText}>문의하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


export default HelpCenterScreen;
