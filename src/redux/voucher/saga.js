import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getVoucher,
  getVoucherById,
  addNewVoucher,
  updateVoucher,
  deleteVoucher,
} from "../../api/voucher";
import {
  getAllSuccess,
  getAllFailed,
  getVoucherSuccess,
  getVoucherFailed,
  updateVoucherSuccess,
  updateVoucherFailed,
  deleteVoucherSuccess,
  deleteVoucherFailed,
  addNewVoucherSuccess,
  addNewVoucherFailed,
} from "./action";
import * as types from "./types";

import { ToastSuccess, ToastError } from "../../utils/toaster";

function* getAllVouchersSaga(action) {
  try {
    const resData = yield call(getVoucher, action.token);
    if (resData.data.data) {
      yield put(getAllSuccess(resData.data.data));
    }
  } catch (error) {
    const errs = error.response.data.message;
    yield put(getAllFailed(errs));
    ToastError(errs);
  }
}

function* getVoucherSaga(action) {
  try {
    const resData = yield call(getVoucherById, action.payload, action.token);
    if (resData.data) {
      yield put(getVoucherSuccess(resData.data));
    }
  } catch (error) {
    const errs = error.response.data.message;
    yield put(getVoucherFailed(errs));
  }
}

function* updateVoucherSaga(action) {
  try {
    const resData = yield call(
      updateVoucher,
      action.payload.id,
      action.payload,
      action.token
    );
    const fetchData = yield call(getVoucher, action.token);
    if (resData.data.data) {
      yield put(updateVoucherSuccess(resData.data.data));
      yield put(getAllSuccess(fetchData.data.data));
    }
    ToastSuccess(resData.data.message);
  } catch (error) {
    const errs = error.response.data.message;
    yield put(updateVoucherFailed(errs));
  }
}

function* deleteVoucherSaga(action) {
  try {
    const resData = yield call(deleteVoucher, action.payload, action.token);
    const fetchData = yield call(getVoucher, action.token);
    if (resData.data.data) {
      yield put(deleteVoucherSuccess(resData.data.data));
      yield put(getAllSuccess(fetchData.data.data));
    }
    ToastSuccess(resData.data.message);
  } catch (error) {
    const errs = error.response.data.message;
    yield put(deleteVoucherFailed(errs));
  }
}

function* addNewVoucherSaga(action) {
  try {
    const resData = yield call(addNewVoucher, action.payload, action.token);
    if (resData.data.data) {
      yield put(addNewVoucherSuccess(resData.data.data));
    }
    ToastSuccess(resData.data.message);
  } catch (error) {
    const errs = error.response.data.message;
    yield put(addNewVoucherFailed(errs));
    ToastError(errs.name[0]);
  }
}

export function* voucherSaga() {
  yield takeEvery(types.GET_ALL_VOUCHERS, getAllVouchersSaga);
  yield takeLatest(types.GET_VOUCHER, getVoucherSaga);
  yield takeEvery(types.ADD_VOUCHER, addNewVoucherSaga);
  yield takeEvery(types.UPDATE_VOUCHER, updateVoucherSaga);
  yield takeEvery(types.DELETE_VOUCHER, deleteVoucherSaga);
}
