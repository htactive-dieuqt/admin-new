import * as types from './types';

// Add new site
export const addNewSite = (data, token) => {
    return {
        type: types.ADD_SITE,
        payload: data,
        token,
    };
};

export const addNewSiteSuccess = data => {
    return {
        type: types.ADD_SITE_SUCCESS,
        payload: data,
    };
};

export const addNewSiteFailed = error => {
    return {
        type: types.ADD_SITE_FAILED,
        error: error,
    };
};

// Get all Site
export const getAllSite = (token) => {
    return {
        type: types.GET_ALL_SITES,
        token,
    };
};

export const getAllSuccess = data => {
    return {
        type: types.GET_ALL_SITES_SUCCESS,
        payload: data,
    };
};

export const getAllFailed = error => {
    return {
        type: types.GET_SITE_FAILED,
        error: error,
    };
};

// Get one from Sites
export const getSite = (id, token) => {
    return {
        type: types.GET_SITE,
        payload: id,
        token,
    };
};
  
export const getSiteSuccess = data => {
    return {
        type: types.GET_SITE_SUCCESS,
        payload: data,
    };
};
  
export const getSiteFailed = error => {
    return {
        type: types.GET_SITE_FAILED,
        error: error,
    };
};

//Update Site
export const updateSite = (data, token) => {
    return {
        type: types.UPDATE_SITE,
        payload: data,
        token,
    };
};
  
export const updateSiteSuccess = data => {
    return {
        type: types.UPDATE_SITE_SUCCESS,
        payload: data,
    };
};
  
export const updateSiteFailed = error => {
    return {
        type: types.UPDATE_SITE_FAILED,
        error: error,
    };
};

// Delete Site
export const deleteSite = (id, token) => {
    return {
        type: types.DELETE_SITE,
        payload: id,
        token,
    };
};
  
export const deleteSiteSuccess = data => {
    return {
        type: types.DELETE_SITE_SUCCESS,
        payload: data,
    };
};
  
export const deleteSiteFailed = error => {
    return {
        type: types.DELETE_SITE_FAILED,
        error: error,
    };
};