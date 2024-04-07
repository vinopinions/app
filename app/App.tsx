// https://reactnavigation.org/docs/5.x/getting-started/#installing-dependencies-into-a-bare-react-native-project
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import React from 'react';
import { initReactI18next } from 'react-i18next';
import { AuthProvider, useAuth } from './auth/AuthContext';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/login/LoginScreen';

import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import de from './locales/de.json';
import en from './locales/en.json';
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

  if (!(authState.status === 'succeeded' && authState.authenticated)) {
    return <LoginScreen />;
  }

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

registerRootComponent(App);

export default App;

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
