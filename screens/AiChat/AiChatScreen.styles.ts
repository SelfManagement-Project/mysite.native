import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 0 : 16,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});