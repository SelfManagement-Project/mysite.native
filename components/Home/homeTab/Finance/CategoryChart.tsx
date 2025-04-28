// src/components/Finance/CategoryChart.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

interface CategoryBudget {
  category_name: string;
  amount: number;
  percentage?: number;
}

interface CategoryChartProps {
  categoryBudgets: CategoryBudget[];
}

const CategoryChart = ({ categoryBudgets }: CategoryChartProps) => {
  const chartData = Array.isArray(categoryBudgets) 
    ? categoryBudgets.map((budget, index) => {
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
        return {
          name: budget.category_name,
          population: budget.amount,
          color: colors[index % colors.length],
          legendFontColor: '#7F7F7F',
          legendFontSize: 12
        };
      })
    : [];

  return (
    <View style={styles.container}>
      {chartData.length > 0 ? (
        <PieChart
          {...({} as any)}
          data={chartData}
          width={Dimensions.get('window').width - 60}
          height={180}
          chartConfig={{
            backgroundColor: '#f4f6fc',
            backgroundGradientFrom: '#f4f6fc',
            backgroundGradientTo: '#f4f6fc',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <Text style={styles.noDataText}>데이터가 없습니다</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 40,
  }
});

export default CategoryChart;