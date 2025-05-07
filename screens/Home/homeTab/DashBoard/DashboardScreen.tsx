import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles, darkStyles } from '@/screens/Home/homeTab/DashBoard/DashboardScreen.styles';

const DashboardScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? darkStyles : styles;
  return (
    <View style={theme.container}>
      <View style={theme.dashboardHeader}>
        <Text style={theme.headerText}>대시보드</Text>
        <View style={theme.dashboardActions}>
          {/* 버튼이 필요하다면 여기에 TouchableOpacity 등으로 추가 */}
        </View>
      </View>

      <View style={theme.dashboardWebviewContainer}>
        {/* <WebView
          source={{ uri: "http://192.168.219.96:3000/goto/lJbVFApHR?orgId=1" }}
          style={theme.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          allowsFullscreenVideo={true}
        /> */}
      </View>
    </View>
  );
};



export default DashboardScreen;