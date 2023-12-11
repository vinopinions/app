import { Credentials } from '../../auth/AuthContext';
import { SIGNUP_ENDPOINT } from '../../constants/UrlConstants';
import useApi, { ApiResult } from '../useApi';

type ApiUseSignupResult = ApiResult & {
    signup: (credentials: Credentials) => Promise<void>;
    result: unknown;
};

const useSignup = (): ApiUseSignupResult => {
    const { post, result, loading, error } = useApi();

    const signup = async (credentials: Credentials) => {
        await post(SIGNUP_ENDPOINT, credentials);
    };

    return {
        signup,
        result,
        loading,
        error
    };
};

export default useSignup;
