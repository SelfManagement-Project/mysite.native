import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    card: {
      marginBottom: 16,
      padding: 16,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
    },
    question: {
      fontWeight: '600',
      fontSize: 16,
      marginBottom: 6,
    },
    answer: {
      fontSize: 14,
      color: '#555',
    },
    button: {
      backgroundColor: '#4078f5',
      padding: 14,
      borderRadius: 8,
      marginTop: 32,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 16,
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
