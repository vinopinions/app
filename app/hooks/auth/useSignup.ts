import { Credentials } from '../../auth/AuthContext';
import { SIGNUP_ENDPOINT } from '../../constants/UrlConstants';
import useApi from '../useApi';

const useSignup = (credentials: Credentials) => {
    return useApi('POST', SIGNUP_ENDPOINT, credentials);
};

export default useSignup;
