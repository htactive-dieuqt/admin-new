import * as types from './types';

const initialState = {
  categories: [],
  category: [],
  searchResult: [],
  error: [],
  loading: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CATEGORY:
        return {
            ...state,
            loading: true,
            category: action.payload,
        };
    case types.ADD_CATEGORY_SUCCESS:
        return {
            ...state,
            loading: false,
            category: action.payload,
        };
    case types.ADD_CATEGORY_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case types.GET_ALL_CATEGORIES:
        return {
            ...state,
            loading: true,
        };
    case types.GET_ALL_CATEGORIES_SUCCESS:
        return {
            ...state,
            loading: false,
            categories: action.payload,
        };
    case types.GET_ALL_CATEGORIES_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case types.GET_CATEGORY:
        return {
            ...state,
            loading: true,
        };
    case types.GET_CATEGORY_SUCCESS:
        return {
            ...state,
            loading: false,
            category: action.payload,
        };
    case types.GET_CATEGORY_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case types.UPDATE_CATEGORY:
        return {
            ...state,
            loading: true,
            category: action.payload,
        };
    case types.UPDATE_CATEGORY_SUCCESS:
        return {
            ...state,
            loading: false,
            category: action.payload,
        };
    case types.UPDATE_CATEGORY_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case types.DELETE_CATEGORY:
        return {
            ...state,
            loading: true,
        };
    case types.DELETE_CATEGORY_SUCCESS:
        return {
            ...state,
            loading: false,
            category: action.payload,
        };
    case types.DELETE_CATEGORY_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    default:
        return state;
  }
};

export default categoryReducer;