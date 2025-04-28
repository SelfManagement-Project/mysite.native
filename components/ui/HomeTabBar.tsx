import { View, Pressable, Text, Animated, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

interface Props {
    menus: string[];
    onSelectHandler: (index: number) => void;
    selectedIndex: number;
    type?: string;
}

const HomeTabBar = ({ selectedIndex, onSelectHandler, menus }: Props) => {
    
    // 각 탭의 고정 너비를 늘림
    const tabWidth = 120; 
    const animatedValue = React.useRef(
        new Animated.Value(selectedIndex * tabWidth)
    ).current;
    
    const scrollViewRef = React.useRef<ScrollView>(null);

    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: selectedIndex * tabWidth,
            duration: 250,
            useNativeDriver: true,
        }).start();
        
        // 선택된 탭으로 스크롤
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: Math.max(0, selectedIndex * tabWidth - 100),
                animated: true
            });
        }
    }, [selectedIndex]);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    // 전체 콘텐츠 너비를 강제로 화면보다 크게 만듦
                    { width: tabWidth * menus.length }
                ]}
            >
                <Animated.View
                    style={[
                        styles.indicator,
                        {
                            width: tabWidth,
                            transform: [{ translateX: animatedValue }],
                        }
                    ]}
                />
                {menus.map((v, i) => (
                    <Pressable
                        style={[styles.tab, { width: tabWidth }]}
                        key={v}
                        onPress={() => {
                            onSelectHandler(i);
                        }}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedIndex === i ? styles.activeTabText : styles.inactiveTabText
                            ]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {v}
                        </Text>
                        {selectedIndex === i && <View style={styles.activeDot} />}
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    scrollContent: {
        flexDirection: 'row',
    },
    indicator: {
        position: 'absolute',
        left: 0,
        borderBottomWidth: 3,
        borderBottomColor: '#3B82F6',
        bottom: 0,
    },
    tab: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    activeTabText: {
        color: '#3B82F6',
    },
    inactiveTabText: {
        color: '#6B7280',
    },
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#3B82F6',
        marginTop: 4,
    }
});

export default HomeTabBar;