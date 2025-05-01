// src/screens/Home/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, useColorScheme } from 'react-native';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import { styles, darkStyles } from '@/screens/Home/HomeScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkStyles : styles;
  const [slideIndex, setSlideIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAuthenticated = useSelector((state: any) => state.user?.isAuthenticated);

  // 로컬 상태와 Redux 상태를 동기화
  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);
  // 시작하기 버튼 핸들러 함수

  useFocusEffect(
    React.useCallback(() => {
      const checkAuth = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          console.log('화면 포커스 - 토큰 확인:', token);
          setIsLoggedIn(!!token);
        } catch (error) {
          console.error('토큰 확인 중 오류:', error);
          setIsLoggedIn(false);
        }
      };

      checkAuth();
    }, [])
  );

  const handleStartButton = async () => {
    router.navigate('/(tabs)/loginTab');
  };


  return (
    <View style={theme.container}>
      <Swiper
        style={{ height: 220 }}
        showsPagination={true}
        autoplay
        loop
        onIndexChanged={(index) => setSlideIndex(index)}
      >
        <View style={theme.slide}>
          <Image
            source={require('@/assets/images/slide-img/img1.webp')}
            style={theme.slideImage}
            resizeMode="contain"
          />
        </View>

        <View style={theme.slide}>
          <Image
            source={require('@/assets/images/slide-img/img2.webp')}
            style={theme.slideImage}
            resizeMode="contain"
          />
        </View>

        <View style={theme.slide}>
          <Image
            source={require('@/assets/images/slide-img/img3.webp')}
            style={theme.slideImage}
            resizeMode="contain"
          />
        </View>
      </Swiper>

      <View style={theme.row}>
        <LottieView
          source={require('@/assets/animations/aiMascot.json')}
          autoPlay
          loop
          style={theme.lottie}
        />
        <View style={theme.speechBubble}>
          <ThemedText style={theme.speechText}>
            OneFlow와 함께 스마트한 일상을 시작해보세요!
          </ThemedText>
          <View style={theme.bubbleTail} />
        </View>
      </View>

      {!isLoggedIn ? (
        <TouchableOpacity
          style={theme.button}
          onPress={handleStartButton}
        >
          <ThemedText style={theme.buttonText}>시작하기</ThemedText>

        </TouchableOpacity>
      ) : (
        null
      )}
    </View>
  );
};

export default HomeScreen;
