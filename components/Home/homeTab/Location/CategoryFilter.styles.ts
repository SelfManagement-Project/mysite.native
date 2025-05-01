import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  // ✅ checkBox 스타일은 기본만 정의
  checkBoxBase: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export const getCheckBoxStyle = (checked: boolean) => ({
  ...styles.checkBoxBase,
  backgroundColor: checked ? '#000' : '#fff',
});

export default styles;
