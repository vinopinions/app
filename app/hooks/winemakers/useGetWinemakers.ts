import { WINEMAKERS_ENDPOINT } from '../../constants/UrlConstants';
import Winemaker from '../../models/Winemaker';
import useApi, { ApiResult } from '../useApi';

type ApiGetWinemakersResult = ApiResult & {
    getWinemakers: () => Promise<void>;
    winemakers: Winemaker[] | null;
};

const useGetWinemakers = (): ApiGetWinemakersResult => {
    const { get, result, loading, error } = useApi<Winemaker[]>();

    const getWinemakers = async () => {
        await get(WINEMAKERS_ENDPOINT);
    };

    return {
        getWinemakers,
        winemakers: result,
        loading,
        error
    };
};
export default useGetWinemakers;
