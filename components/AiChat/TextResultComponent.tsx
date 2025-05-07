import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

// 텍스트 인식 결과를 보여주는 화면
const TextResultComponent: React.FC = () => {
    const [recognizedText, setRecognizedText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // 라우트 파라미터에서 사진 경로 가져오기
    const params = useLocalSearchParams();
    const photoPath = Array.isArray(params.photoPath) ? params.photoPath[0] : params.photoPath as string;
    const captureTime = Array.isArray(params.captureTime) ? params.captureTime[0] : params.captureTime as string;

    const router = useRouter();

    useEffect(() => {
        if (photoPath) {
            // 여기서 실제 OCR 처리 또는 텍스트 인식 서비스 호출
            performTextRecognition(photoPath);
        }
    }, [photoPath]);

    const performTextRecognition = async (path: string) => {
        setIsLoading(true);
        try {
            // OCR 라이브러리를 사용하여 이미지에서 텍스트 인식
            // 예: const result = await someOcrLibrary.recognizeText(path);
            // 임시 데이터 (실제로는 OCR 결과로 대체)
            const result = "인식된 텍스트가 여기에 표시됩니다.\n이것은 예시 텍스트입니다.";

            setRecognizedText(result);
        } catch (error) {
            console.error("텍스트 인식 오류:", error);
            setRecognizedText("텍스트 인식 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.textContainer}>
                {isLoading ? (
                    <Text style={styles.loadingText}>텍스트 인식 중...</Text>
                ) : (
                    <Text style={styles.recognizedText}>{recognizedText}</Text>
                )}
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.back()}
                >
                    <Text style={styles.buttonText}>뒤로 가기</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.copyButton]}
                    onPress={() => {
                        // 텍스트 복사 기능
                        // Clipboard.setString(recognizedText);
                        // Alert.alert("알림", "텍스트가 클립보드에 복사되었습니다.");
                    }}
                >
                    <Text style={styles.buttonText}>텍스트 복사</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    textContainer: {
        flex: 1,
        marginBottom: 16,
    },
    loadingText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginTop: 20,
    },
    recognizedText: {
        fontSize: 16,
        color: "#333",
        lineHeight: 24,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: "#2196F3",
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
    },
    copyButton: {
        backgroundColor: "#4CAF50",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default TextResultComponent;