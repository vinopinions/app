import { WINEMAKERS_ENDPOINT } from '../../constants/UrlConstants';
import useApi from '../useApi';

const useCreateWinemaker = (name: string) => {
    return useApi('POST', `${WINEMAKERS_ENDPOINT}`, { name });
};

export default useCreateWinemaker;
