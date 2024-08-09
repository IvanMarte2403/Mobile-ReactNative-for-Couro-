import 'react-native-gesture-handler';
import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// AuthentificationViews
import LoginScreen from './screens/authentification/LoginScreen';
import CreateAccountScreen from './screens/authentification/CreateAccountScreen';
import ForgotPasswordScreen from './screens/authentification/ForgotPasswordScreen';
import TapYourNewPassword from './screens/authentification/TapYourNewPassword';
import ConfirmPasswordScreen from './screens/authentification/ConfirmPasswordScreen';

// HomeViews
import HomeScreen from './screens/navigation/HomeScreen';

// Defyne the type of routes
export type AuthStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
  TapYourNewPassword: undefined;
  ConfirmPassword: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type RootStackParamList = AuthStackParamList & HomeStackParamList;

const AuthStack = createStackNavigator<AuthStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccountScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <AuthStack.Screen name="TapYourNewPassword" component={TapYourNewPassword} />
    <AuthStack.Screen name="ConfirmPassword" component={ConfirmPasswordScreen} />
  </AuthStack.Navigator>
);

const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ headerShown: false }} 
    />
  </HomeStack.Navigator>
);

// Context for aunthentification, for testing purposes only
const AuthContext = createContext<{ signIn: () => void }>({ signIn: () => {} });

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const signIn = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ signIn }}>
      <NavigationContainer>
        <SafeAreaView style={[{ flex: 1 }, backgroundStyle]}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          {isAuthenticated ? <HomeStackScreen /> : <AuthStackScreen />}
        </SafeAreaView>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default App;
