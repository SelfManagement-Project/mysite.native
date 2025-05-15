import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSearch } from "@/hooks/useSearch";
import { useColorScheme } from '@/hooks/useColorScheme';
import { styles, darkStyles } from '@/components/Search/SearchComponent.style';

// 테이블 결과 인터페이스
interface TableResult {
    table: string;
    data: Record<string, any>[];
}

// 상태 설정 인터페이스
interface StatusConfig {
    field: string;
    trueText?: string;
    falseText?: string;
    valueMap?: Record<string, { text: string; class: string }>;
}

const SearchComponent = () => {
    const { results } = useSearch();
    const colorScheme = useColorScheme();
    const baseTheme = colorScheme === 'light' ? darkStyles : styles;

    // 사용자 데이터 렌더링
    const renderUserData = (data: Record<string, any>[]) => {
        return (
            <View style={styles.dataCards}>
                {data.map((item, idx) => (
                    <View key={idx} style={styles.dataCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{item.user_name?.charAt(0) || "U"}</Text>
                            </View>
                            <View style={styles.titleArea}>
                                <Text style={styles.cardTitle}>{item.user_name || "사용자"}</Text>
                                {item.hasOwnProperty('is_active') && (
                                    <Text style={[styles.statusBadge, item.is_active ? styles.active : styles.inactive]}>
                                        {item.is_active ? "활성" : "비활성"}
                                    </Text>
                                )}
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            {Object.entries(item).map(([key, value]) => (
                                key !== 'user_name' && key !== 'is_active' && (
                                    <View key={key} style={styles.detailItem}>
                                        <Text style={styles.label}>{formatLabel(key)}:</Text>
                                        <Text style={styles.value}>{formatValue(key, value)}</Text>
                                    </View>
                                )
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    // 스케줄 특수 렌더링
    const renderScheduleData = (data: Record<string, any>[]) => {
        return (
            <View style={styles.dataCards}>
                {data.map((item, idx) => (
                    <View key={idx} style={[styles.dataCard, styles.scheduleCard]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.titleArea}>
                                <Text style={styles.cardTitle}>{item.title || `일정 #${idx + 1}`}</Text>
                                {item.hasOwnProperty('is_completed') && (
                                    <Text style={[styles.statusBadge, item.is_completed ? styles.completed : styles.pending]}>
                                        {item.is_completed ? "완료" : "미완료"}
                                    </Text>
                                )}
                                <Text style={styles.budgetPeriod}>{item.type || "일반"}</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View style={styles.scheduleSummary}>
                                <View style={styles.scheduleDate}>
                                    <Text style={styles.dateLabel}>날짜</Text>
                                    <Text style={styles.dateValue}>{item.date ? new Date(item.date).toLocaleDateString() : "-"}</Text>
                                </View>
                                <View style={styles.scheduleTime}>
                                    <Text style={styles.timeRange}>
                                        {item.start_time ? new Date(`2000-01-01T${item.start_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-"}
                                        {" ~ "}
                                        {item.end_time ? new Date(`2000-01-01T${item.end_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-"}
                                    </Text>
                                </View>
                            </View>

                            {Object.entries(item).map(([key, value]) => (
                                key !== 'title' && key !== 'date' && key !== 'start_time' &&
                                key !== 'end_time' && key !== 'is_completed' && key !== 'type' && (
                                    <View key={key} style={styles.detailItem}>
                                        <Text style={styles.label}>{formatLabel(key)}:</Text>
                                        <Text style={styles.value}>{formatValue(key, value)}</Text>
                                    </View>
                                )
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    // 일반 데이터 렌더링 (다른 테이블용)
    const renderGenericData = (data: Record<string, any>[], tableName: string) => {
        return (
            <View style={styles.dataCards}>
                {data.map((item, idx) => (
                    <View key={idx} style={styles.dataCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.titleArea}>
                                <Text style={styles.cardTitle}>{getCardTitle(item, tableName)} #{idx + 1}</Text>
                                {getStatusBadge(item, tableName)}
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            {Object.entries(item).map(([key, value]) => (
                                <View key={key} style={styles.detailItem}>
                                    <Text style={styles.label}>{formatLabel(key)}:</Text>
                                    <Text style={styles.value}>{formatValue(key, value)}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    // 라벨 형식화
    const formatLabel = (key: string): string => {
        return key
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    };

    // 값 형식화
    const formatValue = (key: string, value: any): string | number | ReactNode => {
        if (value === null || value === undefined) return "-";

        // 날짜 필드 처리
        if (key.includes('date') || key.includes('at') || key.includes('time')) {
            try {
                return new Date(value).toLocaleString();
            } catch (e) {
                return value;
            }
        }

        // 불리언 값 처리
        if (typeof value === 'boolean') {
            return value ? "예" : "아니오";
        }

        // 금액 필드 처리
        if (
            key.includes('amount') ||
            key.includes('income') ||
            key.includes('expenditure') ||
            key.includes('savings') ||
            key.includes('deposit')
        ) {
            return typeof value === 'number' ?
                new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value) :
                value;
        }

        // 객체나 배열은 JSON으로 변환
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }

        return value;
    };

    // 카드 제목 가져오기
    const getCardTitle = (item: Record<string, any>, tableName: string): string => {
        // 테이블별 주요 필드를 기반으로 제목 설정
        const titleFields: Record<string, string> = {
            user: 'user_name',
            schedule: 'title',
            alert: 'alert_type',
            task: 'content',
            exercise: 'exercise_type',
            diet: 'meal_type',
            sleep: 'sleep_id',
            health_metrics: 'metric_id',
            facility: 'name',
            budget: 'budget_id',
            category_budget: 'category_name',
            transaction: 'description',
            savings_goal: 'goal_id',
            chat: 'session_id',
            chat_history: 'content',
            habit: 'name',
            habit_log: 'log_id',
            finance_category: 'name',
            budget_alert: 'alert_id'
        };

        const field = titleFields[tableName] || Object.keys(item)[0];
        return String(item[field] || tableName);
    };

    // 상태 배지 가져오기
    const getStatusBadge = (item: Record<string, any>, tableName: string): ReactNode => {
        // 테이블별 상태 필드 정의
        const statusConfig: Record<string, StatusConfig> = {
            user: {
                field: 'is_active',
                trueText: '활성',
                falseText: '비활성'
            },
            schedule: {
                field: 'is_completed',
                trueText: '완료',
                falseText: '미완료'
            },
            task: {
                field: 'check_status',
                valueMap: {
                    'pending': { text: '대기중', class: 'pending' },
                    'in_progress': { text: '진행중', class: 'in-progress' },
                    'completed': { text: '완료', class: 'completed' },
                    'cancelled': { text: '취소됨', class: 'cancelled' },
                }
            },
            facility: {
                field: 'is_available',
                trueText: '이용가능',
                falseText: '이용불가'
            },
            chat: {
                field: 'is_completed',
                trueText: '완료',
                falseText: '진행중'
            },
            habit_log: {
                field: 'status',
                valueMap: {
                    'completed': { text: '완료', class: 'completed' },
                    'missed': { text: '놓침', class: 'missed' },
                    'in_progress': { text: '진행중', class: 'in-progress' },
                }
            },
            budget_alert: {
                field: 'is_notified',
                trueText: '알림전송',
                falseText: '미전송'
            },
            transaction: {
                field: 'is_income',
                trueText: '수입',
                falseText: '지출'
            }
        };

        const config = statusConfig[tableName];
        if (!config || !item[config.field]) return null;

        // 불리언 타입 상태
        if (typeof item[config.field] === 'boolean') {
            const styleClass = item[config.field] ? styles.active : styles.inactive;
            return (
                <Text style={[styles.statusBadge, styleClass]}>
                    {item[config.field] ? config.trueText : config.falseText}
                </Text>
            );
        }

        // 값 매핑이 있는 상태
        if (config.valueMap && config.valueMap[item[config.field]]) {
            const status = config.valueMap[item[config.field]];
            let styleClass;
            
            switch(status.class) {
                case 'completed': styleClass = styles.completed; break;
                case 'pending': styleClass = styles.pending; break;
                case 'in-progress': styleClass = styles.inProgress; break;
                case 'missed': styleClass = styles.missed; break;
                case 'cancelled': styleClass = styles.cancelled; break;
                default: styleClass = styles.default;
            }
            
            return (
                <Text style={[styles.statusBadge, styleClass]}>
                    {status.text}
                </Text>
            );
        }

        return null;
    };

    // 테이블별 특수 렌더링
    const renderTableData = (table: TableResult) => {
        const { table: tableName, data } = table;

        if (data.length === 0) {
            return <Text style={styles.noData}>데이터가 없습니다.</Text>;
        }

        // 특별한 렌더링이 필요한 테이블들
        switch (tableName) {
            case "user":
                return renderUserData(data);
            case "schedule":
                return renderScheduleData(data);
            case "health_metrics":
                return renderHealthMetricsData(data);
            case "budget":
                return renderBudgetData(data);
            case "diet":
                return renderDietData(data);
            case "sleep":
                return renderSleepData(data);
            case "exercise":
                return renderExerciseData(data);
            default:
                return renderGenericData(data, tableName);
        }
    };

    // 건강 지표 특수 렌더링
    const renderHealthMetricsData = (data: Record<string, any>[]) => {
        return (
            <View style={styles.dataCards}>
                {data.map((item, idx) => (
                    <View key={idx} style={[styles.dataCard, styles.healthMetricsCard]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.titleArea}>
                                <Text style={styles.cardTitle}>건강 지표 #{idx + 1}</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View style={styles.metricSummary}>
                                <View style={styles.metricValue}>
                                    <Text style={styles.metricLabel}>체중</Text>
                                    <Text style={styles.metricNumber}>{item.weight || "-"} kg</Text>
                                </View>
                                <View style={styles.metricValue}>
                                    <Text style={styles.metricLabel}>목표 체중</Text>
                                    <Text style={styles.metricNumber}>{item.target_weight || "-"} kg</Text>
                                </View>
                                <View style={styles.metricValue}>
                                    <Text style={styles.metricLabel}>BMI</Text>
                                    <Text style={styles.metricNumber}>{item.bmi || "-"}</Text>
                                </View>
                            </View>
                            {Object.entries(item).map(([key, value]) => (
                                key !== 'weight' && key !== 'target_weight' && key !== 'bmi' && (
                                    <View key={key} style={styles.detailItem}>
                                        <Text style={styles.label}>{formatLabel(key)}:</Text>
                                        <Text style={styles.value}>{formatValue(key, value)}</Text>
                                    </View>
                                )
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    // 예산 특수 렌더링
    const renderBudgetData = (data: Record<string, any>[]) => {
        return (
            <View style={styles.dataCards}>
                {data.map((item, idx) => (
                    <View key={idx} style={[styles.dataCard, styles.budgetCard]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.titleArea}>
                                <Text style={styles.cardTitle}>예산 #{idx + 1}</Text>
                                <Text style={styles.budgetPeriod}>{item.year}년 {item.month}월</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View style={styles.budgetSummary}>
                                <View style={styles.budgetItem}>
                                    <Text style={styles.budgetLabel}>수입</Text>
                                    <Text style={[styles.budgetAmount, styles.income]}>{formatValue('income', item.income)}</Text>
                                </View>
                                <View style={styles.budgetItem}>
                                    <Text style={styles.budgetLabel}>지출</Text>
                                    <Text style={[styles.budgetAmount, styles.expense]}>{formatValue('expenditure', item.expenditure)}</Text>
                                </View>
                                <View style={styles.budgetItem}>
                                    <Text style={styles.budgetLabel}>저축</Text>
                                    <Text style={[styles.budgetAmount, styles.savings]}>{formatValue('savings', item.savings)}</Text>
                                </View>
                            </View>
                            {Object.entries(item).map(([key, value]) => (
                                key !== 'income' && key !== 'expenditure' && key !== 'savings' && key !== 'month' && key !== 'year' && (
                                    <View key={key} style={styles.detailItem}>
                                        <Text style={styles.label}>{formatLabel(key)}:</Text>
                                        <Text style={styles.value}>{formatValue(key, value)}</Text>
                                    </View>
                                )
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    // 식단 특수 렌더링
    const renderDietData = (data: Record<string, any>[]) => {
        return (
            <View style={styles.dataCards}>
                {data.map((item, idx) => (
                    <View key={idx} style={[styles.dataCard, styles.dietCard]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.titleArea}>
                                <Text style={styles.cardTitle}>{item.meal_type || "식사"} #{idx + 1}</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View style={styles.dietSummary}>
                                <View style={styles.dietItem}>
                                    <Text style={styles.dietLabel}>칼로리</Text>
                                    <Text style={styles.dietValue}>{item.calories || 0} kcal</Text>
                                </View>
                                <View style={styles.dietItem}>
                                    <Text style={styles.dietLabel}>단백질</Text>
                                    <Text style={styles.dietValue}>{item.protein || 0} g</Text>
                                </View>
                                <View style={styles.dietItem}>
                                    <Text style={styles.dietLabel}>탄수화물</Text>
                                    <Text style={styles.dietValue}>{item.carbs || 0} g</Text>
                                </View>
                            </View>
                            {Object.entries(item).map(([key, value]) => (
                                key !== 'calories' && key !== 'protein' && key !== 'carbs' && key !== 'meal_type' && (
                                    <View key={key} style={styles.detailItem}>
                                        <Text style={styles.label}>{formatLabel(key)}:</Text>
                                        <Text style={styles.value}>{formatValue(key, value)}</Text>
                                    </View>
                                )
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    // 수면 특수 렌더링
    const renderSleepData = (data: Record<string, any>[]) => {
        return (
            <View style={styles.dataCards}>
                {data.map((item, idx) => {
                    // 수면 시간 계산
                    let sleepDuration = "-";
                    if (item.sleep_start && item.sleep_end) {
                        try {
                            const start = new Date(item.sleep_start);
                            const end = new Date(item.sleep_end);
                            const diffMs = end.getTime() - start.getTime();
                            const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
                            const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                            sleepDuration = `${diffHrs}시간 ${diffMins}분`;
                        } catch (e) {
                            sleepDuration = "-";
                        }
                    }

                    return (
                        <View key={idx} style={[styles.dataCard, styles.sleepCard]}>
                            <View style={styles.cardHeader}>
                                <View style={styles.titleArea}>
                                    <Text style={styles.cardTitle}>수면 기록 #{idx + 1}</Text>
                                </View>
                            </View>
                            <View style={styles.cardBody}>
                                <View style={styles.sleepSummary}>
                                    <View style={styles.sleepItem}>
                                        <Text style={styles.sleepLabel}>수면 시간</Text>
                                        <Text style={styles.sleepValue}>{sleepDuration}</Text>
                                    </View>
                                    <View style={styles.sleepItem}>
                                        <Text style={styles.sleepLabel}>수면 품질</Text>
                                        <Text style={styles.sleepValue}>{item.sleep_quality ? `${item.sleep_quality}/10` : "-"}</Text>
                                    </View>
                                </View>
                                {Object.entries(item).map(([key, value]) => (
                                    key !== 'sleep_quality' && (
                                        <View key={key} style={styles.detailItem}>
                                            <Text style={styles.label}>{formatLabel(key)}:</Text>
                                            <Text style={styles.value}>{formatValue(key, value)}</Text>
                                        </View>
                                    )
                                ))}
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    };

    // 운동 특수 렌더링
    const renderExerciseData = (data: Record<string, any>[]) => {
        return (
            <View style={styles.dataCards}>
                {data.map((item, idx) => (
                    <View key={idx} style={[styles.dataCard, styles.exerciseCard]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.titleArea}>
                                <Text style={styles.cardTitle}>{item.exercise_type || "운동"} #{idx + 1}</Text>
                            </View>
                        </View>
                        <View style={styles.cardBody}>
                            <View style={styles.exerciseSummary}>
                                <View style={styles.exerciseItem}>
                                    <Text style={styles.exerciseLabel}>운동 시간</Text>
                                    <Text style={styles.exerciseValue}>{item.duration ? `${item.duration}분` : "-"}</Text>
                                </View>
                                <View style={styles.exerciseItem}>
                                    <Text style={styles.exerciseLabel}>소모 칼로리</Text>
                                    <Text style={styles.exerciseValue}>{item.calories_burned ? `${item.calories_burned} kcal` : "-"}</Text>
                                </View>
                            </View>
                            {Object.entries(item).map(([key, value]) => (
                                key !== 'duration' && key !== 'calories_burned' && key !== 'exercise_type' && (
                                    <View key={key} style={styles.detailItem}>
                                        <Text style={styles.label}>{formatLabel(key)}:</Text>
                                        <Text style={styles.value}>{formatValue(key, value)}</Text>
                                    </View>
                                )
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <ScrollView style={[styles.searchWrap, { backgroundColor: baseTheme.searchWrap.backgroundColor }]}>
            <View style={styles.searchContainer}>
                <Text style={styles.heading}>🔍 내 데이터 결과</Text>

                <View style={styles.resultsContainer}>
                    {results.length === 0 ? (
                        <Text style={styles.noResults}>검색 결과가 없습니다.</Text>
                    ) : (
                        results.map((table: TableResult, index: number) => (
                            <View key={index} style={styles.resultItem}>
                                <Text style={styles.tableHeading}>{table.table} 테이블</Text>
                                {renderTableData(table)}
                            </View>
                        ))
                    )}
                </View>
            </View>
        </ScrollView>
    );
};



export default SearchComponent;