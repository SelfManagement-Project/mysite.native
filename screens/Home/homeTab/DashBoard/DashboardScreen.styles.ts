import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    dashboardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    dashboardActions: {
      flexDirection: 'row',
    },
    dashboardWebviewContainer: {
      flex: 1,
      overflow: 'hidden',
    },
    webview: {
      flex: 1,
    },
  });

export const darkStyles = StyleSheet.create({
    ...styles,
    container: {
        ...styles.container,
        backgroundColor: '#1a1a1a',
    },
    // slide: {
    //     ...styles.slide,
    //     backgroundColor: '#333',
    // },
    // slideText: {
    //     ...styles.slideText,
    //     color: '#90caf9',
    // },
    // speechBubble: {
    //     ...styles.speechBubble,
    //     backgroundColor: '#37474f',
    // },
    // speechText: {
    //     ...styles.speechText,
    //     color: '#e0e0e0',
    // },
    // bubbleTail: {
    //     ...styles.bubbleTail,
    //     borderRightColor: '#37474f',
    // },
    // button: {
    //     ...styles.button,
    //     backgroundColor: '#90caf9',
    // },
});
