import {put, call, takeEvery} from 'redux-saga/effects';
import {
    getDistrict,
    getDistrictById,
    addNewDistrict,
    updateDistrict,
    deleteDistrict,
} from '../../api/district';
import {
  getAllSuccess,
  getAllFailed,
  getDistrictSuccess,
  getDistrictFailed,
  updateDistrictSuccess,
  updateDistrictFailed,
  deleteDistrictSuccess,
  deleteDistrictFailed,
  addNewDistrictSuccess,
  addNewDistrictFailed,
} from './action';
import * as types from './types';

import {ToastSuccess, ToastError} from '../../utils/toaster';

function* getAllDistrictsSaga(action) {
    try {
        const resData = yield call(getDistrict, action.token);
        if (resData.data.data) {
            yield put(getAllSuccess(resData.data.data));
        }
    } catch (error) {
        const errs = error.response.data.message;
        yield put(getAllFailed(errs));
        ToastError(errs);
    }
}

function* getDistrictSaga(action) {
    try {
        const resData = yield call(getDistrictById, action.id, action.token);
        if (resData.data) {
            yield put(getDistrictSuccess(resData.data));
        }
    } catch (error) {
        const errs = error.response.data.message;
        yield put(getDistrictFailed(errs));
    }
}

function* updateDistrictSaga(action) {
    try {
        const resData = yield call(updateDistrict, action.payload.id, action.payload, action.token);
        const fetchData = yield call(getDistrict, action.token);
        if (resData.data.data) {
            yield put(updateDistrictSuccess(resData.data.data));
            yield put(getAllSuccess(fetchData.data.data));
        }
        ToastSuccess(resData.data.message);
    } catch (error) {
        const errs = error.response.data.message;
        yield put(updateDistrictFailed(errs));
    }
}

function* deleteDistrictSaga(action) {
    try {
        const resData = yield call(deleteDistrict, action.payload, action.token);
        const fetchData = yield call(getDistrict, action.token);
        if (resData.data.data) {
            yield put(deleteDistrictSuccess(resData.data.data));
            yield put(getAllSuccess(fetchData.data.data));
        }
        ToastSuccess(resData.data.message);
    } catch (error) {
        const errs = error.response.data.message;
        yield put(deleteDistrictFailed(errs));
    }
}

function* addNewDistrictSaga(action) {
    try {
        const resData = yield call(addNewDistrict, action.payload, action.token);
        if (resData.data.data) {
            yield put(addNewDistrictSuccess(resData.data.data));
        }
        ToastSuccess(resData.data.message);
    } catch (error) {
        const errs = error.response.data.message;
        yield put(addNewDistrictFailed(errs));
        ToastError(errs.name[0]);
    }
}

export function* districtSaga() {
  yield takeEvery(types.GET_ALL_DISTRICTS, getAllDistrictsSaga);
  yield takeEvery(types.GET_DISTRICT, getDistrictSaga);
  yield takeEvery(types.ADD_DISTRICT, addNewDistrictSaga);
  yield takeEvery(types.UPDATE_DISTRICT, updateDistrictSaga);
  yield takeEvery(types.DELETE_DISTRICT, deleteDistrictSaga);
}