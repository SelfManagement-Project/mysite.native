import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f6fc',
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
    headerButtons: {
      flexDirection: 'row',
    },
    button: {
      backgroundColor: '#5c6bc0',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
      marginLeft: 8,
    },
    buttonText: {
      color: 'white',
      fontWeight: '500',
    },
    overviewSection: {
      padding: 15,
    },
    box: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      elevation: 2,
    },
    boxTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    chartArea: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    stats: {
      marginTop: 10,
    },
    statItem: {
      marginBottom: 5,
    },
    predictionSection: {
      padding: 15,
    },
    totalBudget: {
      marginBottom: 10,
    },
    statRow: {
      marginVertical: 5,
    },
    progressContainer: {
      height: 50,
      marginVertical: 10,
    },
    percentageText: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    transactionsSection: {
      padding: 15,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    viewMoreText: {
      color: '#5c6bc0',
    },
    transactionList: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      elevation: 2,
    },
    transactionHeader: {
      flexDirection: 'row',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    transactionHeaderText: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: 12,
    },
    transactionItem: {
      flexDirection: 'row',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    transactionText: {
      flex: 1,
      fontSize: 12,
    },
    incomeText: {
      color: '#4CAF50',
    },
    expenseText: {
      color: '#F44336',
    },
    actionButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 15,
      marginBottom: 30,
    },
    actionButton: {
      backgroundColor: '#5c6bc0',
      width: '48%',
      padding: 12,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 10,
    },
    actionButtonText: {
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
