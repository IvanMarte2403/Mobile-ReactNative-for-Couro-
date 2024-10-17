import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../style';
import { NavigationProp, useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '../../App'; 
import styles from './style/CheckYourStyle';
import { confirmEmail } from '../../services/ApiConfirmRegister'; // Importa la función para confirmar el email

type CheckYourScreenRouteProp = RouteProp<AuthStackParamList, 'CheckYourScreen'>;

const CheckYourScreen = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                {/* Título Inicial */}
                <View style={styles.titleInicioSesion}>
                    <Text style={styles.title}>
                        Check your <Text style={styles.highlight}>email</Text>
                    </Text>
                    <Text style={styles.textConfirm}>
                        We’ve sent you a link to your email to verify your account
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default CheckYourScreen;
