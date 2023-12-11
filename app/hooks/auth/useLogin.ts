import { Credentials } from '../../auth/AuthContext';
import { LOGIN_ENDPOINT } from '../../constants/UrlConstants';
import useApi, { ApiResult } from '../useApi';

type AccessTokenResult = { access_token: string };

type ApiUseLoginResult = ApiResult & {
    login: (credentials: Credentials) => Promise<void>;
    result: AccessTokenResult;
};

const useLogin = (): ApiUseLoginResult => {
    const { post, result, loading, error } = useApi<AccessTokenResult>();
    const login = async (credentials: Credentials): Promise<void> => {
        await post(LOGIN_ENDPOINT, credentials);
    };

    return {
        login,
        result,
        loading,
        error
    };
};

export default useLogin;
