import { WINES_ENDPOINT } from '../../constants/UrlConstants';
import Wine from '../../models/Wine';
import useApi, { ApiResult } from '../useApi';

type ApiGetWineResult = ApiResult & {
    getWine: (id: string) => Promise<void>;
    wine: Wine | null;
};

const useGetWine = (): ApiGetWineResult => {
    const { get, result, loading, error } = useApi<Wine>();

    const getWine = async (id: string) => {
        await get(`${WINES_ENDPOINT}/${id}`);
    };

    return {
        getWine,
        wine: result,
        loading,
        error
    };
};
export default useGetWine;
