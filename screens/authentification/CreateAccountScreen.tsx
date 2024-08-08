import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style.ts';

interface Props {
navigate: (screen: 'Login' | 'CreateAccount' | 'ForgotPassword' | 'TapYourNewPassword') => void;
}

const CreateAccountScreen: React.FC<Props> = ({ navigate }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>

        <View style={styles.container}>
          <View style={styles.logoImagen}>
            <Image source={require('../../img/logo/logo.png')} style={styles.logo} />
          </View>
          <View style={styles.titleInicioSesion}>
            <Text style={styles.title}>
              Let´s start by creating your <Text style={styles.highlight}>account</Text>
            </Text>
          </View>
          <View style={styles.containerForms}>

            <TouchableOpacity style={styles.uploadCircle}>
              <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>
              <TextInput placeholder="Full Name" style={styles.input} />
              <TextInput placeholder="Email" secureTextEntry style={styles.input} />
              <TextInput placeholder="Password" secureTextEntry style={styles.input} />
              <TextInput placeholder="Repeat password" secureTextEntry style={styles.input} />

              <View style={styles.containerButton}>
                  <TouchableOpacity style={styles.ButtonLogin} onPress={() => navigate('CreateAccount')}>
                    <Text style={styles.ButtonLoginText}>Creat Account</Text>
                  </TouchableOpacity>
              </View>


              <View style={styles.registerContainer}>
                <Text>
                  Already have an account? <Text style={styles.Login} onPress={() => navigate('Login')}>Login</Text>
                </Text>
              </View>
          </View>

         

        </View>

    </ScrollView>

          
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: spacing.medium,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    paddingBottom: spacing.large,
  },
  logoImagen: {
    marginVertical: spacing.medium,
    width: '100%',
    height: '10%',
    marginTop: spacing.large,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex', // Asegura que el contenedor use flexbox
},
logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Asegura que la imagen no se corte y mantenga su proporción
    alignSelf: 'center', // Centra la imagen dentro del contenedor
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
    marginTop: spacing.small,
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
  Login: {
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.medium,
  },
  uploadCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.medium,
  },
  uploadText: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontFamily: fonts.bold,
  },
});

export default CreateAccountScreen;
