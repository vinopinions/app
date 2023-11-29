import React, { createContext, useCallback, useEffect, useReducer, useState } from 'react';
import { registerRootComponent } from 'expo';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AppNavigator } from './navigation/bottom-tab-navigator';
import * as eva from '@eva-design/eva';
import { Appearance, ColorSchemeName } from 'react-native';
import { NativeModules } from 'react-native';
import LoginScreen from './screens/login/login-screen';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as SecureStore from 'expo-secure-store';
import AuthContextType from './auth/auth-context-type';

export const AuthContext = createContext(undefined);

const App = () => {
    const colorScheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState<ColorSchemeName>();

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        token: action.token
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null
                    };
            }
        },
        {
            isLoading: true,
            isSignout: true,
            userToken: null
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken: string;

            try {
                userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (username: string, password: string) => {
                let token: string;
                fetch('https://api.vinopinions.spots.host/v0/auth/login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        token = data.access_token;
                    });
                dispatch({ type: 'SIGN_IN', token: token });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (username: string, password: string) => {
                fetch('https://api.vinopinions.spots.host/v0/auth/signup', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    });
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            }
        }),
        []
    );

    const themeChangeListener = useCallback(() => {
        setTheme(Appearance.getColorScheme());
    }, []);

    useEffect(() => {
        Appearance.addChangeListener(themeChangeListener);
    }, [themeChangeListener]);

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <AuthContext.Provider value={authContext}>
                <ApplicationProvider {...eva} theme={colorScheme === 'dark' ? eva.dark : eva.light}>
                    {state.userToken == null ? <LoginScreen /> : <AppNavigator />}
                </ApplicationProvider>
            </AuthContext.Provider>
        </>
    );
};

NativeModules.DevSettings.setIsDebuggingRemotely(false);
registerRootComponent(App);

export default App;
