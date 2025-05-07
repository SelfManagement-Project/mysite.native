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
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    settingsButton: {
      padding: 8,
      fontSize: 20,
    },
    filterContainer: {
      marginBottom: 15,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    activeFilter: {
      backgroundColor: '#007AFF',
      borderColor: '#007AFF',
    },
    filterText: {
      fontSize: 14,
    },
    activeFilterText: {
      color: 'white',
    },
    listContainer: {
      paddingBottom: 20,
    },
    alertItem: {
      flexDirection: 'row',
      padding: 16,
      borderRadius: 10,
      marginBottom: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
    alertTypeIndicator: {
      width: 4,
      borderRadius: 2,
      marginRight: 12,
    },
    unreadAlert: {
      backgroundColor: 'rgba(0, 122, 255, 0.05)',
    },
    readAlert: {
      opacity: 0.7,
    },
    alertContent: {
      flex: 1,
    },
    alertHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    alertTitle: {
      fontWeight: '600',
      fontSize: 16,
    },
    alertDate: {
      fontSize: 12,
      color: '#888',
    },
    alertMessage: {
      fontSize: 14,
      lineHeight: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 18,
      color: '#999',
      marginTop: 16,
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
