import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

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
  const handleContact = () => {
    Alert.alert('문의 접수', '고객센터에 이메일로 문의해 주세요: support@example.com');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>❓ 자주 묻는 질문</Text>
      {faqs.map((faq, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.question}>Q. {faq.question}</Text>
          <Text style={styles.answer}>A. {faq.answer}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleContact}>
        <Text style={styles.buttonText}>문의하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  question: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
  },
  answer: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#4078f5',
    padding: 14,
    borderRadius: 8,
    marginTop: 32,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default HelpCenterScreen;
