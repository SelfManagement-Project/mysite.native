import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16
    },
    mapContainer: {
        height: 300,
        marginVertical: 20,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    expandedMapContainer: {
        height: 500,
    },
    expandButton: {
        width: 100,
        top: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    expandButtonText: {
        fontSize: 14,
        color: '#333',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    searchButton: {
        marginLeft: 8,
        backgroundColor: '#007AFF',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    loadingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
    },
    loadingText: {
        marginLeft: 8,
        color: '#666',
    },
    resultsContainer: {
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    resultsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    resultItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    resultName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
    },
    resultAddress: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
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
