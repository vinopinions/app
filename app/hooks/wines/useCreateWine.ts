import { WINES_ENDPOINT } from '../../constants/UrlConstants';
import useApi from '../useApi';

const useCreateWine = (name: string, year: number, grapeVariety: string, heritage: string, winemakerId: string) => {
    return useApi('POST', `${WINES_ENDPOINT}`, { name, year, grapeVariety, heritage, winemakerId });
};

export default useCreateWine;
