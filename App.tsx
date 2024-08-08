/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

// AuthentificationViews

import LoginScreen from './screens/authentification/LoginScreen';
import CreateAccountScreen from './screens/authentification/CreateAccountScreen';
import ForgotPassworScreen from './screens/authentification/ForgotPasswordScreen';
import TapYourNewPassword from './screens/authentification/TapYourNewPassword';
import ConfirmPasswordScreen from './screens/authentification/ConfirmPasswordScreen';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState('Login');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {currentScreen === 'Login' && <LoginScreen navigate={setCurrentScreen} />}
      {currentScreen === 'CreateAccount' && <CreateAccountScreen navigate={setCurrentScreen} />}

      {currentScreen === 'ForgotPassword' && <ForgotPassworScreen navigate={setCurrentScreen} />}

      {currentScreen === 'TapYourNewPassword' && <TapYourNewPassword navigate={setCurrentScreen} />}

      {currentScreen === 'ConfirmPassword' && <ConfirmPasswordScreen navigate={setCurrentScreen} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
