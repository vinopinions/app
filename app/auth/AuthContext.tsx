import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

export const API_BASE_URL = 'https://api-t.vinopinions.spots.host/v0';
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
    authState?: AuthState;
    register?: (credentials: Credentials) => Promise<unknown>;
    login?: (credentials: Credentials) => Promise<unknown>;
    logout?: () => Promise<unknown>;
}

const AuthContext = createContext<AuthProps>({});

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
    });

    const register = async (credentials: Credentials) => {
        try {
            return await axios.post(`${API_BASE_URL}/auth/signup`, credentials);
        } catch (e) {
            console.log(e);
            console.log(typeof e);

            return { error: true };
        }
    };

    const login = async (credentials: Credentials) => {
        try {
            const result = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
            const token = result.data.access_token;
            setAuthState({
                token,
                authenticated: true
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, token);
            console.log(token);
            return result;
        } catch (e) {
            console.log(e);
            console.log(typeof e);
            // return { error: true, msg: (e as any).response.data.msg };
            return { error: true };
        }
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
