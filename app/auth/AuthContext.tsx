import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import useLogin from '../hooks/auth/useLogin';
import useSignup from '../hooks/auth/useSignup';

const TOKEN_KEY = 'api-jwt';

interface AuthState {
    token: string | null;
    authenticated: boolean;
}

export interface Credentials {
    username: string;
    password: string;
}

interface AuthProps {
    authState: AuthState;
    signup: (credentials: Credentials) => Promise<unknown>;
    login: (credentials: Credentials) => Promise<unknown>;
    logout: () => Promise<unknown>;
}

const AuthContext = createContext<AuthProps>(null);

export const useAuth = (): AuthProps => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const [authState, setAuthState] = useState<AuthState>({
        token: null,
        authenticated: false
    });
    const { signup, error: signupError } = useSignup();
    const { login, result: loginResult, error: loginError } = useLogin();

    // load the token from secure store if it exists
    useEffect(() => {
        const loadTokenFromSecureStore = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token,
                    authenticated: true
                });
            }
        };

        loadTokenFromSecureStore();
    }, []);

    // set everything up when login result is updating
    useEffect(() => {
        const handleLogin = async () => {
            const token = loginResult?.access_token;

            if (!token) return;

            setAuthState({
                token,
                authenticated: true
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, token);
        };
        handleLogin();
    }, [loginResult]);

    // handle login error
    useEffect(() => {
        if (!loginError) return;

        alert(loginError.message);
    }, [loginError]);

    // handle signup error
    useEffect(() => {
        if (!signupError) return;

        alert(signupError.message);
    }, [signupError]);

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false
        });
    };

    const value: AuthProps = {
        signup,
        login,
        logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
