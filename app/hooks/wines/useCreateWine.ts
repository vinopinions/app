import { WINES_ENDPOINT } from '../../constants/UrlConstants';
import Wine from '../../models/Wine';
import useApi, { ApiResult } from '../useApi';

type ApiCreateWineResult = ApiResult & {
    createWine: (name: string, year: number, grapeVariety: string, heritage: string, winemakerId: string) => Promise<void>;
    wine: Wine | null;
};

const useCreateWine = (): ApiCreateWineResult => {
    const { post, result, loading, error } = useApi<Wine>();

    const createWine = async (name: string, year: number, grapeVariety: string, heritage: string, winemakerId: string) => {
        await post(WINES_ENDPOINT, { name, year, grapeVariety, heritage, winemakerId });
    };

    return {
        createWine,
        error,
        wine: result,
        loading
    };
};

export default useCreateWine;
