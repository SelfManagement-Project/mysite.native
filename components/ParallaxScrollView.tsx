import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

const HEADER_HEIGHT = 120; // 높이 조정

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const insets = useSafeAreaInsets();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.3]
          ),
        },
      ],
      opacity: interpolate(
        scrollOffset.value,
        [0, HEADER_HEIGHT * 0.7],
        [1, 0.9]
      ),
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          scrollIndicatorInsets={{ bottom }}
          contentContainerStyle={{ paddingBottom: bottom }}>
          <Animated.View
            style={[
              styles.header,
              {
                backgroundColor: colorScheme === 'dark' ? '#1e3a47' : '#185f7c',
                paddingTop: insets.top,
                height: HEADER_HEIGHT + insets.top
              },
              headerAnimatedStyle,
            ]}>
            {headerImage ? (
              headerImage
            ) : (
              <>
                {/* 검색창 */}
                <View style={styles.searchContainer}>
                  <View style={styles.searchInputContainer}>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="검색어 입력..."
                      placeholderTextColor="#888"
                    />
                  </View>
                  <TouchableOpacity style={styles.searchButton}>
                    <ThemedText style={styles.searchButtonText}>검색</ThemedText>
                  </TouchableOpacity>
                </View>

                {/* 카테고리 메뉴 */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.categoryContainer}
                  contentContainerStyle={styles.categoriesScrollContent}
                >
                  <TouchableOpacity style={styles.categoryItem}>
                    <ThemedText style={styles.categoryText}>대시보드</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryItem}>
                    <ThemedText style={styles.categoryText}>일정/승인 관리</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryItem}>
                    <ThemedText style={styles.categoryText}>건강 관리</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryItem}>
                    <ThemedText style={styles.categoryText}>재무 관리</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryItem}>
                    <ThemedText style={styles.categoryText}>위치 기반 서비스</ThemedText>
                  </TouchableOpacity>
                </ScrollView>
              </>
            )}
          </Animated.View>
          <ThemedView style={styles.content}>{children}</ThemedView>
        </Animated.ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    justifyContent: 'flex-end', // 콘텐츠를 아래쪽으로 정렬
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInputContainer: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 25,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 15,
  },
  searchButton: {
    backgroundColor: '#4078f5',
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  categoryContainer: {
    marginTop: 4,
    marginBottom: 12,
  },
  categoriesScrollContent: {
    paddingRight: 20,
  },
  categoryItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});