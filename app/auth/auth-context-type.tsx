import User from './user-type';

export default interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}
