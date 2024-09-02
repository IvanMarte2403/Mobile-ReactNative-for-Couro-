import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AuthStackParamList } from '../../App'; 
import styles from './style/CheckYourStyle';

type CheckYourScreenRouteProp = RouteProp<AuthStackParamList, 'CheckYourScreen'>;

const CheckYourScreen = () => {
    const route = useRoute<CheckYourScreenRouteProp>();
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    // Accede al email pasado como parámetro
    const { email } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <View style={styles.titleInicioSesion}>
                    <Text style={styles.title}>
                        Check your <Text style={styles.highlight}>email</Text>
                    </Text>
                    <Text style={styles.textConfirm}>
                        We’ve sent you a step-by-step process to your email ({email}) to recover your password.
                    </Text>
                </View>
                <View style={styles.containerForms}>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value={email} // Muestra el email pasado como parámetro
                        editable={false} // Opcional: deshabilita la edición si solo es para mostrar
                    />
                    <TextInput placeholder="Code" style={styles.input} />

                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.ButtonLogin} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.ButtonLoginText}>Confirm Email</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.registerContainer}>
                        <Text>
                            Already have an account?{' '}
                            <Text style={styles.Login} onPress={() => navigation.navigate('Login')}>
                                Login
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default CheckYourScreen;
