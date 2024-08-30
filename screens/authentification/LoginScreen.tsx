import React, {useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; 
import { AuthContext } from '../../App';
import styles from './style/LoginScreenStyle';

const LoginScreen = () => {

  const { signIn } = useContext(AuthContext);

  const handleLogin = () => {
    signIn();
    navigation.navigate('Home');
  };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} />

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

      {/* Cambio de Vista a CreateAccount */}
      <View style={styles.registerContainer}>
        <Text>
          Don’t have an account? <Text style={styles.register} onPress={() => navigation.navigate('CreateAccount')}>Register</Text>
        </Text>
      </View>
    </View>
  );
}



export default LoginScreen;
