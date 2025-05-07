import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Switch, Modal, TextInput } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles, darkStyles } from '@/screens/Home/homeTab/Alarm/AlarmScreen.styles';

type Alarm = {
  id: string;
  title: string;
  time: string;
  days: string[];
  active: boolean;
};

const AlarmScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? darkStyles : styles;
  const [alerts, setAlerts] = useState<Alarm[]>([
    { id: '1', title: '아침 알람', time: '07:30', days: ['월', '화', '수', '목', '금'], active: true },
    { id: '2', title: '약 복용', time: '12:00', days: ['매일'], active: true },
    { id: '3', title: '운동 시간', time: '18:00', days: ['월', '수', '금'], active: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<{ id: string; title: string; time: string; days: string[]; active: boolean }>({ id: '', title: '', time: '', days: [], active: true });
  const [isEditing, setIsEditing] = useState(false);

  const toggleSwitch = (id: string) => {
    setAlerts(
      alerts.map(alert =>
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    );
  };

  const openModal = (alert?: Alarm) => {
    if (alert) {
      setCurrentAlert(alert);
      setIsEditing(true);
    } else {
      setCurrentAlert({ id: Date.now().toString(), title: '', time: '12:00', days: ['매일'], active: true });
      setIsEditing(false);
    }
    setModalVisible(true);
  };

  const saveAlert = () => {
    if (isEditing) {
      setAlerts(alerts.map(alert =>
        alert.id === currentAlert.id ? currentAlert : alert
      ));
    } else {
      setAlerts([...alerts, currentAlert]);
    }

  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    setModalVisible(false);
  };

  const renderAlertItem = ({ item }: { item: Alarm }) => (
    <ThemedView style={theme.alertItem}>
      <TouchableOpacity style={theme.alertInfo} onPress={() => openModal(item)}>
        <ThemedText style={theme.alertTitle}>{item.title}</ThemedText>
        <ThemedText style={theme.alertTime}>{item.time}</ThemedText>
        <ThemedText style={theme.alertDays}>{item.days.join(', ')}</ThemedText>
      </TouchableOpacity>
      <Switch
        value={item.active}
        onValueChange={() => toggleSwitch(item.id)}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={item.active ? '#f5dd4b' : '#f4f3f4'}
      />
    </ThemedView>
  );

  const weekdays = ['일', '월', '화', '수', '목', '금', '토', '매일'];

  const toggleDay = (day: string) => {
    if (day === '매일') {
      setCurrentAlert({ ...currentAlert, days: ['매일'] });
    } else {
      const newDays = currentAlert.days.includes(day)
        ? currentAlert.days.filter(d => d !== day && d !== '매일')
        : [...currentAlert.days.filter(d => d !== '매일'), day];
      setCurrentAlert({ ...currentAlert, days: newDays.length ? newDays : ['매일'] });
    }
  };

  return (
    <ThemedView style={theme.container}>
      <ThemedView style={theme.header}>
        <ThemedText style={theme.headerTitle}>알람</ThemedText>
        <TouchableOpacity onPress={() => openModal()}>
          <Ionicons name="add-circle" size={28} color="#81b0ff" />
        </TouchableOpacity>
      </ThemedView>

      <FlatList
        data={alerts}
        renderItem={renderAlertItem}
        keyExtractor={item => item.id}
        style={theme.list}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <ThemedView style={theme.centeredView}>
          <ThemedView style={theme.modalView}>
            <ThemedText style={theme.modalTitle}>
              {isEditing ? '알람 수정' : '새 알람 추가'}
            </ThemedText>

            <ThemedText style={theme.label}>제목</ThemedText>
            <TextInput
              style={theme.input}
              value={currentAlert.title}
              onChangeText={(text) => setCurrentAlert({ ...currentAlert, title: text })}
              placeholder="알람 제목"
            />

            <ThemedText style={theme.label}>시간</ThemedText>
            <TextInput
              style={theme.input}
              value={currentAlert.time}
              onChangeText={(text) => setCurrentAlert({ ...currentAlert, time: text })}
              placeholder="HH:MM"
              keyboardType="numbers-and-punctuation"
            />

            <ThemedText style={theme.label}>반복</ThemedText>
            <ThemedView style={theme.daysContainer}>
              {weekdays.map(day => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    currentAlert.days.includes(day) && styles.selectedDay
                  ]}
                  onPress={() => toggleDay(day)}
                >
                  <ThemedText style={currentAlert.days.includes(day) ? styles.selectedDayText : null}>
                    {day}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ThemedView>

            <ThemedView style={theme.buttonRow}>
              <TouchableOpacity style={theme.button} onPress={() => setModalVisible(false)}>
                <ThemedText style={theme.buttonText}>취소</ThemedText>
              </TouchableOpacity>

              {isEditing && (
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => deleteAlert(currentAlert.id)}>
                  <ThemedText style={theme.buttonText}>삭제</ThemedText>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveAlert}>
                <ThemedText style={theme.buttonText}>저장</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
};



export default AlarmScreen;