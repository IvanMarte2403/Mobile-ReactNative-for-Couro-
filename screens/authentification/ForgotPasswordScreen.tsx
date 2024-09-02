import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../App';
import { sendForgotPasswordRequest } from '../../services/ApiForgotPassword'; // Importa la función de la API
import styles from './style/ForgotPasswordStyles';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);

    const handleContinue = async () => {
        try {
            const baseUrl = 'http://10.0.2.2:8000'; // Reemplaza con tu URL base
            await sendForgotPasswordRequest(baseUrl, email);
            setModalVisible(true);
            setShowCodeInput(true);
        } catch (error) {
            console.error('Error sending forgot password request:', error);
        }
    };

    const handleConfirmCode = () => {
        navigation.navigate('TapYourNewPassword', { email: email.toLowerCase(), code });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={[styles.container, modalVisible && styles.containerShadow]}>
                <View style={styles.logoImagen}>
                    <Image source={require('../../img/logo/logo.png')} style={styles.logo} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Let's <Text style={styles.highlight}>recover</Text> your password
                    </Text>
                </View>
                <View style={styles.containerForms}>
                    <TextInput 
                        placeholder="Email" 
                        style={styles.input} 
                        value={email}
                        onChangeText={setEmail}
                    />

                    {showCodeInput && (
                        <TextInput 
                            placeholder="Code" 
                            style={styles.input} 
                            value={code}
                            onChangeText={setCode}
                        />
                    )}

                    <View style={styles.containerButton}>
                        <TouchableOpacity 
                            style={styles.ButtonLogin} 
                            onPress={showCodeInput ? handleConfirmCode : handleContinue}
                        >
                            <Text style={styles.ButtonLoginText}>
                                {showCodeInput ? 'Confirm Code' : 'Continue'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Check Your Email</Text>
                            <Text style={styles.modalInstructions}>
                                We've sent you a step-by-step process to your email to recover your password.
                            </Text>
                            <TouchableOpacity 
                                style={styles.ButtonLogin} 
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.ButtonLoginText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

export default ForgotPasswordScreen;
