import { Credentials } from '../auth/AuthContext';
import Wine from '../models/Wine';
import Winemaker from '../models/Winemaker';
import { createDefaultAxiosInstance } from './utils';

const BASE_URL = 'https://api-t.vinopinions.spots.host/v0';
const BASE_URL_AUTH = `${BASE_URL}/auth`;
const BASE_URL_WINES = `${BASE_URL}/wines`;
const BASE_URL_WINEMAKERS = `${BASE_URL}/winemakers`;

export const apiAuth = createDefaultAxiosInstance({ baseURL: BASE_URL_AUTH });

export const apiWines = createDefaultAxiosInstance({ baseURL: BASE_URL_WINES });

export const apiWinemakers = createDefaultAxiosInstance({ baseURL: BASE_URL_WINEMAKERS });

export const login = (credentials: Credentials) => apiAuth.post('/login', credentials);
export const signup = (credentials: Credentials) => apiAuth.post('/signup', credentials);

export const fetchWines = () => apiWines.get('/');
export const createWine = (wine: Wine) => apiWines.post('/', wine);

export const fetchWinemakers = () => apiWinemakers.get('/');
export const createWinemaker = (winemaker: Winemaker) => apiWinemakers.post('/', winemaker);
