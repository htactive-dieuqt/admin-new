import * as types from "./types";

const initialState = {
  vouchers: [],
  voucher: [],
  searchResult: [],
  error: [],
  loading: false,
};

const voucherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_VOUCHER:
      return {
        ...state,
        loading: true,
        voucher: action.payload,
      };
    case types.ADD_VOUCHER_SUCCESS:
      return {
        ...state,
        loading: false,
        voucher: action.payload,
      };
    case types.ADD_VOUCHER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.GET_ALL_VOUCHERS:
      return {
        ...state,
        loading: true,
      };
    case types.GET_ALL_VOUCHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        vouchers: action.payload,
      };
    case types.GET_ALL_VOUCHERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.GET_VOUCHER:
      return {
        ...state,
        loading: true,
      };
    case types.GET_VOUCHER_SUCCESS:
      return {
        ...state,
        loading: false,
        voucher: action.payload,
      };
    case types.GET_VOUCHER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.UPDATE_VOUCHER:
      return {
        ...state,
        loading: true,
        voucher: action.payload,
      };
    case types.UPDATE_VOUCHER_SUCCESS:
      return {
        ...state,
        loading: false,
        voucher: action.payload,
      };
    case types.UPDATE_VOUCHER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.DELETE_VOUCHER:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_VOUCHER_SUCCESS:
      return {
        ...state,
        loading: false,
        voucher: action.payload,
      };
    case types.DELETE_VOUCHER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default voucherReducer;
