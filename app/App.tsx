import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import { registerRootComponent } from 'expo';
import React from 'react';
import { Button, NativeModules, useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { AppNavigator } from './navigation/bottom-tab-navigator';
import LoginScreen from './screens/login/login-screen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <AuthProvider>
            <Layout />
        </AuthProvider>
    );
};

const Layout = () => {
    const colorScheme = useColorScheme();
    const { authState, logout } = useAuth();

    return (
        <NavigationContainer>
            <ApplicationProvider {...eva} theme={colorScheme === 'dark' ? eva.dark : eva.light}>
                <Stack.Navigator>
                    {authState.authenticated ? (
                        <Stack.Screen
                            name="App"
                            component={AppNavigator}
                            options={{ headerRight: () => <Button onPress={logout} title="Sign Out" /> }}
                        />
                    ) : (
                        <Stack.Screen name="Login" component={LoginScreen} />
                    )}
                </Stack.Navigator>
            </ApplicationProvider>
        </NavigationContainer>
    );
};

NativeModules.DevSettings.setIsDebuggingRemotely(false);
registerRootComponent(App);

export default App;
