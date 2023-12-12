import { WINEMAKERS_ENDPOINT } from '../../constants/UrlConstants';
import Winemaker from '../../models/Winemaker';
import useApi, { ApiResult } from '../useApi';

type ApiCreateWinemakerResult = ApiResult & {
    createWinemaker: (name: string) => Promise<void>;
    winemaker: Winemaker | null;
};

const useCreateWinemaker = (): ApiCreateWinemakerResult => {
    const { post, result, loading, error } = useApi<Winemaker>();

    const createWinemaker = async (name: string) => {
        await post(WINEMAKERS_ENDPOINT, { name });
    };

    return {
        createWinemaker,
        error,
        winemaker: result,
        loading
    };
};

export default useCreateWinemaker;
