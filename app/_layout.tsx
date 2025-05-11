import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import { AppDispatch, store } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '@/redux/action/Auth/authActions'; // ✅ 추가

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <RootLayoutInner colorScheme={colorScheme ?? null} />
    </Provider>
  );
}

// 👇 아래처럼 분리된 내부 컴포넌트에서 초기화
const RootLayoutInner = ({ colorScheme }: { colorScheme: string | null }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    SplashScreen.hideAsync();
    dispatch(initializeAuth());
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(router)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
};
