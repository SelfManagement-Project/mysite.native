// src/screens/Home/HomeScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  slide: {
    backgroundColor: '#e0e7ff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 16,
  },
  slideText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3949ab',
  },
  slideImage: {
    width: '90%',
    height: '100%',
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 40,
  },
  lottie: {
    width: 100,
    height: 100,
    marginRight: 12,
  },
  speechBubble: {
    backgroundColor: '#c2e0f7',
    borderRadius: 12,
    padding: 16,
    maxWidth: 260,
    position: 'relative',
  },
  speechText: {
    color: '#4a5568',
    fontSize: 15,
    lineHeight: 22,
  },
  bubbleTail: {
    position: 'absolute',
    left: -10,
    top: '50%',
    transform: [{ translateY: -6 }],
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderRightWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#c2e0f7',
  },
  button: {
    backgroundColor: '#5c6bc0',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export const darkStyles = StyleSheet.create({
  ...styles,
  container: {
    ...styles.container,
    backgroundColor: '#1a1a1a',
  },
  slide: {
    ...styles.slide,
    backgroundColor: '#333',
  },
  slideText: {
    ...styles.slideText,
    color: '#90caf9',
  },
  speechBubble: {
    ...styles.speechBubble,
    backgroundColor: '#37474f',
  },
  speechText: {
    ...styles.speechText,
    color: '#e0e0e0',
  },
  bubbleTail: {
    ...styles.bubbleTail,
    borderRightColor: '#37474f',
  },
  button: {
    ...styles.button,
    backgroundColor: '#90caf9',
  },
});
