import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { useState } from 'react';
import { API_BASE_URL } from '../constants/UrlConstants';

export type ApiResult = {
    loading: boolean;
    error?: Error;
};

type ApiUseApiResult<T> = ApiResult & {
    get: (endpoint: string, data?: object) => Promise<void>;
    post: (endpoint: string, data?: object) => Promise<void>;
    result: T;
};

const useApi = <T = unknown>(): ApiUseApiResult<T> => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const get = async (endpoint: string, data?: object): Promise<void> => {
        const url = getFullUrl(endpoint);

        try {
            const response: AxiosResponse<T> = await axios({
                method: 'GET',
                url,
                data
            });
            setResult(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
            // TODO: remove
            handleResponse(result);
        }
    };

    const post = async (endpoint: string, data?: object) => {
        const url = getFullUrl(endpoint);
        try {
            console.log({ data });
            const response = await axios({
                method: 'POST',
                url,
                data
            });
            console.log({ status: response.status });
            setResult(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
            // TODO: remove
            handleResponse(result);
        }
    };

    return {
        get,
        post,
        result,
        loading,
        error
    };
};

const getFullUrl = (endpoint: string) => {
    return endpoint.startsWith('/') ? API_BASE_URL + endpoint : API_BASE_URL + '/' + endpoint;
};

export const handleResponse = (response: AxiosResponse) => {
    if (response && response.status == HttpStatusCode.Unauthorized) alert('Unauthorized. Try to log in again!');
    return response;
};

export default useApi;
