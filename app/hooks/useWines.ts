import Wine, { isWine, isWineArray } from '../models/Wine';
import useApi from './useApi';

const WINES_ENDPOINT = '/wines';

const useWine = () => {
    const { post, get } = useApi();

    const create = async (name: string, year: number, grapeVariety: string, heritage: string, winemakerId: string): Promise<Wine> => {
        const response = await post(WINES_ENDPOINT, { name, year, grapeVariety, heritage, winemakerId });
        if (!isWine(response.data)) return null;
        return response.data;
    };

    const getAll = async (): Promise<Wine[]> => {
        const response = await get(WINES_ENDPOINT);
        if (!isWineArray(response.data)) return null;

        return response.data;
    };

    const getById = async (id: string): Promise<Wine> => {
        const response = await get(`${WINES_ENDPOINT}/${id}`);
        if (!isWine(response.data)) return null;
        return response.data;
    };

    return { create, getAll, getById };
};

export default useWine;
