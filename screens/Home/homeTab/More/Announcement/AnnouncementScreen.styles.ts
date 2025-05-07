import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      backgroundColor: '#f0f0f0',
    },
    card: {
      marginBottom: 16,
      padding: 16,
      backgroundColor: '#f2f2f2',
      borderRadius: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 6,
    },
    content: {
      fontSize: 14,
      color: '#333',
      marginBottom: 6,
    },
    date: {
      fontSize: 12,
      color: '#888',
      textAlign: 'right',
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
