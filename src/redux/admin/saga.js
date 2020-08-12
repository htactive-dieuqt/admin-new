import { put, call, takeLatest } from 'redux-saga/effects';
import {
    loginRequest,
} from '../../api/admin';
import {
    loginSuccess,
    loginFailed
} from './action';
import * as types from './types';
import { ToastSuccess, ToastError } from '../../utils/toaster';

function* adminLoginSaga(action) {
    try {
        const resData = yield call(loginRequest, action.payload);
        if (resData.data.data) {
            yield put(loginSuccess(resData.data.data));
            window.localStorage.setItem('userToken', resData.data.data.token)
        }
        ToastSuccess(resData.data.message);
    } catch (error) {
        if(error.response.data){
            const errs = error.response.data.message;
            yield put(loginFailed(errs));
            ToastError(errs)
        }       
    }
}

export function* adminSaga() {
    yield takeLatest(types.LOGIN, adminLoginSaga);
}