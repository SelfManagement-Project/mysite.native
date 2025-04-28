import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

interface HabitData {
    habitId: number;
    name: string;
    completed: number;
    remaining: number;
}

interface HabitChartProps {
    data: HabitData[];
}

const HabitHubBar = ({ data }: HabitChartProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        // 차트 렌더링을 위한 지연
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        // Dimensions 변경 감지
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setScreenWidth(window.width);
        });

        return () => {
            clearTimeout(timer);
            subscription?.remove();
        };
    }, []);

    // 데이터가 없는 경우 처리
    if (!data || data.length === 0) {
        return (
            <View style={styles.container}>
                <Text>데이터가 없습니다.</Text>
            </View>
        );
    }

    // 차트 데이터 변환
    const chartData = {
        labels: data.map(habit => habit.name),
        datasets: [
            {
                data: data.map(habit => habit.completed),
            }
        ],
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#3498db" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <BarChart
                data={chartData}
                width={screenWidth - 50}
                height={220}
                yAxisLabel=""
                yAxisSuffix="%"
                chartConfig={{
                    backgroundColor: '#f4f6fc',
                    backgroundGradientFrom: '#f4f6fc',
                    backgroundGradientTo: '#f4f6fc',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    barPercentage: 0.7,
                }}
                style={styles.chart}
                verticalLabelRotation={0}
                fromZero={true}
                showValuesOnTopOfBars={true}
            />
            <View style={styles.legend}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#3498db' }]} />
                    <Text>진행</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#f39c12' }]} />
                    <Text>미진행</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'center',
        minHeight: 250, // 최소 높이 설정
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    legendColor: {
        width: 12,
        height: 12,
        marginRight: 5,
        borderRadius: 6,
    }
});

export default HabitHubBar;