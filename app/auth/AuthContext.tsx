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
    register: (credentials: Credentials) => Promise<unknown>;
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
    const { signup: doSignup, result: signupResult, error: signupError } = useSignup();
    const { login: doLogin, result: loginResult, error: loginError } = useLogin();

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

    const register = async (credentials: Credentials) => {
        await doSignup(credentials);

        if (signupError) return signupError;

        if (signupResult !== null) await login(credentials);
    };

    const login = async (credentials: Credentials): Promise<Error | null> => {
        await doLogin(credentials);
        if (loginError) {
            alert(loginError.message);
        }

        console.log(loginResult);

        // TODO: Create type guard
        if (!(typeof loginResult == 'object') || !('access_token' in loginResult) || !(typeof loginResult.access_token == 'string'))
            return new Error('Invalid response from server. (Missing token)');

        const token = loginResult.access_token;
        setAuthState({
            token,
            authenticated: true
        });

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await SecureStore.setItemAsync(TOKEN_KEY, token);
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false
        });
    };

    const value: AuthProps = {
        register,
        login,
        logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
