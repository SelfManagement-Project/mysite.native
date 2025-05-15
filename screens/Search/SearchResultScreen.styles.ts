import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8FAFC',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1E293B',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: 'rgba(240, 240, 240, 0.7)',
    },
    card: {
        marginBottom: 16,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
        color: '#334155',
    },
    content: {
        fontSize: 15,
        color: '#64748B',
        marginBottom: 12,
        lineHeight: 22,
    },
    date: {
        fontSize: 13,
        color: '#94A3B8',
        textAlign: 'right',
        fontStyle: 'italic',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 8,
    },
    searchInputContainer: {
        flex: 1,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        marginRight: 12,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#334155',
    },
    searchButton: {
        backgroundColor: '#3B82F6',
        height: 50,
        width: 50,
        borderRadius: 25,
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
        fontSize: 18,
    },
    emptyStateContainer: {
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 20,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 16,
    },
});

export const darkStyles = StyleSheet.create({
    ...styles,
    container: {
        ...styles.container,
        backgroundColor: '#0F172A',
    },
    header: {
        ...styles.header,
        backgroundColor: 'rgba(30, 41, 59, 0.8)', 
        color: '#E2E8F0',
    },
    card: {
        ...styles.card,
        backgroundColor: '#1E293B',
        borderColor: '#334155',
    },
    title: {
        ...styles.title,
        color: '#E2E8F0',
    },
    content: {
        ...styles.content,
        color: '#94A3B8',
    },
    date: {
        ...styles.date,
        color: '#64748B',
    },
    searchInputContainer: {
        ...styles.searchInputContainer,
        backgroundColor: '#334155',
        borderColor: '#475569',
    },
    searchInput: {
        ...styles.searchInput,
        color: '#F8FAFC',
    },
    searchButton: {
        ...styles.searchButton,
        backgroundColor: '#2563EB',
    },
    emptyStateText: {
        ...styles.emptyStateText,
        color: '#94A3B8',
    },
});