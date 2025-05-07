import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, StatusBar, Image } from "react-native";
import { Camera, CameraDevice, PhotoFile } from "react-native-vision-camera";

interface CameraComponentProps {
    onCapture?: (photo: PhotoFile) => void;
    onCancel?: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onCapture, onCancel }) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [cameraReady, setCameraReady] = useState<boolean>(false);
    const [device, setDevice] = useState<CameraDevice | null>(null);
    const [cameraPosition, setCameraPosition] = useState<"front" | "back">("front");
    const [capturedPhoto, setCapturedPhoto] = useState<PhotoFile | null>(null);
    const [previewMode, setPreviewMode] = useState<boolean>(false);
    const cameraRef = useRef<Camera | null>(null);

    // 권한 요청 및 디바이스 설정
    useEffect(() => {
        (async () => {
            try {
                const permission = await Camera.requestCameraPermission();
                setHasPermission(permission === "granted");
                await loadDevice(cameraPosition);
            } catch (error) {
                console.error("권한/디바이스 오류:", error);
                Alert.alert("오류", "카메라 초기화 중 문제가 발생했습니다.");
            }
        })();
    }, []);

    // 카메라 전환 시 디바이스 로드
    useEffect(() => {
        if (hasPermission) {
            loadDevice(cameraPosition);
        }
    }, [cameraPosition, hasPermission]);

    const loadDevice = async (position: "front" | "back") => {
        try {
            const devices = await Camera.getAvailableCameraDevices();
            const selected = devices.find(d => d.position === position);
            if (!selected) {
                Alert.alert("카메라 없음", `${position === 'front' ? '전면' : '후면'} 카메라를 찾을 수 없습니다.`);
            }
            setDevice(selected ?? null);
        } catch (error) {
            console.error("카메라 장치 로드 오류:", error);
        }
    };

    const toggleCamera = () => {
        setCameraPosition(prev => (prev === "front" ? "back" : "front"));
    };

    const onCameraReady = () => {
        console.log("📷 카메라 준비 완료");
        setCameraReady(true);
    };

    const onError = (error: Error) => {
        console.error("카메라 오류:", error);
        Alert.alert("카메라 오류", "카메라 작동 중 문제가 발생했습니다.");
    };

    const takePicture = async () => {
        try {
            if (cameraRef.current && cameraReady) {
                const photo = await cameraRef.current.takePhoto({
                    qualityPrioritization: 'quality',
                    flash: 'off'
                });
                console.log("촬영된 사진:", photo.path);
                setCapturedPhoto(photo);
                setPreviewMode(true);
            } else {
                Alert.alert("준비 중", "카메라가 아직 준비되지 않았습니다.");
            }
        } catch (err) {
            console.error("촬영 오류:", err);
            Alert.alert("오류", "사진 촬영 중 문제가 발생했습니다.");
        }
    };

    // 텍스트 인식 처리 함수
    // CameraComponent.tsx에서 confirmCapture 함수 수정
    const confirmCapture = () => {
        if (capturedPhoto && onCapture) {
            // 부모 컴포넌트로 캡처된 사진 정보 전달
            onCapture(capturedPhoto);
        }
    };

    // 다시 촬영하기
    const retakePicture = () => {
        setCapturedPhoto(null);
        setPreviewMode(false);
    };

    if (hasPermission === null || device === null) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>카메라 초기화 중...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>카메라 권한이 없습니다.</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        const permission = await Camera.requestCameraPermission();
                        setHasPermission(permission === "authorized" || permission === "granted");
                    }}
                >
                    <Text style={styles.buttonText}>권한 다시 요청</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // 미리보기 모드 렌더링
    if (previewMode && capturedPhoto) {
        return (
            <View style={styles.fullScreenContainer}>
                <Image
                    source={{ uri: `file://${capturedPhoto.path}` }}
                    style={StyleSheet.absoluteFill}
                    resizeMode="contain"
                />
                <View style={styles.previewButtonContainer}>
                    <TouchableOpacity style={styles.previewButton} onPress={retakePicture}>
                        <Text style={styles.previewButtonText}>다시 촬영</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.confirmButton} onPress={confirmCapture}>
                        <Text style={styles.confirmButtonText}>텍스트 인식</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // 카메라 모드 렌더링
    return (
        <View style={styles.fullScreenContainer}>
            <Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                onError={onError}
                onInitialized={onCameraReady}
                photo={true}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.switchButton} onPress={toggleCamera}>
                    <Text style={styles.switchButtonText}>
                        {cameraPosition === "front" ? "후방 카메라" : "전방 카메라"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                    <Text style={styles.captureButtonText}>캡처</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={onCancel}>
                    <Text style={styles.backButtonText}>뒤로가기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenContainer: {
        flex: 1,
        backgroundColor: "#000",
        ...StyleSheet.absoluteFillObject,
    },
    text: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
        padding: 20,
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        paddingHorizontal: 20,
    },
    captureButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 15,
        borderRadius: 30,
        flex: 1,
        maxWidth: 150,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    captureButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    switchButton: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 20,
        flex: 1,
        maxWidth: 120,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    switchButtonText: {
        fontSize: 14,
        color: '#fff',
    },
    backButton: {
        backgroundColor: '#888',
        padding: 10,
        borderRadius: 20,
        flex: 1,
        maxWidth: 100,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    backButtonText: {
        fontSize: 14,
        color: '#fff',
    },
    // 미리보기 화면용 스타일
    previewButtonContainer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        paddingHorizontal: 20,
    },
    previewButton: {
        backgroundColor: '#555',
        padding: 12,
        borderRadius: 20,
        flex: 1,
        maxWidth: 120,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    previewButtonText: {
        fontSize: 14,
        color: '#fff',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 30,
        flex: 1,
        maxWidth: 150,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default CameraComponent;