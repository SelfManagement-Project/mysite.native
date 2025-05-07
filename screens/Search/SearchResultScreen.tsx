import React from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles, darkStyles } from '@/screens/Search/SearchResultScreen.styles';
import { ThemedText } from '@/components/ThemedText';

const announcements = [
  {
    id: 1,
    title: '업데이트 안내',
    content: '앱 버전 1.2.0이 출시되었습니다. 새로운 기능과 버그 수정이 포함되어 있습니다.',
    date: '2025-04-30',
  },
  {
    id: 2,
    title: '서버 점검 공지',
    content: '5월 3일 오전 2시부터 4시까지 서버 점검이 예정되어 있습니다.',
    date: '2025-04-28',
  },
];

const SearchResultScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? darkStyles : styles;

  const handleSearch = async () => {
    console.log('검색 버튼 클릭');
  };
  
  return (
    <ScrollView contentContainerStyle={theme.container}>



      <View style={theme.searchContainer}>
        <View style={theme.searchInputContainer}>
          <TextInput
            style={theme.searchInput}
            placeholder="검색어를 입력하세요"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={theme.searchButton} onPress={() => { handleSearch() }}>
          <ThemedText style={theme.searchButtonText}>검색</ThemedText>
        </TouchableOpacity>
      </View>




      <Text style={theme.header}>📢 검색 결과</Text>
      {announcements.map((item) => (
        <View key={item.id} style={theme.card}>
          <Text style={theme.title}>{item.title}</Text>
          <Text style={theme.content}>{item.content}</Text>
          <Text style={theme.date}>{item.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};



export default SearchResultScreen;
