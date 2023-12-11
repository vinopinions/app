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
        const { result, error } = useSignup(credentials);

        if (error) return error;

        if (result !== null) await login(credentials);
    };

    const login = async (credentials: Credentials): Promise<Error | null> => {
        const { result, error } = useLogin(credentials);

        if (error) return error;

        // TODO: Create type guard
        if (
            !(typeof result == 'object') ||
            !('data' in result) ||
            !(typeof result.data == 'object') ||
            !('access_token' in result.data) ||
            !(typeof result.data.access_token == 'string')
        )
            return new Error('Invalid response from server. (Missing token)');

        const token = result.data.access_token;
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
