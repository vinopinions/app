import { WINEMAKERS_ENDPOINT } from '../../constants/UrlConstants';
import useApi from '../useApi';

const useGetWinemakers = () => {
    return useApi('GET', `${WINEMAKERS_ENDPOINT}`);
};
export default useGetWinemakers;
