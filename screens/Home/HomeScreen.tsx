// src/screens/Home/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, useColorScheme } from 'react-native';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import { styles, darkStyles } from '@/screens/Home/HomeScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }: any) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkStyles : styles;
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePress = () => {
    const token = null; // 나중에 SecureStore 같은 데서 꺼내는 방식으로
    if (!token) {
      navigation.navigate('Login'); // 처음 진입 시엔 이게 필요할 수도 있음
    } else {
      navigation.navigate('Home'); // or 'AiChat', or 그냥 아래 탭에서 처리
    }
  };
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log('✅ 저장된 토큰:', token);
    };
    checkToken();
  }, []);

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
            source={require('@assets/images/slide-img/img1.webp')}
            style={theme.slideImage}
            resizeMode="contain"
          />
        </View>

        <View style={theme.slide}>
          <Image
            source={require('@assets/images/slide-img/img2.webp')}
            style={theme.slideImage}
            resizeMode="contain"
          />
        </View>

        <View style={theme.slide}>
          <Image
            source={require('@assets/images/slide-img/img3.webp')}
            style={theme.slideImage}
            resizeMode="contain"
          />
        </View>
      </Swiper>

      <View style={theme.row}>
        <LottieView
          source={require('@assets/animations/aiMascot.json')}
          autoPlay
          loop
          style={theme.lottie}
        />
        <View style={theme.speechBubble}>
          <Text style={theme.speechText}>
            OneFlow와 함께 스마트한 일상을 시작해보세요!
          </Text>
          <View style={theme.bubbleTail} />
        </View>
      </View>

      <TouchableOpacity style={theme.button} onPress={handlePress}>
        <Text style={theme.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
