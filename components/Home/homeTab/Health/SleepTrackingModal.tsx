// src/components/Health/SleepTrackingModal.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
interface SleepTrackingModalProps {
  onClose: () => void;
}

// 수면 데이터 인터페이스
interface SleepData {
  sleepId: number;
  sleepStart: string;
  sleepEnd: string;
  sleepQuality: number;
  createdAt: string;
}

const SleepTrackingModal = ({ onClose }: SleepTrackingModalProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  
  // 임시 데이터 - 실제로는 API나 로컬 저장소에서 가져옴
  const [sleepData, setSleepData] = useState<SleepData>({
    sleepId: 1,
    sleepStart: '2025-04-09T23:00:00',
    sleepEnd: '2025-04-10T07:00:00',
    sleepQuality: 85,
    createdAt: '2025-04-10'
  });
  
  // 수면 시간 계산 함수
  const calculateSleepDuration = (start: string, end: string) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    
    const durationMs = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}시간 ${minutes}분`;
  };
  
  // 수면 품질 설명 함수
  const getSleepQualityDescription = (quality: number) => {
    if (quality >= 90) return "매우 좋음 - 깊은 수면과 충분한 휴식을 취했습니다.";
    if (quality >= 70) return "좋음 - 전반적으로 충분한 수면을 취했습니다.";
    if (quality >= 50) return "보통 - 적당한 수면을 취했지만 개선의 여지가 있습니다.";
    if (quality >= 30) return "나쁨 - 수면이 부족하거나 자주 깼을 수 있습니다.";
    return "매우 나쁨 - 심각한 수면 부족이나 문제가 있을 수 있습니다.";
  };
  
  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    setDatePickerVisible(false);
    // 여기서 선택한 날짜에 맞는 데이터를 불러오는 로직이 들어감
  };
  
  // 수정 및 삭제 상태
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    sleepStart: '',
    sleepEnd: '',
    sleepQuality: 0
  });
  
  // 수정 모드 전환
  const handleEditMode = () => {
    setIsEditing(true);
    setEditData({
      sleepStart: sleepData.sleepStart.split('T')[1].substring(0, 5),
      sleepEnd: sleepData.sleepEnd.split('T')[1].substring(0, 5),
      sleepQuality: sleepData.sleepQuality
    });
  };
  
  // 수정 취소
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  // 수정 저장
  const handleSaveEdit = () => {
    // 여기에 데이터 저장 로직
    console.log('수정된 데이터:', editData);
    setIsEditing(false);
  };
  
  // 데이터 삭제
  const handleDelete = () => {
    // 여기에 삭제 로직
    console.log('삭제할 ID:', sleepData.sleepId);
    // 삭제 후 데이터를 다시 로드하거나 화면을 업데이트
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.dateFilter}>
        <Text style={styles.label}>날짜:</Text>
        <TouchableOpacity 
          style={styles.datePicker}
          onPress={() => setDatePickerVisible(true)}
        >
          <Text>{selectedDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => {/* 필터링 로직 */}}
        >
          <Text style={styles.filterButtonText}>조회</Text>
        </TouchableOpacity>
      </View>
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
      
      {sleepData ? (
        isEditing ? (
          // 수정 모드
          <View style={styles.editForm}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>취침 시간:</Text>
              <TextInput
                style={styles.input}
                value={editData.sleepStart}
                onChangeText={(text) => setEditData({...editData, sleepStart: text})}
                placeholder="HH:MM"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>기상 시간:</Text>
              <TextInput
                style={styles.input}
                value={editData.sleepEnd}
                onChangeText={(text) => setEditData({...editData, sleepEnd: text})}
                placeholder="HH:MM"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>수면 품질 ({editData.sleepQuality}%):</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={editData.sleepQuality}
                onValueChange={(value) => setEditData({...editData, sleepQuality: value})}
                minimumTrackTintColor="#5c6bc0"
                maximumTrackTintColor="#d3d3d3"
              />
            </View>
            
            <View style={styles.editActions}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.saveButton]}
                onPress={handleSaveEdit}
              >
                <Text style={styles.actionButtonText}>저장</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.cancelButton]}
                onPress={handleCancelEdit}
              >
                <Text style={styles.actionButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // 보기 모드
          <View style={styles.sleepInfo}>
            <View style={styles.sleepHeader}>
              <Text style={styles.sleepTitle}>수면 정보</Text>
              <View style={styles.sleepActions}>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={handleEditMode}
                >
                  <Ionicons name="create-outline" size={20} color="#5c6bc0" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={handleDelete}
                >
                  <Ionicons name="trash-outline" size={20} color="#f44336" />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.sleepCard}>
              <View style={styles.sleepDetail}>
                <Text style={styles.detailLabel}>취침 시간:</Text>
                <Text style={styles.detailValue}>
                  {new Date(sleepData.sleepStart).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Text>
              </View>
              
              <View style={styles.sleepDetail}>
                <Text style={styles.detailLabel}>기상 시간:</Text>
                <Text style={styles.detailValue}>
                  {new Date(sleepData.sleepEnd).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Text>
              </View>
              
              <View style={styles.sleepDetail}>
                <Text style={styles.detailLabel}>수면 시간:</Text>
                <Text style={styles.detailValue}>
                  {calculateSleepDuration(sleepData.sleepStart, sleepData.sleepEnd)}
                </Text>
              </View>
            </View>
            
            <View style={styles.qualitySection}>
              <Text style={styles.qualityTitle}>수면 품질</Text>
              <View style={styles.qualityMeter}>
                <View 
                  style={[styles.qualityBar, { width: `${sleepData.sleepQuality}%` }]}
                >
                  <Text style={styles.qualityText}>{sleepData.sleepQuality}%</Text>
                </View>
              </View>
              <Text style={styles.qualityDescription}>
                {getSleepQualityDescription(sleepData.sleepQuality)}
              </Text>
            </View>
          </View>
        )
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>해당 날짜에 기록된 수면 데이터가 없습니다.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dateFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    flex: 1,
  },
  filterButton: {
    backgroundColor: '#5c6bc0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  filterButtonText: {
    color: 'white',
  },
  noData: {
    padding: 20,
    alignItems: 'center',
  },
  noDataText: {
    color: '#999',
    fontSize: 16,
  },
  sleepInfo: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
  },
  sleepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sleepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sleepActions: {
    flexDirection: 'row',
  },
  iconButton: {
    paddingHorizontal: 10,
  },
  sleepCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    elevation: 1,
  },
  sleepDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#666',
  },
  detailValue: {
    fontWeight: 'bold',
  },
  qualitySection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    elevation: 1,
  },
  qualityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  qualityMeter: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  qualityBar: {
    height: '100%',
    backgroundColor: '#5c6bc0',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  qualityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  qualityDescription: {
    color: '#666',
    fontStyle: 'italic',
  },
  editForm: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  slider: {
    height: 40,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#4caf50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SleepTrackingModal;