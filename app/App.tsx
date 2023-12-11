import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import { registerRootComponent } from 'expo';
import React from 'react';
import { Button, LogBox, NativeModules, useColorScheme } from 'react-native';
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

// https://github.com/akveo/react-native-ui-kitten/issues/548 // https://github.com/akveo/react-native-ui-kitten/issues/548#issuecomment-515673924
// both issues are closed but no workaround is working, so we will just disable the warning
LogBox.ignoreLogs(['Warning: Failed prop type: Invalid props.style key `tintColor` supplied to `Text`.']); // Ignore log notification by message

export default App;
