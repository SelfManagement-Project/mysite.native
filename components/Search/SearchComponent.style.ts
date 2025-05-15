import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    searchWrap: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    resultsContainer: {
        marginTop: 10,
    },
    resultItem: {
        marginBottom: 20,
    },
    tableHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    noResults: {
        textAlign: 'center',
        padding: 20,
        fontSize: 16,
        color: '#666',
    },
    noData: {
        textAlign: 'center',
        padding: 16,
        fontSize: 14,
        color: '#888',
    },
    dataCards: {
        flexDirection: 'column',
    },
    dataCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    titleArea: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statusBadge: {
        fontSize: 12,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 10,
        alignSelf: 'flex-start',
        overflow: 'hidden',
        marginBottom: 4,
    },
    active: {
        backgroundColor: '#a5d6a7',
        color: '#2e7d32',
    },
    inactive: {
        backgroundColor: '#ef9a9a',
        color: '#c62828',
    },
    completed: {
        backgroundColor: '#a5d6a7',
        color: '#2e7d32',
    },
    pending: {
        backgroundColor: '#ffe082',
        color: '#ff8f00',
    },
    inProgress: {
        backgroundColor: '#90caf9',
        color: '#1565c0',
    },
    missed: {
        backgroundColor: '#ef9a9a',
        color: '#c62828',
    },
    cancelled: {
        backgroundColor: '#b0bec5',
        color: '#546e7a',
    },
    default: {
        backgroundColor: '#e0e0e0',
        color: '#757575',
    },
    cardBody: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
    },
    detailItem: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        flex: 1,
        color: '#666',
        fontSize: 14,
    },
    value: {
        flex: 2,
        color: '#333',
        fontSize: 14,
    },
    budgetPeriod: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    scheduleSummary: {
        flexDirection: 'row',
        marginBottom: 12,
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
    },
    scheduleDate: {
        flex: 1,
    },
    dateLabel: {
        fontSize: 12,
        color: '#666',
    },
    dateValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    scheduleTime: {
        flex: 1,
        alignItems: 'flex-end',
    },
    timeRange: {
        fontSize: 14,
    },
    budgetSummary: {
        flexDirection: 'row',
        marginBottom: 12,
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
    },
    budgetItem: {
        flex: 1,
        alignItems: 'center',
    },
    budgetLabel: {
        fontSize: 12,
        color: '#666',
    },
    budgetAmount: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    income: {
        color: '#2e7d32',
    },
    expense: {
        color: '#c62828',
    },
    savings: {
        color: '#1565c0',
    },
    dietSummary: {
        flexDirection: 'row',
        marginBottom: 12,
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
    },
    dietItem: {
        flex: 1,
        alignItems: 'center',
    },
    dietLabel: {
        fontSize: 12,
        color: '#666',
    },
    dietValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    metricSummary: {
        flexDirection: 'row',
        marginBottom: 12,
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
    },
    metricValue: {
        flex: 1,
        alignItems: 'center',
    },
    metricLabel: {
        fontSize: 12,
        color: '#666',
    },
    metricNumber: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    // 이전 스타일에서 이어서 계속
    sleepSummary: {
        flexDirection: 'row',
        marginBottom: 12,
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
    },
    sleepItem: {
        flex: 1,
        alignItems: 'center',
    },
    sleepLabel: {
        fontSize: 12,
        color: '#666',
    },
    sleepValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    exerciseSummary: {
        flexDirection: 'row',
        marginBottom: 12,
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
    },
    exerciseItem: {
        flex: 1,
        alignItems: 'center',
    },
    exerciseLabel: {
        fontSize: 12,
        color: '#666',
    },
    exerciseValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    scheduleCard: {
        borderLeftWidth: 3,
        borderLeftColor: '#3498db',
    },
    healthMetricsCard: {
        borderLeftWidth: 3,
        borderLeftColor: '#9c27b0',
    },
    budgetCard: {
        borderLeftWidth: 3,
        borderLeftColor: '#2e7d32',
    },
    dietCard: {
        borderLeftWidth: 3,
        borderLeftColor: '#ff9800',
    },
    sleepCard: {
        borderLeftWidth: 3,
        borderLeftColor: '#673ab7',
    },
    exerciseCard: {
        borderLeftWidth: 3,
        borderLeftColor: '#f44336',
    },
});

export const darkStyles = StyleSheet.create({
    ...styles,
    container: {
        ...styles.searchWrap,
        backgroundColor: '#1a1a1a',
    },

});