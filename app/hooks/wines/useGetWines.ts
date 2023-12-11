import { WINES_ENDPOINT } from '../../constants/UrlConstants';
import useApi from '../useApi';

const useGetWines = () => {
    return useApi('GET', WINES_ENDPOINT);
};

export default useGetWines;
