import { Credentials } from '../../auth/AuthContext';
import { SIGNUP_ENDPOINT } from '../../constants/UrlConstants';
import useApi from '../useApi';

const useSignup = () => {
    const { post, result, error, loading } = useApi();

    const signup = async (credentials: Credentials) => {
        await post(SIGNUP_ENDPOINT, credentials);
    };

    return {
        signup,
        result,
        error,
        loading
    };
};

export default useSignup;
