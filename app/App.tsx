// https://reactnavigation.org/docs/5.x/getting-started/#installing-dependencies-into-a-bare-react-native-project
import 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import * as Notifications from 'expo-notifications';
import i18n from 'i18next';
import React, { useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from 'react-native-ui-lib';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from './auth/AuthContext';
import de from './locales/de.json';
import en from './locales/en.json';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { useNotification } from './notifications/useNotifications';
import LoginScreen from './screens/login/LoginScreen';
import SignupScreen from './screens/login/SignupScreen';
import { SettingsProvider } from './settings/SettingsContext';
import { store } from './store/store';

const resources = {
  en: { translation: en },
  de: { translation: de },
};

const FIREBASE_AUTH_EMULATOR_URL =
  process.env.EXPO_PUBLIC_FIREBASE_AUTH_EMULATOR_URL;

if (FIREBASE_AUTH_EMULATOR_URL) {
  auth().useEmulator(FIREBASE_AUTH_EMULATOR_URL);
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  resources,
});

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <SettingsProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SettingsProvider>
    </Provider>
  );
};

const App = () => {
  const { authState } = useAuth();
  const { checkPermission } = useNotification();

  useEffect(() => {
    async () => {
      if (authState.status === 'succeeded' && authState.registered) {
        // if the user is registered we check the notification permission. This also sends the pushToken to the server
        await checkPermission();
      }
    };
  }, [authState.status, authState.registered, checkPermission]);

  if (authState.status === 'succeeded' && authState.registered) {
    return (
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    );
  }

  if (authState.status === 'loading') {
    return <Text>Loading</Text>;
  }

  if (
    authState.status === 'succeeded' &&
    authState.firebaseToken &&
    !authState.registered
  ) {
    return <SignupScreen />;
  }

  return <LoginScreen />;
};

registerRootComponent(AppWrapper);

export default AppWrapper;

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
