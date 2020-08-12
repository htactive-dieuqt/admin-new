import {callApi} from './apiCaller';

export const getSite = (token) => {
    return callApi('/tourist-site', 'GET', null, token);
}

export const getSiteById = (siteId, token) => {
    return callApi(`/tourist-site/${siteId}`, 'GET', null, token);
}

export const addNewTouristSite = (data, token) => {
    return callApi('/tourist-site', 'POST', data, token);
};

export const updateSite = (siteId, data, token) => {
    return callApi(`/tourist-site/${siteId}`, 'PUT', data, token);
}

export const deleteSite = (siteId, token) => {
    return callApi(`/tourist-site/${siteId}`, 'DELETE', null, token);
}