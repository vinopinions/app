import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import * as Localization from 'expo-localization';
import * as Notifications from 'expo-notifications';
import i18n from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import { NativeModules } from 'react-native';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from './auth/AuthContext';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/login/LoginScreen';
import { store } from './store/store';

import de from './locales/de.json';
import en from './locales/en.json';
import { registerForPushNotificationsAsync } from './notifications/Notification';

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
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token),
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener(
        (newNotification: Notifications.Notification) => {
          setNotification(newNotification);
        },
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    console.log({ expoPushToken, notification });
  }, [expoPushToken, notification]);

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
