// src/components/Finance/IncomeExpenseChart.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface Transaction {
  date: string;
  income: boolean;
  category: string;
  amount: number;
  description: string;
}

interface IncomeExpenseChartProps {
  transactions: Transaction[];
}

const IncomeExpenseChart = ({ transactions }: IncomeExpenseChartProps) => {
  const processData = () => {
    const monthlyData = Array(12).fill(0).map(() => ({ income: 0, expense: 0 }));
    
    if (Array.isArray(transactions)) {
      transactions.forEach(transaction => {
        const month = new Date(transaction.date).getMonth();
        if (transaction.income) {
          monthlyData[month].income += transaction.amount;
        } else {
          monthlyData[month].expense += transaction.amount;
        }
      });
    }
    
    return {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      datasets: [
        {
          data: monthlyData.map(d => d.income),
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          strokeWidth: 2
        },
        {
          data: monthlyData.map(d => d.expense),
          color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ['수입', '지출']
    };
  };

  return (
    <View style={styles.container}>
      <LineChart
        {...({} as any)}
        data={processData()}
        width={Dimensions.get('window').width - 60}
        height={180}
        chartConfig={{
          backgroundColor: '#f4f6fc',
          backgroundGradientFrom: '#f4f6fc',
          backgroundGradientTo: '#f4f6fc',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
          }
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  }
});

export default IncomeExpenseChart;