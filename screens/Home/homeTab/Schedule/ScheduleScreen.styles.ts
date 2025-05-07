// src/screens/Home/homeTab/Schedule/ScheduleScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6fc',
    },
    header: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    calendarContainer: {
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 10,
        padding: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    calendarPlaceholder: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    // 새로 추가된 스타일
    selectedDateContainer: {
        backgroundColor: '#e0e7ff',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
    },
    selectedDateText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    // 기존 스타일들...
    section: {
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 10,
        padding: 15,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    todoList: {
        marginTop: 10,
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    priorityBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#5c6bc0',
        color: 'white',
        textAlign: 'center',
        lineHeight: 24,
        marginRight: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#5c6bc0',
        marginRight: 10,
    },
    checkedBox: {
        backgroundColor: '#5c6bc0',
    },
    todoText: {
        flex: 1,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    upcomingList: {
        marginTop: 10,
    },
    dateHeader: {
        backgroundColor: '#e0e7ff',
        padding: 8,
        borderRadius: 4,
        marginBottom: 10,
    },
    dateHeaderText: {
        fontWeight: 'bold',
    },
    upcomingItem: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    timeText: {
        width: 120,
        color: '#666',
    },
    eventText: {
        flex: 1,
        fontWeight: '500',
    },
    progressSection: {
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 10,
        padding: 15,
        marginBottom: 30,
        elevation: 2,
    },
    progressTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    progressBox: {
        padding: 10,
    },
    viewToggleButton: {
        position: 'absolute',
        right: 15,
        top: 15,
        backgroundColor: '#5c6bc0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    viewToggleText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 12,
    },
});

export const darkStyles = StyleSheet.create({
    ...styles,
    container: {
        ...styles.container,
        backgroundColor: '#1a1a1a',
    },
    calendarContainer: {
        ...styles.calendarContainer,
        backgroundColor: '#333',
    },
    section: {
        ...styles.section,
        backgroundColor: '#333',
    },
    sectionTitle: {
        ...styles.sectionTitle,
        color: '#e0e0e0',
    },
    todoText: {
        ...styles.todoText,
        color: '#e0e0e0',
    },
    dateHeaderText: {
        ...styles.dateHeaderText,
        color: '#333',
    },
    timeText: {
        ...styles.timeText,
        color: '#bbb',
    },
    eventText: {
        ...styles.eventText,
        color: '#e0e0e0',
    },
    progressSection: {
        ...styles.progressSection,
        backgroundColor: '#333',
    },
    progressTitle: {
        ...styles.progressTitle,
        color: '#e0e0e0',
    },
    title: {
        ...styles.title,
        color: '#e0e0e0',
    },
    selectedDateText: {
        ...styles.selectedDateText,
        color: '#333',
    },
});