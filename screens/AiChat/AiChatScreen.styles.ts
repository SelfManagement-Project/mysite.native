// screens/AiChat/AiChatScreen.styles.ts
import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: '#f8f9ff',
    position: 'relative',
    paddingBottom: Platform.OS === 'ios' ? 0 : 16,
  },
  chatHeader: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaedf7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  chatDate: {
    fontSize: 12,
    color: '#888',
    marginLeft: 8,
  },
  sessionInfo: {
    padding: 12,
    backgroundColor: '#e6ebff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  sessionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4F6BFF',
    marginBottom: 2,
  },
  sessionMeta: {
    fontSize: 12,
    color: '#666',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eaedf7',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  // 새로 추가된 스타일
  newChatButton: {
    padding: 8,
  },
  connectionStatus: {
    backgroundColor: '#FFF3F3',
    padding: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFDBDB',
  },
  connectionStatusText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
});