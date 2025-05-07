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
        marginBottom: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    currentDate: {
        fontSize: 14,
        color: '#666',
    },
    dateButton: {
        backgroundColor: '#5c6bc0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    dateButtonText: {
        color: 'white',
        fontSize: 12,
    },
    metricsContainer: {
        padding: 15,
    },
    metricCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    trackButton: {
        backgroundColor: '#5c6bc0',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    smallButton: {
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
    },
    listContainer: {
        marginVertical: 10,
    },
    listItem: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    sleepData: {
        marginVertical: 5,
    },
    sleepItem: {
        marginBottom: 3,
    },
    emptyText: {
        color: '#999',
        textAlign: 'center',
        paddingVertical: 10,
    },
    addButton: {
        backgroundColor: '#4caf50',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summarySection: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    metricsCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
    },
    metricsActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    actionButton: {
        backgroundColor: '#5c6bc0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    deleteButton: {
        backgroundColor: '#f44336',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 12,
    },
    metricsData: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    metricItem: {
        width: '48%',
        marginBottom: 5,
    },
    summaryButton: {
        backgroundColor: '#5c6bc0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    analysisSection: {
        padding: 15,
        paddingBottom: 30,
    },
    toolButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    toolButton: {
        backgroundColor: '#5c6bc0',
        width: '48%',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    toolButtonText: {
        color: 'white',
        fontWeight: 'bold',
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
