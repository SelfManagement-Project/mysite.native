import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        backgroundColor: '#f0f0f0',
    },
    card: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
    },
    content: {
        fontSize: 14,
        color: '#333',
        marginBottom: 6,
    },
    date: {
        fontSize: 12,
        color: '#888',
        textAlign: 'right',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      },
      searchInputContainer: {
        flex: 1,
        height: 44,
        backgroundColor: '#334155',
        borderRadius: 12,
        marginRight: 12,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: '#475569',
      },
      searchInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#F8FAFC',
      },
      searchButton: {
        backgroundColor: '#3B82F6',
        height: 44,
        paddingHorizontal: 20,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      },
      searchButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
        letterSpacing: 0.5,
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
