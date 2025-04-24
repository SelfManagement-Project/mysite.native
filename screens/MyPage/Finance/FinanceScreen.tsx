// src/screens/MyPage/FinanceScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CategoryChart from '@/components/MyPage/Finance/CategoryChart';
import ProgressChart from '@/components/MyPage/Finance/ProgressChart';
import IncomeExpenseChart from '@/components/MyPage/Finance/IncomeExpenseChart';

const FinanceScreen = () => {
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

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>재무 관리</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.button} onPress={() => openModal('date')}>
            <Text style={styles.buttonText}>기간 선택</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => openModal('settings')}>
            <Text style={styles.buttonText}>설정</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.overviewSection}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>수입/지출 현황</Text>
          <View style={styles.chartArea}>
            <IncomeExpenseChart transactions={transactions} />
          </View>
          <View style={styles.stats}>
            <Text style={styles.statItem}>수입: {budgetStatus?.total_income?.toLocaleString()}원</Text>
            <Text style={styles.statItem}>지출: {budgetStatus?.total_expense?.toLocaleString()}원</Text>
            <Text style={styles.statItem}>잔액: {budgetStatus?.remaining?.toLocaleString()}원</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>카테고리별 지출 분석</Text>
          <View style={styles.chartArea}>
            <CategoryChart categoryBudgets={categoryBudgets} />
          </View>
          <View style={styles.stats}>
            {categoryBudgets.map((budget, index) => (
              <Text key={index} style={styles.statItem}>
                {budget.category_name}: {budget.amount?.toLocaleString()}원 ({budget.percentage}%)
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.predictionSection}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>예산 현황</Text>
          <Text style={styles.totalBudget}>총 예산: {budgetStatus?.total_budget?.toLocaleString()}원</Text>
          <View style={styles.statRow}>
            <View style={styles.progressContainer}>
              <ProgressChart
                percentage={budgetStatus?.usage_percentage}
                label="예산 사용률"
                color="#4CAF50"
              />
            </View>
          </View>
          <Text style={styles.percentageText}>{budgetStatus?.usage_percentage}%</Text>
          <Text style={styles.statRow}>남은 예산: {budgetStatus?.remaining?.toLocaleString()}원</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>저축 현황</Text>
          <Text style={styles.totalBudget}>목표: {savingsStatus?.target_amount?.toLocaleString()}원</Text>
          <View style={styles.statRow}>
            <View style={styles.progressContainer}>
              <ProgressChart
                percentage={savingsStatus?.achievement_rate}
                label="저축 달성률"
                color="#2196F3"
              />
            </View>
          </View>
          <Text style={styles.percentageText}>{savingsStatus?.achievement_rate}%</Text>
          <Text style={styles.statRow}>
            현재: {savingsStatus?.current_amount?.toLocaleString()}원
            ({((savingsStatus?.current_amount ?? 0) / (savingsStatus?.target_amount ?? 1) * 100).toFixed(1)}%)
          </Text>
        </View>
      </View>

      <View style={styles.transactionsSection}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>최근 거래 내역</Text>
          <TouchableOpacity onPress={() => openModal('transactions')}>
            <Text style={styles.viewMoreText}>거래 내역 더보기</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.transactionList}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionHeaderText}>날짜</Text>
            <Text style={styles.transactionHeaderText}>구분</Text>
            <Text style={styles.transactionHeaderText}>카테고리</Text>
            <Text style={styles.transactionHeaderText}>금액</Text>
            <Text style={styles.transactionHeaderText}>내용</Text>
          </View>
          
          {transactions.map((transaction, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.transactionItem}
              onPress={() => openModal('transactionDetail')}
            >
              <Text style={styles.transactionText}>{new Date(transaction.date).toLocaleDateString()}</Text>
              <Text style={styles.transactionText}>{transaction.income ? '수입' : '지출'}</Text>
              <Text style={styles.transactionText}>{transaction.category}</Text>
              <Text style={[
                styles.transactionText, 
                transaction.income ? styles.incomeText : styles.expenseText
              ]}>
                {transaction.income ? '+' : '-'}
                {transaction.amount?.toLocaleString()}원
              </Text>
              <Text style={styles.transactionText}>{transaction.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => openModal('addTransaction')}
        >
          <Text style={styles.actionButtonText}>거래 추가</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => openModal('budgetSetting')}
        >
          <Text style={styles.actionButtonText}>예산 설정</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => openModal('savingsGoal')}
        >
          <Text style={styles.actionButtonText}>저축 목표 설정</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>리포트 보기</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>지출분석</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => openModal('categoryManagement')}
        >
          <Text style={styles.actionButtonText}>지출카테고리관리</Text>
        </TouchableOpacity>
      </View>

      {/* 여기에 모달 컴포넌트들을 추가할 수 있습니다 */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#5c6bc0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  overviewSection: {
    padding: 15,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chartArea: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stats: {
    marginTop: 10,
  },
  statItem: {
    marginBottom: 5,
  },
  predictionSection: {
    padding: 15,
  },
  totalBudget: {
    marginBottom: 10,
  },
  statRow: {
    marginVertical: 5,
  },
  progressContainer: {
    height: 50,
    marginVertical: 10,
  },
  percentageText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionsSection: {
    padding: 15,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewMoreText: {
    color: '#5c6bc0',
  },
  transactionList: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  transactionHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionText: {
    flex: 1,
    fontSize: 12,
  },
  incomeText: {
    color: '#4CAF50',
  },
  expenseText: {
    color: '#F44336',
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#5c6bc0',
    width: '48%',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FinanceScreen;