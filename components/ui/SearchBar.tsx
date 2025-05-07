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
            <Image
                source={require('@/assets/images/OneFlowLogo.webp')} // 이미지 경로를 실제 이미지 파일 경로로 변경해주세요
                style={styles.buttonImage}
                resizeMode="contain"
            />
            <View style={styles.searchInputContainer}>

                <TextInput
                    style={styles.searchInput}
                    placeholder="검색어를 입력하세요"
                    placeholderTextColor="#9CA3AF"
                />
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={() => { handleSearch() }}>
                <ThemedText style={styles.searchButtonText}>검색</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.alertButton} onPress={() => { handleAlert() }}>
                <ThemedText style={styles.alertButtonText}>🔔</ThemedText>
            </TouchableOpacity>
        </View>
    );
}

export default SearchBar;


const styles = StyleSheet.create({

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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


  alertButton: {
    backgroundColor: '#fff',
    height: 44,
    paddingHorizontal: 15,
    borderRadius: 50,
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
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },





  buttonImage: {
    width: 24, // 원하는 크기로 조정
    height: 24, // 원하는 크기로 조정
  },
});