import * as types from './types';

const initialState = {
    admin: [],
    error: [],
    loading: false,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                loading: true,
                admin: action.payload,
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                admin: action.payload,
            };
        case types.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default adminReducer;