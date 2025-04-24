import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function LoginTab() {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const addItem = () => {
    if (inputText.trim()) {
      setItems([...items, inputText]);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>테스트 화면</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="항목 입력"
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.buttonText}>추가</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.listContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item}</Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  },
  item: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});