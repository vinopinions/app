import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text, TextField } from 'react-native-ui-lib';
import { Credentials, useAuth } from '../../auth/AuthContext';
import PasswordField from '../../components/PasswordField';

const LoginScreen = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });

  const { login, signup } = useAuth();
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Login</Text>
      <TextField
        value={credentials.username}
        style={styles.inputText}
        autoCapitalize="none"
        floatingPlaceholder
        placeholder="username"
        id="username"
        containerStyle={styles.inputTextContainer}
        onChangeText={(username) =>
          setCredentials({ ...credentials, username })
        }
      />
      <PasswordField
        style={styles.inputText}
        containerStyle={styles.inputTextContainer}
        value={credentials.password}
        placeholder="password"
        floatingPlaceholder
        onChangeText={(password) =>
          setCredentials({ ...credentials, password })
        }
      />
      <Button label="Login" onPress={() => login(credentials)} />
      <Button label="Sign up" onPress={() => signup(credentials)} />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 40,
  },
  inputTextContainer: {
    backgroundColor: '',
    width: '80%',
    height: 'auto',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  inputText: {},
});
