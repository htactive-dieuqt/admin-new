import {put, call, takeEvery} from 'redux-saga/effects';
import {
    getCategory,
    getCategoryById,
    addNewCategory,
    updateCategory,
    deleteCategory,
} from '../../api/category';
import {
  getAllSuccess,
  getAllFailed,
  getCategorySuccess,
  getCategoryFailed,
  updateCategorySuccess,
  updateCategoryFailed,
  deleteCategorySuccess,
  deleteCategoryFailed,
  addNewCategorySuccess,
  addNewCategoryFailed,
} from './action';
import * as types from './types';

import {ToastSuccess, ToastError} from '../../utils/toaster';

function* getAllCategoriesSaga(action) {
    try {
        const resData = yield call(getCategory, action.token);
        if (resData.data.data) {
            yield put(getAllSuccess(resData.data.data));
        }
    } catch (error) {
        const errs = error.response.data.message;
        yield put(getAllFailed(errs));
        ToastError(errs);
    }
}

function* getCategorySaga(action) {
    try {
        const resData = yield call(getCategoryById, action.id, action.token);
        if (resData.data) {
            yield put(getCategorySuccess(resData.data));
        }
    } catch (error) {
        const errs = error.response.data.message;
        yield put(getCategoryFailed(errs));
    }
}

function* updateCategorySaga(action) {
    try {
        const resData = yield call(updateCategory, action.payload.id, action.payload, action.token);
        const fetchData = yield call(getCategory, action.token);
        if (resData.data.data) {
            yield put(updateCategorySuccess(resData.data.data));
            yield put(getAllSuccess(fetchData.data.data));
        }
        ToastSuccess(resData.data.message);
    } catch (error) {
        const errs = error.response.data.message;
        yield put(updateCategoryFailed(errs));
    }
}

function* deleteCategorySaga(action) {
    try {
        const resData = yield call(deleteCategory, action.payload, action.token);
        const fetchData = yield call(getCategory, action.token);
        if (resData.data.data) {
            yield put(deleteCategorySuccess(resData.data.data));
            yield put(getAllSuccess(fetchData.data.data));
        }
        ToastSuccess(resData.data.message);
    } catch (error) {
        const errs = error.response.data.message;
        yield put(deleteCategoryFailed(errs));
    }
}

function* addNewCategorySaga(action) {
    try {
        const resData = yield call(addNewCategory, action.payload, action.token);
        if (resData.data.data) {
            yield put(addNewCategorySuccess(resData.data.data));
        }
        ToastSuccess(resData.data.message);
    } catch (error) {
        const errs = error.response.data.message;
        yield put(addNewCategoryFailed(errs));
        ToastError(errs.name[0]);
    }
}

export function* categorySaga() {
  yield takeEvery(types.GET_ALL_CATEGORIES, getAllCategoriesSaga);
  yield takeEvery(types.GET_CATEGORY, getCategorySaga);
  yield takeEvery(types.ADD_CATEGORY, addNewCategorySaga);
  yield takeEvery(types.UPDATE_CATEGORY, updateCategorySaga);
  yield takeEvery(types.DELETE_CATEGORY, deleteCategorySaga);
}