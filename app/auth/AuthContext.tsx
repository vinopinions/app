import * as React from 'react';
import { ReactNode, createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AuthState,
  loadAccessTokenAsync,
  loginAsync,
  logoutAsync,
  signupAsync,
} from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../store/store';

export interface Credentials {
  username: string;
  password: string;
}

interface AuthProps {
  authState: AuthState;
  signup: (credentials: Credentials) => Promise<void>;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthProps>(null);

export const useAuth = (): AuthProps => {
  return useContext(AuthContext);
};

export const AuthProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const dispatch: AppDispatch = useDispatch();
  const authState: AuthState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadAccessTokenAsync());
  }, [dispatch]);

  const login = async (credentials: Credentials) => {
    await dispatch(loginAsync(credentials));
  };

  const signup = async (credentials: Credentials) => {
    await dispatch(signupAsync(credentials));
  };

  const logout = async () => {
    await dispatch(logoutAsync());
  };

  const value: AuthProps = {
    authState,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
