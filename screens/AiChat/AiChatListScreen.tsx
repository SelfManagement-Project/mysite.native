import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 대화 내역 타입 정의
type ChatSession = {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messageCount: number;
};

interface AiChatListScreenProps {
  onSelectChat?: (sessionId: string, title: string) => void;
  onNewChat?: () => void;
}

const AiChatListScreen: React.FC<AiChatListScreenProps> = ({ onSelectChat, onNewChat }) => {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const router = useRouter();
  // 컴포넌트 마운트 시 토큰 확인
  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');
  //       console.log('토큰 확인:', token);
  //       setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false

  //       if(isLoggedIn === false) {
  //         // 로그인 상태가 아닐 경우 로그인 화면으로 리다이렉트
  //         router.push('/(tabs)/loginTab');    
  //       }
  //     } catch (error) {
  //       console.error('토큰 확인 중 오류:', error);
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   checkToken();
  // }, []); // 컴포넌트 마운트 시 한 번만 실행

  

  // 샘플 AI 대화 히스토리 데이터
  const chatSessions: ChatSession[] = [
    {
      id: "1",
      title: "React Native 코드 작성 도움",
      lastMessage: "이미지 캡처 기능은 CameraComponent에서 구현하면 됩니다.",
      date: "방금 전",
      messageCount: 12,
    },
    {
      id: "2",
      title: "여행 계획 추천",
      lastMessage: "5월에 제주도 여행이라면 성산일출봉과 우도를 추천합니다.",
      date: "오늘",
      messageCount: 8,
    },
    {
      id: "3",
      title: "영어 문장 교정",
      lastMessage: "The document has been reviewed and approved.",
      date: "어제",
      messageCount: 5,
    },
    {
      id: "4",
      title: "프로젝트 기획안 작성",
      lastMessage: "기획안에 포함될 주요 섹션은 다음과 같습니다.",
      date: "3일 전",
      messageCount: 20,
    },
    {
      id: "5",
      title: "사진 분석 및 설명",
      lastMessage: "해당 사진은 일몰 시간에 바다를 배경으로 촬영된 풍경으로 보입니다.",
      date: "1주일 전",
      messageCount: 4,
    },
    {
      id: "6",
      title: "레시피 추천",
      lastMessage: "간단하게 만들 수 있는 파스타 레시피는 다음과 같습니다.",
      date: "2주일 전",
      messageCount: 9,
    },
    {
      id: "7",
      title: "앱 아이디어 브레인스토밍",
      lastMessage: "사용자의 일상 활동을 기록하고 분석하는 앱은 어떨까요?",
      date: "한 달 전",
      messageCount: 16,
    },
  ];

  // 대화 항목 클릭 처리
  const handleChatPress = (chat: ChatSession) => {
    // 선택한 채팅 데이터와 함께 AiChatScreen으로 이동
    if (onSelectChat) {
      onSelectChat(chat.id, chat.title);
    }
  };

  // 새 대화 시작 처리
  const handleNewChat = () => {
    // 새 대화 시작을 위해 AiChatScreen으로 이동
    if (onNewChat) {
      onNewChat();
    }
  };

  // 대화 항목 렌더링
  const renderChatItem = ({ item }: { item: ChatSession }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleChatPress(item)}
    >
      <View style={styles.chatIcon}>
        <Ionicons name="chatbubble-ellipses-outline" size={28} color="#4F6BFF" />
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.chatDate}>{item.date}</Text>
        </View>
        <Text
          style={styles.chatMessage}
          numberOfLines={2}
        >
          {item.lastMessage}
        </Text>
        <View style={styles.chatFooter}>
          <Text style={styles.messageCount}>
            <Ionicons name="chatbubble-outline" size={12} color="#888" /> {item.messageCount}개 메시지
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar />

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>대화 내역</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="trash-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 대화 목록 */}
      {chatSessions.length > 0 ? (
        <FlatList
          data={chatSessions}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="chatbubbles-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>대화 내역이 없습니다</Text>
          <Text style={styles.emptySubText}>AI와 새로운 대화를 시작해보세요!</Text>
        </View>
      )}

      {/* 새 대화 버튼 */}
      <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    padding: 8,
    marginLeft: 12,
  },
  listContainer: {
    paddingVertical: 8,
  },
  chatItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  chatIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EEF1FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  chatDate: {
    fontSize: 12,
    color: "#888",
  },
  chatMessage: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
    lineHeight: 20,
  },
  chatFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageCount: {
    fontSize: 12,
    color: "#888",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#888",
  },
  emptySubText: {
    marginTop: 8,
    fontSize: 14,
    color: "#aaa",
  },
  newChatButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4F6BFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default AiChatListScreen;