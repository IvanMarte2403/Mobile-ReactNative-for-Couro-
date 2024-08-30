import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../App';
import styles from './style/LoginScreenStyle';
import { loginUser } from '../../services/apiLogin'; // Importa la función
import { RootStackParamList } from '../../App'; 

const LoginScreen = () => {
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const baseUrl = 'http://10.0.2.2:8000'; // Reemplaza con tu URL base
        const data = await loginUser(baseUrl, email, password);
        console.log('Login response:', data);

        // Extraer el access_token y el user_id
        const accessToken = data.data.access_token;
        const userId = data.data.user.user_id;

        console.log('Access Token:', accessToken);
        console.log('User ID:', userId);

        // Navegar a Home enviando los parámetros
        signIn();
        navigation.navigate('Home', { accessToken, userId });
    } catch (error) {
        console.error('Failed to log in:', error);
    }
};



  return (
    <View style={styles.container}>
      <View style={styles.logoImagen}>
        <Image source={require('../../img/logo/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.titleInicioSesion}>
        <Text style={styles.title}>
          Start your trainer career <Text style={styles.highlight}>here</Text>
        </Text>
      </View>
      <View style={styles.containerForms}>
        <TextInput 
          placeholder="Email" 
          style={styles.input} 
          value={email}
          onChangeText={setEmail} // Vincula el valor del input
        />
        <TextInput 
          placeholder="Password" 
          secureTextEntry 
          style={styles.input} 
          value={password}
          onChangeText={setPassword} // Vincula el valor del input
        />

        <View style={styles.containerForgot}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity 
           style={styles.ButtonLogin}
           onPress={handleLogin}>

            <Text style={styles.ButtonLoginText}>Login</Text>
            
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.registerContainer}>
        <Text>
          Don’t have an account? <Text style={styles.register} onPress={() => navigation.navigate('CreateAccount')}>Register</Text>
        </Text>
      </View>
    </View>
  );
}

export default LoginScreen;
