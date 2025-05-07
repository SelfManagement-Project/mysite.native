// src/screens/MyPage/FinanceScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CategoryChart from '@/components/Home/homeTab/Finance/CategoryChart';
import ProgressChart from '@/components/Home/homeTab/Finance/ProgressChart';
import IncomeExpenseChart from '@/components/Home/homeTab/Finance/IncomeExpenseChart';
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles, darkStyles } from '@/screens/Home/homeTab/Finance/FinanceScreen.styles';

const FinanceScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkStyles : styles;

  // 임시 데이터
  const transactions = [
    { date: '2025-04-01', income: true, category: '급여', amount: 3000000, description: '4월 급여' },
    { date: '2025-04-05', income: false, category: '식비', amount: 150000, description: '식료품 구매' },
    { date: '2025-04-10', income: false, category: '교통비', amount: 50000, description: '교통카드 충전' },
  ];

  const categoryBudgets = [
    { category_name: '식비', amount: 400000, percentage: 40 },
    { category_name: '교통비', amount: 200000, percentage: 20 },
    { category_name: '주거/통신', amount: 400000, percentage: 40 },
  ];

  const budgetStatus = {
    total_income: 3000000,
    total_expense: 600000,
    remaining: 2400000,
    total_budget: 1500000,
    usage_percentage: 40
  };

  const savingsStatus = {
    target_amount: 5000000,
    current_amount: 2000000,
    achievement_rate: 40
  };

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <ScrollView style={theme.container}>
      <View style={theme.header}>
        <Text style={theme.title}>재무 관리</Text>
        <View style={theme.headerButtons}>
          <TouchableOpacity style={theme.button} onPress={() => openModal('date')}>
            <Text style={theme.buttonText}>기간 선택</Text>
          </TouchableOpacity>
          <TouchableOpacity style={theme.button} onPress={() => openModal('settings')}>
            <Text style={theme.buttonText}>설정</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={theme.overviewSection}>
        <View style={theme.box}>
          <Text style={theme.boxTitle}>수입/지출 현황</Text>
          <View style={theme.chartArea}>
            <IncomeExpenseChart transactions={transactions} />
          </View>
          <View style={theme.stats}>
            <Text style={theme.statItem}>수입: {budgetStatus?.total_income?.toLocaleString()}원</Text>
            <Text style={theme.statItem}>지출: {budgetStatus?.total_expense?.toLocaleString()}원</Text>
            <Text style={theme.statItem}>잔액: {budgetStatus?.remaining?.toLocaleString()}원</Text>
          </View>
        </View>

        <View style={theme.box}>
          <Text style={theme.boxTitle}>카테고리별 지출 분석</Text>
          <View style={theme.chartArea}>
            <CategoryChart categoryBudgets={categoryBudgets} />
          </View>
          <View style={theme.stats}>
            {categoryBudgets.map((budget, index) => (
              <Text key={index} style={theme.statItem}>
                {budget.category_name}: {budget.amount?.toLocaleString()}원 ({budget.percentage}%)
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={theme.predictionSection}>
        <View style={theme.box}>
          <Text style={theme.boxTitle}>예산 현황</Text>
          <Text style={theme.totalBudget}>총 예산: {budgetStatus?.total_budget?.toLocaleString()}원</Text>
          <View style={theme.statRow}>
            <View style={theme.progressContainer}>
              <ProgressChart
                percentage={budgetStatus?.usage_percentage}
                label="예산 사용률"
                color="#4CAF50"
              />
            </View>
          </View>
          <Text style={theme.percentageText}>{budgetStatus?.usage_percentage}%</Text>
          <Text style={theme.statRow}>남은 예산: {budgetStatus?.remaining?.toLocaleString()}원</Text>
        </View>

        <View style={theme.box}>
          <Text style={theme.boxTitle}>저축 현황</Text>
          <Text style={theme.totalBudget}>목표: {savingsStatus?.target_amount?.toLocaleString()}원</Text>
          <View style={theme.statRow}>
            <View style={theme.progressContainer}>
              <ProgressChart
                percentage={savingsStatus?.achievement_rate}
                label="저축 달성률"
                color="#2196F3"
              />
            </View>
          </View>
          <Text style={theme.percentageText}>{savingsStatus?.achievement_rate}%</Text>
          <Text style={theme.statRow}>
            현재: {savingsStatus?.current_amount?.toLocaleString()}원
            ({((savingsStatus?.current_amount ?? 0) / (savingsStatus?.target_amount ?? 1) * 100).toFixed(1)}%)
          </Text>
        </View>
      </View>

      <View style={theme.transactionsSection}>
        <View style={theme.headerRow}>
          <Text style={theme.sectionTitle}>최근 거래 내역</Text>
          <TouchableOpacity onPress={() => openModal('transactions')}>
            <Text style={theme.viewMoreText}>거래 내역 더보기</Text>
          </TouchableOpacity>
        </View>

        <View style={theme.transactionList}>
          <View style={theme.transactionHeader}>
            <Text style={theme.transactionHeaderText}>날짜</Text>
            <Text style={theme.transactionHeaderText}>구분</Text>
            <Text style={theme.transactionHeaderText}>카테고리</Text>
            <Text style={theme.transactionHeaderText}>금액</Text>
            <Text style={theme.transactionHeaderText}>내용</Text>
          </View>

          {transactions.map((transaction, index) => (
            <TouchableOpacity
              key={index}
              style={theme.transactionItem}
              onPress={() => openModal('transactionDetail')}
            >
              <Text style={theme.transactionText}>{new Date(transaction.date).toLocaleDateString()}</Text>
              <Text style={theme.transactionText}>{transaction.income ? '수입' : '지출'}</Text>
              <Text style={theme.transactionText}>{transaction.category}</Text>
              <Text style={[
                styles.transactionText,
                transaction.income ? styles.incomeText : styles.expenseText
              ]}>
                {transaction.income ? '+' : '-'}
                {transaction.amount?.toLocaleString()}원
              </Text>
              <Text style={theme.transactionText}>{transaction.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={theme.actionButtons}>
        <TouchableOpacity
          style={theme.actionButton}
          onPress={() => openModal('addTransaction')}
        >
          <Text style={theme.actionButtonText}>거래 추가</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.actionButton}
          onPress={() => openModal('budgetSetting')}
        >
          <Text style={theme.actionButtonText}>예산 설정</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.actionButton}
          onPress={() => openModal('savingsGoal')}
        >
          <Text style={theme.actionButtonText}>저축 목표 설정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={theme.actionButton}>
          <Text style={theme.actionButtonText}>리포트 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={theme.actionButton}>
          <Text style={theme.actionButtonText}>지출분석</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.actionButton}
          onPress={() => openModal('categoryManagement')}
        >
          <Text style={theme.actionButtonText}>지출카테고리관리</Text>
        </TouchableOpacity>
      </View>

      {/* 여기에 모달 컴포넌트들을 추가할 수 있습니다 */}
    </ScrollView>
  );
};



export default FinanceScreen;