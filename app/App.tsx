import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { registerRootComponent } from 'expo';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useReducer, useState } from 'react';
import { NativeModules, useColorScheme } from 'react-native';
import { AppNavigator } from './navigation/bottom-tab-navigator';
import LoginScreen from './screens/login/login-screen';
import SignUpScreen from './screens/signup/signup-screen';

export const AuthContext = createContext(undefined);

interface AuthAction {
    type: 'RESTORE_TOKEN' | 'SIGN_IN' | 'SIGN_OUT';
    token: string;
}

interface AuthState {
    isLoading: boolean;
    isSignOut: boolean;
    userToken: string | null;
}

const App = () => {
    const colorScheme = useColorScheme();
    const [isLogin, setIsLogin] = useState(true);

    const [state, dispatch] = useReducer(
        (prevState: AuthState, action: AuthAction) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignOut: false,
                        userToken: action.token
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignOut: true,
                        userToken: null
                    };
            }
        },
        {
            isLoading: true,
            isSignOut: true,
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
                fetch('https://api-t.vinopinions.spots.host/v0/auth/login', {
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
                        dispatch({ type: 'SIGN_IN', token: data.access_token });
                    });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT', token: null }),
            signUp: async (username: string, password: string) => {
                fetch('https://api-t.vinopinions.spots.host/v0/auth/signup', {
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
                        authContext.signIn(username, password);
                    });
            }
        }),
        []
    );

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <AuthContext.Provider value={authContext}>
                <ApplicationProvider {...eva} theme={colorScheme === 'dark' ? eva.dark : eva.light}>
                    {state.userToken == null ? (
                        isLogin ? (
                            <LoginScreen switchToSignUp={() => setIsLogin(false)} />
                        ) : (
                            <SignUpScreen switchToLogin={() => setIsLogin(true)} />
                        )
                    ) : (
                        <AppNavigator />
                    )}
                </ApplicationProvider>
            </AuthContext.Provider>
        </>
    );
};

NativeModules.DevSettings.setIsDebuggingRemotely(false);
registerRootComponent(App);

export default App;
