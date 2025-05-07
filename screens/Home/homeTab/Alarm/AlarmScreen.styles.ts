import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingTop: 10,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    list: {
      flex: 1,
    },
    alertItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 8,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    alertInfo: {
      flex: 1,
    },
    alertTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 4,
    },
    alertTime: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    alertDays: {
      fontSize: 14,
      color: '#666',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      width: '80%',
      borderRadius: 20,
      padding: 24,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      fontWeight: '500',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 10,
      marginBottom: 16,
      fontSize: 16,
    },
    daysContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
      justifyContent: 'center',
    },
    dayButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 4,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    selectedDay: {
      backgroundColor: '#81b0ff',
      borderColor: '#81b0ff',
    },
    selectedDayText: {
      color: 'white',
      fontWeight: 'bold',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 4,
      backgroundColor: '#ccc',
    },
    deleteButton: {
      backgroundColor: '#ff6b6b',
    },
    saveButton: {
      backgroundColor: '#81b0ff',
    },
    buttonText: {
      fontWeight: 'bold',
      color: 'white',
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
