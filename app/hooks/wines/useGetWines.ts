import { WINES_ENDPOINT } from '../../constants/UrlConstants';
import Wine from '../../models/Wine';
import useApi, { ApiResult } from '../useApi';

type ApiGetWinesResult = ApiResult & {
    getWines: () => Promise<void>;
    wines: Wine[] | null;
};

const useGetWines = (): ApiGetWinesResult => {
    const { get, result, loading, error } = useApi<Wine[]>();

    const getWines = async () => {
        await get(WINES_ENDPOINT);
    };

    return {
        getWines,
        wines: result,
        loading,
        error
    };
};
export default useGetWines;
