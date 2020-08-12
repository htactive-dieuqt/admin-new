import * as types from './types';

const initialState = {
  districts: [],
  district: [],
  searchResult: [],
  error: [],
  loading: false,
};

const districtReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_DISTRICT:
        return {
            ...state,
            loading: true,
            district: action.payload,
        };
    case types.ADD_DISTRICT_SUCCESS:
        return {
            ...state,
            loading: false,
            district: action.payload,
        };
    case types.ADD_DISTRICT_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case types.GET_ALL_DISTRICTS:
        return {
            ...state,
            loading: true,
        };
    case types.GET_ALL_DISTRICTS_SUCCESS:
        return {
            ...state,
            loading: false,
            districts: action.payload,
        };
    case types.GET_ALL_DISTRICTS_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case types.GET_DISTRICT:
        return {
            ...state,
            loading: true,
        };
    case types.GET_DISTRICT_SUCCESS:
        return {
            ...state,
            loading: false,
            district: action.payload,
        };
    case types.GET_DISTRICT_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case types.UPDATE_DISTRICT:
        return {
            ...state,
            loading: true,
            district: action.payload,
        };
    case types.UPDATE_DISTRICT_SUCCESS:
        return {
            ...state,
            loading: false,
            district: action.payload,
        };
    case types.UPDATE_DISTRICT_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case types.DELETE_DISTRICT:
        return {
            ...state,
            loading: true,
        };
    case types.DELETE_DISTRICT_SUCCESS:
        return {
            ...state,
            loading: false,
            district: action.payload,
        };
    case types.DELETE_DISTRICT_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    default:
        return state;
  }
};

export default districtReducer;