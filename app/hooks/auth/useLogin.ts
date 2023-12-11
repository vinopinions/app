import { Credentials } from '../../auth/AuthContext';
import { LOGIN_ENDPOINT } from '../../constants/UrlConstants';
import useApi from '../useApi';

const useLogin = (credentials: Credentials) => {
    return useApi('POST', LOGIN_ENDPOINT, credentials);
};

export default useLogin;
