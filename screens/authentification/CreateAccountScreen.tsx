import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { colors } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../App'; 
import styles from './style/CreateAccountScreenStyle';
import { createAccount } from '../../services/ApiCreateAccount'; // Importa la función

const CreateAccountScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();  

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleCreateAccount = async () => {
    try {
      const baseUrl = 'http://ec2-18-205-159-164.compute-1.amazonaws.com'; // Reemplaza con tu URL base
      const data = await createAccount(baseUrl, email, password, birthdate, name, surname);
      console.log('Account created successfully:', data);
      
      // Navega a la pantalla CheckYourScreen después de crear la cuenta, pasando el email
      navigation.navigate('CheckYourScreen', { email }); 
    } catch (error) {
      console.error('Failed to create account:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.logoImagen}>
          <Image source={require('../../img/logo/logo.png')} style={styles.logo} />
        </View>

        {/* Titulo Inicial */}
        <View style={styles.titleInicioSesion}>
          <Text style={styles.title}>
            Let’s start by creating your <Text style={styles.highlight}>account</Text>
          </Text>
        </View>

        {/* Container Forms */}
        <View style={styles.containerForms}>
          <TextInput 
            placeholder="Name" 
            style={styles.input} 
            value={name} 
            onChangeText={setName} // Vincula el valor del input con el estado
          />
          <TextInput 
            placeholder="Surname" 
            style={styles.input} 
            value={surname} 
            onChangeText={setSurname} // Vincula el valor del input con el estado
          />
          <TextInput 
            placeholder="Email" 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} // Vincula el valor del input con el estado
          />
          <TextInput 
            placeholder="dd/mm/aaaa" 
            style={styles.input} 
            value={birthdate} 
            onChangeText={setBirthdate} // Vincula el valor del input con el estado
          />
          <TextInput 
            placeholder="Password" 
            secureTextEntry 
            style={styles.input} 
            value={password} 
            onChangeText={setPassword} // Vincula el valor del input con el estado
          />

          <View style={styles.containerButton}>
            <TouchableOpacity 
              style={styles.ButtonLogin} 
              onPress={handleCreateAccount} // Llama a la función para crear la cuenta
            >
              <Text style={styles.ButtonLoginText}>Create Account</Text>
            </TouchableOpacity>
          </View>
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

export default CreateAccountScreen;
