import React from 'react';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';
import { styles, darkStyles } from '@/screens/Auth/LoginScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface BackButtonProps {
    theme: any;
}

const BackButton = ({ theme }: BackButtonProps) => {
    const colorScheme = useColorScheme();
    return (
        <TouchableOpacity
            onPress={() => router.replace('/(tabs)')}
            style={theme.backButton || { position: 'absolute', top: 40, left: 20 }}
        >
            <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? '#fff' : '#333'} />
        </TouchableOpacity>
    );
};

export default BackButton;