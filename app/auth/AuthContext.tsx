import axios from 'axios';
import * as React from 'react';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, checkAsync, logoutAsync } from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../store/store';

interface AuthProps {
  authState: AuthState;
  logout: () => Promise<void>;
  check: () => Promise<void>;
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

  const logout = useCallback(async () => {
    await dispatch(logoutAsync());
  }, [dispatch]);

  const check = useCallback(async () => {
    if (authState.firebaseToken) {
      await dispatch(checkAsync(authState.firebaseToken));
    }
  }, [dispatch, authState.firebaseToken]);

  // when the firebaseToken changes we want to check if a user already has been registered
  useEffect(() => {
    if (authState.firebaseToken) {
      check();
    }
  }, [check, authState.firebaseToken]);

  // when state.register changes to true we set the firebaseToken for axios
  useEffect(() => {
    if (authState.registered && authState.firebaseToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${authState.firebaseToken}`;
    }
  }, [authState.registered, authState.firebaseToken]);

  const value: AuthProps = {
    authState,
    logout,
    check,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
