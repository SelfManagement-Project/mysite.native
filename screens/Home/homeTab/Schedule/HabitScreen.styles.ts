import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6fc',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        textAlign: 'center',
        color: '#666',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttons: {
        flexDirection: 'row',
    },
    btn: {
        backgroundColor: '#5c6bc0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginLeft: 8,
    },
    btnText: {
        color: 'white',
        fontWeight: '500',
    },
    chartContainer: {
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 10,
        padding: 15,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    todayHabits: {
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 10,
        padding: 15,
        elevation: 2,
    },
    habitItem: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    habitHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    habitName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#5c6bc0',
    },
    checkedBox: {
        backgroundColor: '#5c6bc0',
    },
    progressBar: {
        height: 10,
        backgroundColor: '#e2e8f0',
        borderRadius: 5,
        marginBottom: 5,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4a90e2',
    },
    progressText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    habitDetails: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 4,
    },
    habitDetailText: {
        fontSize: 14,
        marginBottom: 3,
    },
    label: {
        fontWeight: 'bold',
    },
    reportButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
        marginBottom: 30,
    },
    reportBtn: {
        backgroundColor: '#5c6bc0',
        padding: 12,
        borderRadius: 6,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    reportBtnText: {
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
