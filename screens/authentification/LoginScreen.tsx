import React, {useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; 
import { AuthContext } from '../../App';
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    flex: 1,
    padding: spacing.medium,
  },
  logoImagen: {
    marginVertical: spacing.medium,
    width: '100%',
    height: '10%',
    marginTop: spacing.large,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titleInicioSesion: {
    alignItems: 'center',
    marginVertical: spacing.medium,
  },
  title: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    fontFamily: fonts.bold,
    color: colors.primary,
    width: '80%',
    textAlign: 'center',
    marginTop: spacing.medium,
  },
  highlight: {
    color: colors.secondary,
  },
  containerForms: {
    marginTop: spacing.large,
    marginVertical: spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
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
  containerForgot: {
    width: '80%',
    alignItems: 'flex-end',
  },
  forgotPassword: {
    textAlign: 'right',
    color: colors.secondary,
    fontWeight: 'regular',
    width: '100%',
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
  register: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default LoginScreen;
