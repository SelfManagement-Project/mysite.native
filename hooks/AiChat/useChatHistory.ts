import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

// 대화 내역 타입 정의
type ChatSession = {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messageCount: number;
  selected?: boolean;
};

export const useChatHistory = (onSelectChat?: (sessionId: string, title: string) => void) => {
  // 원본 채팅 목록 및 표시될 채팅 목록 상태 관리
  const [originalChatSessions, setOriginalChatSessions] = useState<ChatSession[]>([
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
  ]);

  const [displayedChatSessions, setDisplayedChatSessions] = useState<ChatSession[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // 검색어에 따라 표시될 채팅 목록 필터링
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setDisplayedChatSessions(originalChatSessions);
    } else {
      const filtered = originalChatSessions.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedChatSessions(filtered);
    }
  }, [searchQuery, originalChatSessions]);

  // 초기 데이터 설정
  useEffect(() => {
    setDisplayedChatSessions(originalChatSessions);
  }, []);

  // 대화 항목 클릭 처리
  const handleChatPress = (chat: ChatSession) => {
    if (isSelectionMode) {
      // 선택 모드에서는 체크박스 토글
      toggleChatSelection(chat.id);
    } else {
      // 일반 모드에서는 채팅으로 이동
      if (onSelectChat) {
        onSelectChat(chat.id, chat.title);
      }
    }
  };

  // 대화 선택 상태 토글
  const toggleChatSelection = (chatId: string) => {
    const updatedChats = displayedChatSessions.map(chat =>
      chat.id === chatId
        ? { ...chat, selected: !chat.selected }
        : chat
    );
    setDisplayedChatSessions(updatedChats);
  };

  // 선택 모드 토글
  const toggleSelectionMode = () => {
    if (isSelectionMode) {
      // 선택 모드를 끝내고 선택 상태 초기화
      const resetChats = displayedChatSessions.map(chat => ({ ...chat, selected: false }));
      setDisplayedChatSessions(resetChats);
    }
    setIsSelectionMode(!isSelectionMode);
  };

  // 선택된 대화 삭제
  const deleteSelectedChats = () => {
    // 선택된 챗 있는지 확인
    const selectedCount = displayedChatSessions.filter(chat => chat.selected).length;

    if (selectedCount === 0) {
      Alert.alert("알림", "삭제할 대화를 선택해주세요.");
      return;
    }

    // 삭제 확인 다이얼로그
    Alert.alert(
      "대화 삭제",
      `선택한 ${selectedCount}개의 대화를 삭제하시겠습니까?`,
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => {
            // 선택되지 않은 항목만 필터링하여 업데이트
            const updatedChats = originalChatSessions.filter(chat =>
              !displayedChatSessions.find(c => c.id === chat.id && c.selected)
            );
            setOriginalChatSessions(updatedChats);
            setIsSelectionMode(false);
          }
        }
      ]
    );
  };

  // 검색 처리
  const handleSearch = () => {
    console.log("검색어:", searchQuery);
  };

  return {
    displayedChatSessions,
    searchQuery,
    isSelectionMode,
    setSearchQuery,
    handleSearch,
    handleChatPress,
    toggleSelectionMode,
    deleteSelectedChats
  };
};