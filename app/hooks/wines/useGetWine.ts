import { WINES_ENDPOINT } from '../../constants/UrlConstants';
import useApi from '../useApi';

const useGetWine = (id: string) => {
    return useApi('GET', `${WINES_ENDPOINT}/${id}`);
};
export default useGetWine;
