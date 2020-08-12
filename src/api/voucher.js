import { callApi } from "./apiCaller";

export const getVoucher = (token) => {
  return callApi("/voucher", "GET", null, token);
};

export const getVoucherById = (voucherId, token) => {
  return callApi("/voucher/" + voucherId, "GET", null, token);
};

export const addNewVoucher = (data, token) => {
  return callApi("/voucher", "POST", data, token);
};

export const updateVoucher = (voucherId, data, token) => {
  return callApi(`/voucher/${voucherId}`, "PUT", data, token);
};

export const deleteVoucher = (voucherId, token) => {
  return callApi(`/voucher/${voucherId}`, "DELETE", null, token);
};
