import * as types from './types';

const initialState = {
  sites: [],
  site: [],
  searchResult: [],
  error: [],
  loading: false,
};

const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_SITE:
        return {
            ...state,
            loading: true,
            site: action.payload,
        };
    case types.ADD_SITE_SUCCESS:
        return {
            ...state,
            loading: false,
            site: action.payload,
        };
    case types.ADD_SITE_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case types.GET_ALL_SITES:
        return {
            ...state,
            loading: true,
        };
    case types.GET_ALL_SITES_SUCCESS:
        return {
            ...state,
            loading: false,
            sites: action.payload,
        };
    case types.GET_ALL_SITES_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case types.GET_SITE:
        return {
            ...state,
            loading: true,
        };
    case types.GET_SITE_SUCCESS:
        return {
            ...state,
            loading: false,
            site: action.payload,
        };
    case types.GET_SITE_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case types.UPDATE_SITE:
        return {
            ...state,
            loading: true,
            site: action.payload,
        };
    case types.UPDATE_SITE_SUCCESS:
        return {
            ...state,
            loading: false,
            site: action.payload,
        };
    case types.UPDATE_SITE_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case types.DELETE_SITE:
        return {
            ...state,
            loading: true,
        };
    case types.DELETE_SITE_SUCCESS:
        return {
            ...state,
            loading: false,
            site: action.payload,
        };
    case types.DELETE_SITE_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    default:
        return state;
  }
};

export default siteReducer;