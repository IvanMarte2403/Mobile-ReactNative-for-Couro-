import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  navigate: (screen: 'Login' | 'CreateAccount') => void;
}

const CreateAccountScreen: React.FC<Props> = ({ navigate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} />
      <Button title="Register" onPress={() => navigate('Login')} />
      <Button title="Back to Login" onPress={() => navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CreateAccountScreen;
