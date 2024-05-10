import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
  AppleAuthenticationScope,
} from 'expo-apple-authentication';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import {
  loginAppleAsync,
  loginGoogleAsync,
} from '../../features/auth/authSlice';
import { AppDispatch } from '../../store/store';

GoogleSignin.configure({
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID_IOS,
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID_WEB,
});

type IdTokenInfo = {
  idToken: string;
  provider: 'google' | 'apple';
};

const LoginScreen = () => {
  const [idTokenInfo, setIdTokenInfo] = useState<IdTokenInfo | undefined>();
  useState<boolean>();
  const dispatch: AppDispatch = useDispatch();

  const googleSignIn = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setIdTokenInfo({ idToken: userInfo.idToken, provider: 'google' });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const appleSignIn = useCallback(async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthenticationScope.FULL_NAME,
          AppleAuthenticationScope.EMAIL,
        ],
      });
      setIdTokenInfo({ idToken: credential.identityToken, provider: 'apple' });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }, []);

  useEffect(() => {
    if (!idTokenInfo || !idTokenInfo.idToken) {
      return;
    }
    if (idTokenInfo.provider === 'google') {
      dispatch(loginGoogleAsync(idTokenInfo.idToken));
    } else if (idTokenInfo.provider === 'apple') {
      dispatch(loginAppleAsync(idTokenInfo.idToken));
    }
  }, [dispatch, idTokenInfo]);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Login</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
      />
      <AppleAuthenticationButton
        buttonType={AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthenticationButtonStyle.BLACK}
        onPress={appleSignIn}
        style={styles.authButton}
      />
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
  authButton: {
    width: 200,
    height: 44,
  },
});
