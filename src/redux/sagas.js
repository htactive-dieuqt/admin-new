import { all } from "redux-saga/effects";
import { categorySaga } from "./category/saga";
import { districtSaga } from "./district/saga";
import { voucherSaga } from "./voucher/saga";
import { siteSaga } from "./site/saga";
import { adminSaga } from "./admin/saga";

export default function* rootSaga() {
  yield all([
    categorySaga(),
    districtSaga(),
    voucherSaga(),
    siteSaga(),
    adminSaga(),
  ]);
}
