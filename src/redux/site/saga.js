import {put, call, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  getSite,
  getSiteById,
  addNewTouristSite,
  updateSite,
  deleteSite,
} from "../../api/site";
import {
  getAllSuccess,
  getAllFailed,
  getSiteSuccess,
  getSiteFailed,
  updateSiteSuccess,
  updateSiteFailed,
  deleteSiteSuccess,
  deleteSiteFailed,
  addNewSiteSuccess,
  addNewSiteFailed,
} from './action';
import * as types from './types';

import {ToastSuccess, ToastError} from '../../utils/toaster';

function* addNewSiteSaga(action) {
    try {      
        const resData = yield call(addNewTouristSite, action.payload, action.token);
        if (resData.data.data) {
            yield put(addNewSiteSuccess(resData.data.data));
        }
        ToastSuccess(resData.data.message);
    } catch (error) {
        const errs = error.response.data.message;
        yield put(addNewSiteFailed(errs));
    }
}

function* getAllSitesSaga(action) {
    try {
        const resData = yield call(getSite, action.token);
        if (resData.data.data) {
            yield put(getAllSuccess(resData.data.data));
        }
    } catch (error) {
        const errs = error.response.data.message;
        yield put(getAllFailed(errs));
        ToastError(errs);
    }
}

function* getSiteSaga(action) {
    try {
        const resData = yield call(getSiteById, action.payload, action.token);
        if (resData.data) {
            yield put(getSiteSuccess(resData.data));
        }
    } catch (error) {
        const errs = error.response.data.message;
        yield put(getSiteFailed(errs));
    }
}

function* updateSiteSaga(action) {
    try {
        const resData = yield call(updateSite, action.payload.id, action.payload, action.token);
        const fetchData = yield call(getSite, action.token);
        if (resData.data.data) {
            yield put(updateSiteSuccess(resData.data.data));
        }
        if (fetchData) {
            yield put(getAllSuccess(fetchData.data.data));
        }
        ToastSuccess(resData.data.message);
    } catch (error) {
        const errs = error.response.data.message;
        yield put(updateSiteFailed(errs));
    }
}

function* deleteSiteSaga(action) {
    try {        
        const resData = yield call(deleteSite, action.payload, action.token);        
        const fetchData = yield call(getSite, action.token);
        if (resData.data.data) {
            yield put(deleteSiteSuccess(resData.data.data));
            ToastSuccess(resData.data.message);
        }
        if (fetchData){
            yield put(getAllSuccess(fetchData.data.data));
        }
    } catch (error) {
        const errs = error.response.data.message;
        yield put(deleteSiteFailed(errs));
    }
}

export function* siteSaga() {
    yield takeEvery(types.GET_ALL_SITES, getAllSitesSaga);
    yield takeLatest(types.GET_SITE, getSiteSaga);
    yield takeEvery(types.ADD_SITE, addNewSiteSaga);
    yield takeEvery(types.UPDATE_SITE, updateSiteSaga);
    yield takeEvery(types.DELETE_SITE, deleteSiteSaga);
}