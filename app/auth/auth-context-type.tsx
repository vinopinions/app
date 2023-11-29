import User from './user-type';

export default interface AuthContextType {
    user: User | null;
    signIn: (username: string, password: string) => void;
    signOut: () => void;
}
