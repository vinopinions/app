import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { API_BASE_URL } from '../constants/UrlConstants';

const useApi = () => {
    const post = async (endpoint: string, data?: object, validateResponse: boolean = true): Promise<AxiosResponse<unknown, unknown>> => {
        const response = await call('POST', endpoint, data, validateResponse);
        handleResponse(response);
        return response;
    };

    const get = async (endpoint: string, data?: object, validateResponse: boolean = true): Promise<AxiosResponse<unknown, unknown>> => {
        const response = await call('GET', endpoint, data, validateResponse);
        return response;
    };

    const call = async (
        method: 'GET' | 'POST',
        endpoint: string,
        data?: object,
        validateResponse: boolean = true
    ): Promise<AxiosResponse<unknown, unknown>> => {
        const url = getFullUrl(endpoint);

        const response = await axios({
            method,
            url,
            data,
            validateStatus: () => true
        });
        if (validateResponse) handleResponse(response);
        return response;
    };

    return {
        post,
        get
    };
};

const getFullUrl = (endpoint: string) => {
    return endpoint.startsWith('/') ? API_BASE_URL + endpoint : API_BASE_URL + '/' + endpoint;
};

const handleResponse = (response: AxiosResponse) => {
    if (response.status == HttpStatusCode.Unauthorized) alert('Unauthorized. Try to log in again!');
    return response;
};

export default useApi;
