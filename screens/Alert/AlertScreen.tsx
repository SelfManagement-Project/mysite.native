// react-native-vector-icons 없이 알림 화면 만들기
import React, { useState } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles, darkStyles } from '@/screens/Alert/AlertScreen.styles';

const AlertScreen = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'light' ? darkStyles : styles;

    // 알림 데이터 상태
    const [alerts, setAlerts] = useState<AlertItem[]>([
        { id: '1', type: "info", title: '시스템 공지사항', message: '앱이 업데이트 되었습니다. 새로운 기능을 확인해보세요.', read: false, date: '2025-05-04T10:30:00' },
        { id: '2', type: "warning", title: '로그인 알림', message: '새로운 기기에서 로그인이 감지되었습니다.', read: true, date: '2025-05-03T15:45:00' },
        { id: '3', type: "error", title: '결제 실패', message: '정기 결제가 실패했습니다. 결제 정보를 확인해주세요.', read: false, date: '2025-05-03T09:20:00' },
        { id: '4', type: "success", title: '예약 확정', message: '회의실 예약이 확정되었습니다.', read: true, date: '2025-05-02T11:15:00' },
        { id: '5', type: "info", title: '친구 요청', message: '홍길동님이 친구 요청을 보냈습니다.', read: false, date: '2025-05-01T16:40:00' },
    ]);

    // 필터 상태
    const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'

    // 알림 읽음/안읽음 상태 토글
    const toggleReadStatus = (id: string) => {
        setAlerts(alerts.map(alert =>
            alert.id === id ? { ...alert, read: !alert.read } : alert
        ));
    };

    // 필터링된 알림 목록
    const filteredAlerts = filter === 'all'
        ? alerts
        : filter === 'unread'
            ? alerts.filter(alert => !alert.read)
            : alerts.filter(alert => alert.read);

    // 알림 타입별 색상 정의
    const getAlertTypeColor = (type: 'info' | 'warning' | 'error' | 'success') => {
        switch (type) {
            case 'info':
                return '#3498db';
            case 'warning':
                return '#f39c12';
            case 'error':
                return '#e74c3c';
            case 'success':
                return '#2ecc71';
            default:
                return '#95a5a6';
        }
    };

    // 날짜 포맷 함수
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return `오늘 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
        } else if (date.toDateString() === yesterday.toDateString()) {
            return `어제 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
        } else {
            return `${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
        }
    };

    // 알림 항목 렌더링
    // Define the type for alert items
    type AlertItem = {
        id: string;
        type: 'info' | 'warning' | 'error' | 'success';
        title: string;
        message: string;
        read: boolean;
        date: string;
    };
    
    const renderAlertItem = ({ item }: { item: AlertItem }) => {
        const alertColor = getAlertTypeColor(item.type);

        return (
            <TouchableOpacity
                style={[styles.alertItem, item.read ? styles.readAlert : styles.unreadAlert]}
                onPress={() => toggleReadStatus(item.id)}
            >
                <View style={[styles.alertTypeIndicator, { backgroundColor: alertColor }]} />
                <View style={theme.alertContent}>
                    <View style={theme.alertHeader}>
                        <ThemedText style={theme.alertTitle}>{item.title}</ThemedText>
                        <ThemedText style={theme.alertDate}>{formatDate(item.date)}</ThemedText>
                    </View>
                    <ThemedText style={theme.alertMessage}>{item.message}</ThemedText>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ThemedView style={theme.container}>
            <View style={theme.header}>
                <ThemedText style={theme.title}>알림</ThemedText>
                <TouchableOpacity style={theme.settingsButton}>
                    <ThemedText>⚙️</ThemedText>
                </TouchableOpacity>
            </View>

            <View style={theme.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
                        onPress={() => setFilter('all')}
                    >
                        <ThemedText style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
                            전체
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'unread' && styles.activeFilter]}
                        onPress={() => setFilter('unread')}
                    >
                        <ThemedText style={[styles.filterText, filter === 'unread' && styles.activeFilterText]}>
                            읽지 않음
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'read' && styles.activeFilter]}
                        onPress={() => setFilter('read')}
                    >
                        <ThemedText style={[styles.filterText, filter === 'read' && styles.activeFilterText]}>
                            읽음
                        </ThemedText>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {filteredAlerts.length > 0 ? (
                <FlatList
                    data={filteredAlerts}
                    renderItem={renderAlertItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={theme.listContainer}
                />
            ) : (
                <View style={theme.emptyContainer}>
                    <ThemedText style={theme.emptyText}>알림이 없습니다</ThemedText>
                </View>
            )}
        </ThemedView>
    );
};



export default AlertScreen;