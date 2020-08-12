import {callApi} from './apiCaller';

export const getDistrict = (token) => {
    return callApi('/district', 'GET', null, token);
}

export const getDistrictById = (districtId, token) => {
    return callApi('/district/' + districtId, 'GET', null, token);
}

export const addNewDistrict = (data, token) => {
    return callApi('/district', 'POST', data, token);
}

export const updateDistrict = (districtId, data, token) => {
    return callApi(`/district/${districtId}`, 'PUT', data, token);
}

export const deleteDistrict = (districtId, token) => {
    return callApi(`/district/${districtId}`, 'DELETE', null, token);
}