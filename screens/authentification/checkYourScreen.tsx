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
    const route = useRoute<CheckYourScreenRouteProp>();
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const email = route.params?.email; // Obtener el email de los parámetros

    const handleConfirmEmail = async () => {
        try {
            const baseUrl = 'http://ec2-18-205-159-164.compute-1.amazonaws.com'; // Reemplaza con tu URL base
            console.log('Sending POST request with the following parameters:');
            console.log('Email:', email);
            console.log('Code:', code);

            const data = await confirmEmail(baseUrl, email, code);

            console.log('Confirm email response:', data);
            

            // Si la confirmación es exitosa, navega a la pantalla de login
            navigation.navigate('Login');
        } catch (error) {
            console.error('Failed to confirm email:', error);
            setErrorMessage('Invalid code. Please try again.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                {/* Título Inicial */}
                <View style={styles.titleInicioSesion}>
                    <Text style={styles.title}>
                        Check your <Text style={styles.highlight}>email</Text>
                    </Text>
                    <Text style={styles.textConfirm}>
                        We’ve sent you a step by step process to your email to recover your password
                    </Text>
                </View>

                {/* Formulario */}
                <View style={styles.containerForms}>
                    <TextInput 
                        placeholder="Email" 
                        style={styles.input} 
                        value={email} 
                        editable={false} // El email no es editable
                    />
                    <TextInput 
                        placeholder="Code" 
                        style={styles.input} 
                        value={code} 
                        onChangeText={setCode} // Vincula el valor del input con el estado
                    />      

                    <View style={styles.containerButton}>
                        <TouchableOpacity 
                            style={styles.ButtonLogin} 
                            onPress={handleConfirmEmail} // Llama a la función para confirmar el email
                        >
                            <Text style={styles.ButtonLoginText}>Confirm Email</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Mensaje de error */}
                    {errorMessage ? (
                        <Text style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>
                            {errorMessage}
                        </Text>
                    ) : null}

                    <View style={styles.registerContainer}>
                        <Text>
                            Already have an account? <Text style={styles.Login} onPress={() => navigation.navigate('Login')}>Login</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default CheckYourScreen;
