import * as types from "./types";

// Add new voucher
export const addNewVoucher = (data, token) => {
  return {
    type: types.ADD_VOUCHER,
    payload: data,
    token,
  };
};

export const addNewVoucherSuccess = (data) => {
  return {
    type: types.ADD_VOUCHER_SUCCESS,
    payload: data,
  };
};

export const addNewVoucherFailed = (error) => {
  return {
    type: types.ADD_VOUCHER_FAILED,
    error: error,
  };
};

// Get all Voucher
export const getAllVoucher = (token) => {
  return {
    type: types.GET_ALL_VOUCHERS,
    token,
  };
};

export const getAllSuccess = (data) => {
  return {
    type: types.GET_ALL_VOUCHERS_SUCCESS,
    payload: data,
  };
};

export const getAllFailed = (error) => {
  return {
    type: types.GET_ALL_VOUCHERS_FAILED,
    error: error,
  };
};

// Get one from Voucher
export const getVoucher = (id, token) => {
  return {
    type: types.GET_VOUCHER,
    payload: id,
    token,
  };
};

export const getVoucherSuccess = (data) => {
  return {
    type: types.GET_VOUCHER_SUCCESS,
    payload: data,
  };
};

export const getVoucherFailed = (error) => {
  return {
    type: types.GET_VOUCHER_FAILED,
    error: error,
  };
};

//Update Voucher
export const updateVoucher = (data, token) => {
  return {
    type: types.UPDATE_VOUCHER,
    payload: data,
    token,
  };
};

export const updateVoucherSuccess = (data) => {
  return {
    type: types.UPDATE_VOUCHER_SUCCESS,
    payload: data,
  };
};

export const updateVoucherFailed = (error) => {
  return {
    type: types.UPDATE_VOUCHER_FAILED,
    error: error,
  };
};

// Delete Voucher
export const deleteVoucher = (id, token) => {
  return {
    type: types.DELETE_VOUCHER,
    payload: id,
    token,
  };
};

export const deleteVoucherSuccess = (data) => {
  return {
    type: types.DELETE_VOUCHER_SUCCESS,
    payload: data,
  };
};

export const deleteVoucherFailed = (error) => {
  return {
    type: types.DELETE_VOUCHER_FAILED,
    error: error,
  };
};
