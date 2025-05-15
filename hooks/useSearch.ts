// hooks/common/useSearch.ts
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setQuery, setResults } from '@/redux/reducers/searchReducer';
import { useNavigation } from '@react-navigation/native';
import axios from "@/services/api/instance";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '@/redux/store';

export const useSearch = () => {
    const { AppUrl } = store.getState().url;
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { query, results } = useAppSelector(state => state.search);

    const handleSearch = async () => {
        if (!query.trim()) return;
        
        try {
            // AsyncStorage에서 토큰 가져오기
            const token = await AsyncStorage.getItem("token");
            
            const response = await axios.get(`${AppUrl}/api/common/search?keyword=${query}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            dispatch(setResults(response.data as any[]));
            return true; // 검색이 성공했음을 나타냄
        } catch (error) {
            console.error("검색 실패:", error);
            // @ts-ignore - 네비게이션 타입 이슈 무시
            navigation.navigate('Login');
            return false; // 검색이 실패했음을 나타냄
        }
    };

    return {
        query,
        setQuery: (query: string) => dispatch(setQuery(query)),
        results,
        handleSearch
    };
};