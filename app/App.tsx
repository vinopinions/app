// https://reactnavigation.org/docs/5.x/getting-started/#installing-dependencies-into-a-bare-react-native-project
import 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import * as Localization from 'expo-localization';
import * as Notifications from 'expo-notifications';
import i18n from 'i18next';
import React from 'react';
import { initReactI18next } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from 'react-native-ui-lib';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from './auth/AuthContext';
import de from './locales/de.json';
import en from './locales/en.json';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/login/LoginScreen';
import SignupScreen from './screens/login/SignupScreen';
import { store } from './store/store';

const resources = {
  en: { translation: en },
  de: { translation: de },
};

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  resources,
  lng: Localization.getLocales()[0].languageCode,
});

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

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Provider>
  );
};

const Layout = () => {
  const { authState } = useAuth();

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

registerRootComponent(App);

export default App;

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
