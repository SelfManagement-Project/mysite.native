import React, { useState } from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles, darkStyles } from '@/screens/Search/SearchResultScreen.styles';
import { ThemedText } from '@/components/ThemedText';
import SearchComponent from '@/components/Search/SearchComponent';
import { useSearch } from '@/hooks/useSearch';

const announcements = [
  {
    id: 1,
    title: '검색어를 입력하세요',
    content: '상단 검색창에 원하는 검색어를 입력하고 검색 버튼을 터치하세요.',
  },
];

const SearchResultScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? styles : darkStyles;
  
  // useSearch 훅 사용
  const { query, setQuery, results, handleSearch } = useSearch();
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  
  // 검색 실행 함수
  const executeSearch = async () => {
    if (query.trim()) {
      await handleSearch();
      setShowDetailedResults(true);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={theme.container}>
      {/* 검색 UI */}
      <View style={theme.searchContainer}>
        <View style={theme.searchInputContainer}>
          <TextInput
            style={theme.searchInput}
            placeholder="검색어를 입력하세요"
            placeholderTextColor={colorScheme === 'light' ? "#9CA3AF" : "#64748B"}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onSubmitEditing={executeSearch}
          />
        </View>
        <TouchableOpacity style={theme.searchButton} onPress={executeSearch}>
          <ThemedText style={theme.searchButtonText}>🔍</ThemedText>
        </TouchableOpacity>
      </View>

      {/* 결과 표시 */}
      {results.length > 0 && showDetailedResults ? (
        <SearchComponent />
      ) : (
        <>
          <Text style={theme.header}>🔍 검색</Text>
          {announcements.map((item) => (
            <View key={item.id} style={theme.card}>
              <Text style={theme.title}>{item.title}</Text>
              <Text style={theme.content}>{item.content}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default SearchResultScreen;