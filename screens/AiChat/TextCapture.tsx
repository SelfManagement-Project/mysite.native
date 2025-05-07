import React from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { PhotoFile } from "react-native-vision-camera";
import CameraComponent from "@/components/AiChat/CameraComponent"; // 경로는 실제 위치에 맞게 조정
import { router } from "expo-router";

const TextCapture: React.FC<{ onGoBack?: () => void }> = ({ onGoBack }) => {
    const navigation = useNavigation<any>(); // 타입 지정

    // 화면에 포커스될 때 네비게이션 바와 상태바 숨기기
    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setHidden(true);
            
            navigation.setOptions({
                tabBarStyle: { display: 'none' },
            });
            
            return () => {
                StatusBar.setHidden(false);
                navigation.setOptions({
                    tabBarStyle: { display: 'flex' },
                });
            };
        }, [navigation])
    );

    // 캡처된 사진 처리
    const handleCapture = (photo: PhotoFile) => {
        // 여러 데이터를 함께 전달
        router.push({
            pathname: '/(router)/textResult',
            params: { 
                photoPath: photo.path,
                captureTime: new Date().toISOString(),
                cameraPosition: "front", // 또는 현재 카메라 위치
                imageSize: `${photo.width}x${photo.height}`,
                imageFormat: photo.format, // 이미지 포맷 정보
                // 기타 필요한 메타데이터
            }
        });
    };

    // 뒤로 가기 처리
    const handleCancel = () => {
        if (onGoBack) {
            onGoBack();
        } else {
            try {
                navigation.goBack();
            } catch (error) {
                console.error("네비게이션 오류:", error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <CameraComponent 
                onCapture={handleCapture}
                onCancel={handleCancel}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
});

export default TextCapture;