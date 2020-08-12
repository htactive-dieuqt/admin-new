import * as types from './types';

export const adminLogin = data => {
    return {
        type: types.LOGIN,
        payload: data,
    };
};

export const loginSuccess = data => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: data,
    };
};

export const loginFailed = error => {
    return {
        type: types.LOGIN_FAILED,
        error: error,
    };
};