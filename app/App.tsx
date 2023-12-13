import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import React from 'react';
import { Button, NativeModules } from 'react-native';
import { AuthProvider, useAuth } from './auth/AuthContext';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/login/LoginScreen';

export const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <AuthProvider>
            <Layout />
        </AuthProvider>
    );
};

const Layout = () => {
    const { authState, logout } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {authState.authenticated ? (
                    <Stack.Screen
                        name="App"
                        component={BottomTabNavigator}
                        options={{
                            // make it center so it's the same on all platforms
                            // https://reactnavigation.org/docs/native-stack-navigator/#headertitlealign
                            headerTitleAlign: 'center',
                            title: 'Vinopinions',
                            headerRight: () => <Button onPress={logout} title="Sign Out" />
                        }}
                    />
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

NativeModules.DevSettings.setIsDebuggingRemotely(false);
registerRootComponent(App);

export default App;
