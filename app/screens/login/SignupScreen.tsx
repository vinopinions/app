import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text, TextField } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../auth/AuthContext';
import { signupAsync } from '../../features/auth/authSlice';
import { AppDispatch } from '../../store/store';

const SignupScreen = () => {
  const { check, authState } = useAuth();
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState('');

  const signup = useCallback(async () => {
    await dispatch(
      signupAsync({ username, firebaseToken: authState.firebaseToken }),
    );
    await check();
  }, [dispatch, username, check, authState.firebaseToken]);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Signup</Text>
      <TextField
        placeholder={'Username'}
        floatingPlaceholder
        onChangeText={setUsername}
      />
      <Button label={'Signup'} onPress={signup} />
    </SafeAreaView>
  );
};

export default SignupScreen;

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
});
