import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useRouter } from 'expo-router';

const SearchBar = () => {
    const router = useRouter();
    
    const handleSearch = async () => {
        console.log('검색 버튼 클릭');
        router.push('/(router)/searchResult');
    };
    
    const handleAlert = async () => {
        console.log('알림 버튼 클릭');
        router.push('/(router)/alert');
    };
    
    return (
        <View style={styles.searchContainer}>
            <View style={styles.leftContainer}>
                <Image
                    source={require('@/assets/images/OneFlowLogo.webp')}
                    style={styles.buttonImage}
                    resizeMode="contain"
                />
            </View>
            
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.searchButton} onPress={() => { handleSearch() }}>
                    <ThemedText style={styles.searchButtonText}>🔍</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.alertButton} onPress={() => { handleAlert() }}>
                    <ThemedText style={styles.alertButtonText}>🔔</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SearchBar;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        width: '100%',
        height: 40,
    },
    
    leftContainer: {
        justifyContent: 'center',
    },
    
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    buttonImage: {
        width: 30,
        height: 30,
    },
    
    searchButton: {
        backgroundColor: '#FFF',
        height: 44,
        width: 44, // 너비를 높이와 동일하게 설정하여 원형으로 만듬
        borderRadius: 22, // 너비의 절반으로 설정
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
        fontSize: 18, // 이모티콘 크기를 약간 키움
    },
    
    alertButton: {
        backgroundColor: '#fff',
        height: 44,
        width: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        marginLeft: 10,
    },
    
    alertButtonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 18, // 이모티콘 크기를 약간 키움
    },
});