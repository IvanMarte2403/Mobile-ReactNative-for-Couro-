import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style.ts';

interface Props {
    navigate: (screen: 'Login' | 'CreateAccount' | 'ForgotPassword') => void;
}

const ForgotPasswordScreen: React.FC<Props> = ({ navigate }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleContinue = () => {
        setModalVisible(true);
    };

    const handleModalContinue = () => {
        setModalVisible(false);
        navigate('Login');
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
                    <TextInput placeholder="Email" style={styles.input} />
                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.ButtonLogin} onPress={handleContinue}>
                            <Text style={styles.ButtonLoginText}>Continue</Text>
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
                            <TouchableOpacity style={styles.ButtonLogin} onPress={handleModalContinue}>
                                <Text style={styles.ButtonLoginText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    modalInstructions: {
        textAlign: 'center',
        width: '70%',
        marginTop: spacing.medium,
        marginBottom: spacing.medium,
    },
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
    },
    containerShadow: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    titleContainer: {
        alignItems: 'center',
        marginVertical: spacing.medium,
    },
    title: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        fontFamily: fonts.bold,
        color: colors.primary,
        marginTop: spacing.medium,
        textAlign: 'center',
    },
    containerForms: {
        marginTop: spacing.large,
        alignItems: 'center',
        justifyContent: 'center',
    },
    highlight: {
        color: colors.secondary,
    },
    input: {
        marginTop: spacing.small,
        height: 40,
        borderWidth: 1,
        borderColor: colors.textPrimary,
        marginBottom: spacing.small,
        paddingHorizontal: spacing.small,
        color: colors.primary,
        backgroundColor: colors.textPrimary,
        borderRadius: 10,
        width: '80%',
    },
    containerButton: {
        width: '80%',
        marginTop: spacing.large,
    },
    ButtonLogin: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    ButtonLoginText: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerContainer: {
        alignItems: 'center',
        marginVertical: spacing.medium,
    },
    login: {
        fontWeight: 'bold',
        color: colors.primary,
    },
    logoImagen: {
        alignItems: 'center',
        marginVertical: spacing.medium,
        height: '10%',
        marginTop: spacing.small,
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.primary,
    },
});

export default ForgotPasswordScreen;
