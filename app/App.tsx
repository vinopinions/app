import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import React from 'react';
import { NativeModules } from 'react-native';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from './auth/AuthContext';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/login/LoginScreen';
import { store } from './store/store';

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
  return authState.status === 'succeeded' && authState.authenticated ? (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  ) : (
    <LoginScreen />
  );
};

NativeModules.DevSettings.setIsDebuggingRemotely(false);
registerRootComponent(App);

export default App;
