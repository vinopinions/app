import { Credentials } from '../../auth/AuthContext';
import { LOGIN_ENDPOINT } from '../../constants/UrlConstants';
import useApi from '../useApi';

const useLogin = (): { login: (credentials: Credentials) => Promise<void>; result: unknown; error: Error; loading: boolean } => {
    const { post, result, error, loading } = useApi();
    const login = async (credentials: Credentials) => {
        await post(LOGIN_ENDPOINT, credentials);
    };

    return {
        login,
        result,
        error,
        loading
    };
};

export default useLogin;
