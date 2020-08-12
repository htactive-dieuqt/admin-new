import {callApi} from './apiCaller';

export const loginRequest = (data) => {
    return callApi('/login', 'POST', data);
};

export const getInfo = (userId, token) => {
    return callApi(`/admin/${userId}`,'POST', null, token);
}