import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Tabs from '@/components/ui/TabBar';
import { useSelector } from 'react-redux';
import AiChatScreen from '@/screens/AiChat/AiChatScreen';
import ChatHistoryScreen from '@/screens/AiChat/ChatHistoryScreen';
import SearchBar from './Search/SearchBar';
import TextCapture from '@/screens/AiChat/TextCapture';

const AiParallaxScrollView = () => {
  const [tab, setTab] = useState<number>(0);
  const [previousTab, setPreviousTab] = useState<number>(0);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const isAuthenticated = useSelector((state: any) => state.user?.isAuthenticated);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 로컬 상태와 Redux 상태를 동기화
  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  // 탭 변경 핸들러
  const handleTabChange = (index: number) => {
    if (index === 2) { // TextCapture로 이동할 때
      setPreviousTab(tab); // 현재 탭 상태 저장
    }
    setTab(index);
  };

  // 대화 선택 핸들러
  const handleSelectChat = (sessionId: string, title: string) => {
    console.log('대화 선택:', sessionId, title);
    setSelectedSessionId(sessionId);
    setSelectedTitle(title);
    setTab(0); // AiChat 화면으로 전환
  };

  // 새 대화 시작 핸들러
  const handleNewChat = () => {
    console.log('새 대화 시작');
    setSelectedSessionId(null); // 세션 ID 초기화
    setSelectedTitle(null); // 제목 초기화
    setTab(0); // AiChat 화면으로 전환
  };

  const content = useMemo(() => {
    switch (tab) {
      case 0:
        return <AiChatScreen
          sessionId={selectedSessionId}
          title={selectedTitle}
        />;
      case 1:
        return <ChatHistoryScreen
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
        />;
      case 2:
        return <TextCapture onGoBack={() => setTab(previousTab)} />;
      default:
        return null;
    }
  }, [tab, previousTab, selectedSessionId, selectedTitle]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isLoggedIn ? (
          <>
            <SearchBar />
          </>
        ) : (
          <View style={styles.searchContainer}>
            <Image
              source={require('@/assets/images/OneFlowLogo.webp')}
              style={styles.buttonImage}
              resizeMode="contain"
            />
          </View>
        )}
      </View>

      {isLoggedIn ? (
        <>
          <Tabs
            menus={['AiChat', 'AiChatList', 'TextCapture']}
            iconName={['wechat', 'list', 'camera']}
            onSelectHandler={handleTabChange} // 여기서 handleTabChange 사용
            type='fixed'
            selectedIndex={tab}
          />
          <View style={styles.contentContainer}>
            {content}
          </View>
        </>
      ) : (
        <AiChatScreen />
      )}
    </View>
  );
};

// 스타일은 동일하게 유지
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  searchInputContainer: {
    flex: 1,
    height: 44,
    backgroundColor: '#334155',
    borderRadius: 12,
    marginRight: 12,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#475569',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#F8FAFC',
  },
  searchButton: {
    backgroundColor: '#3B82F6',
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  alertButton: {
    backgroundColor: '#fff',
    height: 44,
    paddingHorizontal: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginLeft: 10,
  },
  alertButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  contentContainer: {
    flex: 1,
  },
  buttonImage: {
    width: 24,
    height: 24,
  },
});

export default AiParallaxScrollView;