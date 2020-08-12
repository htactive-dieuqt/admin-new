import * as types from './types';

// Add new district
export const addNewDistrict = (data, token) => {
    return {
        type: types.ADD_DISTRICT,
        payload: data,
        token,
    };
};

export const addNewDistrictSuccess = data => {
    return {
        type: types.ADD_DISTRICT_SUCCESS,
        payload: data,
    };
};

export const addNewDistrictFailed = error => {
    return {
        type: types.ADD_DISTRICT_FAILED,
        error: error,
    };
};

// Get all district
export const getAllDistrict = (token) => {
    return {
        type: types.GET_ALL_DISTRICTS,
        token,
    };
};

export const getAllSuccess = data => {
    return {
        type: types.GET_ALL_DISTRICTS_SUCCESS,
        payload: data,
    };
};

export const getAllFailed = error => {
    return {
        type: types.GET_ALL_DISTRICTS_FAILED,
        error: error,
    };
};

// Get one from District
export const getDistrict = (id, token) => {
    return {
        type: types.GET_DISTRICT,
        payload: id,
        token,
    };
};
  
export const getDistrictSuccess = data => {
    return {
        type: types.GET_DISTRICT_SUCCESS,
        payload: data,
    };
};
  
export const getDistrictFailed = error => {
    return {
        type: types.GET_DISTRICT_FAILED,
        error: error,
    };
};

//Update District
export const updateDistrict = (data, token) => {
    return {
        type: types.UPDATE_DISTRICT,
        payload: data,
        token,
    };
};
  
export const updateDistrictSuccess = data => {
    return {
        type: types.UPDATE_DISTRICT_SUCCESS,
        payload: data,
    };
};
  
export const updateDistrictFailed = error => {
    return {
        type: types.UPDATE_DISTRICT_FAILED,
        error: error,
    };
};

// Delete District
export const deleteDistrict = (id, token) => {
    return {
        type: types.DELETE_DISTRICT,
        payload: id,
        token,
    };
};
  
export const deleteDistrictSuccess = data => {
    return {
        type: types.DELETE_DISTRICT_SUCCESS,
        payload: data,
    };
};
  
export const deleteDistrictFailed = error => {
    return {
        type: types.DELETE_DISTRICT_FAILED,
        error: error,
    };
};
