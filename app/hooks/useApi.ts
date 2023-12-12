import axios, { AxiosResponse } from 'axios';
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
    const [result, setResult] = useState<T>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error>(null);

    const call = async (method: 'GET' | 'POST', endpoint, data?: object): Promise<void> => {
        setLoading(true);
        const url = getFullUrl(endpoint);

        try {
            const response: AxiosResponse<T> = await axios({
                method,
                url,
                data
            });
            setResult(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const get = async (endpoint: string, data?: object): Promise<void> => {
        await call('GET', endpoint, data);
    };

    const post = async (endpoint: string, data?: object) => {
        await call('POST', endpoint, data);
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

export default useApi;
