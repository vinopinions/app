import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import React from 'react';
import { initReactI18next } from 'react-i18next';
import { NativeModules } from 'react-native';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from './auth/AuthContext';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/login/LoginScreen';
import { store } from './store/store';

import en from './locales/en.json';

const resources = {
  en: { translation: en },
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
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

NativeModules.DevSettings.setIsDebuggingRemotely(false);
registerRootComponent(App);

export default App;
