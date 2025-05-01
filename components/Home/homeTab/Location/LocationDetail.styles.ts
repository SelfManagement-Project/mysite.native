import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    marginBottom: 4,
  },
  buttonGroup: {
    marginTop: 12,
    gap: 8, // React Native 0.71 이상만 지원됨. 아니면 Button 사이에 Margin 넣어야 함
  },
});

export default styles;
