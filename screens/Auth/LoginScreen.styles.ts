// src/screens/Auth/LoginScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#5c6bc0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    color: '#5c6bc0',
    fontSize: 14,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
});

export const darkStyles = StyleSheet.create({
  ...styles,
  container: {
    ...styles.container,
    backgroundColor: '#1a1a1a',
  },
  input: {
    ...styles.input,
    backgroundColor: '#333',
    borderColor: '#555',
    color: '#eee',
  },
  title: {
    ...styles.title,
    color: '#eee',
  },
  linkText: {
    ...styles.linkText,
    color: '#90caf9',
  },
});
