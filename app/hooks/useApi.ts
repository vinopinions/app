import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../constants/UrlConstants';

export type ApiRequestInfo = {
    result: unknown;
    loading: boolean;
    error: Error;
};

const useApi = (method: 'GET' | 'POST', endpoint: string, data?: object): ApiRequestInfo => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = getFullUrl(endpoint);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method,
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

        fetchData();
    }, []);
    return {
        result,
        loading,
        error
    };
};

const getFullUrl = (endpoint: string) => {
    return endpoint.startsWith('/') ? API_BASE_URL + endpoint : API_BASE_URL + '/' + endpoint;
};

export const handleResponse = (response: AxiosResponse) => {
    if (response.status == HttpStatusCode.Unauthorized) alert('Unauthorized. Try to log in again!');
    return response;
};

export default useApi;
