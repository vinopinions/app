// base
export const API_BASE_URL = 'https://api-dev.vinopinions.spots.host/v1';
// parameter
export const ID_URL_PARAMETER = ':id';
export const USERNAME_URL_PARAMETER = ':username';
export const FRIEND_USERNAME_URL_PARAMETER = ':friendName';

// auth
export const AUTH_ENDPOINT_URL = `${API_BASE_URL}/auth`;
export const AUTH_LOGIN_ENDPOINT_URL = '/login';
export const AUTH_SIGNUP_ENDPOINT_URL = '/signup';
// friend-requests
export const FRIEND_REQUESTS_ENDPOINT_URL = `${API_BASE_URL}/friend-requests`;
export const FRIEND_REQUESTS_INCOMING_ENDPOINT_URL = '/incoming';
export const FRIEND_REQUESTS_OUTGOING_ENDPOINT_URL = '/outgoing';
export const FRIEND_REQUESTS_SEND_ENDPOINT_URL = '/send';
export const FRIEND_REQUESTS_ID_ACCEPT_ENDPOINT_URL = `/${ID_URL_PARAMETER}/accept`;
export const FRIEND_REQUESTS_ID_DECLINE_ENDPOINT_URL = `/${ID_URL_PARAMETER}/decline`;
export const FRIEND_REQUESTS_ID_REVOKE_ENDPOINT_URL = `/${ID_URL_PARAMETER}/revoke`;
// ratings
export const RATINGS_ENDPOINT_URL = `${API_BASE_URL}/ratings`;
export const RATINGS_ID_ENDPOINT_URL = `/${ID_URL_PARAMETER}`;
// stores
export const STORES_ENDPOINT_URL = `${API_BASE_URL}/stores`;
export const STORES_ID_ENDPOINT_URL = `/${ID_URL_PARAMETER}`;
// users
export const USERS_ENDPOINT_URL = `${API_BASE_URL}/users`;
export const USERS_USERNAME_ENDPOINT_URL = `/${USERNAME_URL_PARAMETER}`;
export const USERS_USERNAME_FRIENDS_ENDPOINT_URL = `/${USERNAME_URL_PARAMETER}/friends`;
export const USERS_USERNAME_FRIENDS_FRIENDNAME_ENDPOINT_URL = `/${USERNAME_URL_PARAMETER}/friends/${FRIEND_USERNAME_URL_PARAMETER}`;
export const USERS_ME_ENDPOINT_URL = '/me';
// winemakers
export const WINEMAKERS_ENDPOINT_URL = `${API_BASE_URL}/winemakers`;
export const WINEMAKERS_ID_ENDPOINT_URL = `/${ID_URL_PARAMETER}`;
// wines
export const WINES_ENDPOINT_URL = `${API_BASE_URL}/wines`;
export const WINES_ID_ENDPOINT_URL = `/${ID_URL_PARAMETER}`;
export const WINES_ID_RATINGS_ENDPOINT_URL = `/${ID_URL_PARAMETER}/ratings`;
