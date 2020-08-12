import { combineReducers } from "redux";
import categoryReducer from "./category/reducer";
import districtReducer from "./district/reducer";
import voucherReducer from "./voucher/reducer";
import siteReducer from "./site/reducer";
import adminReducer from "./admin/reducer";

const reducers = combineReducers({
  category: categoryReducer,
  district: districtReducer,
  voucher: voucherReducer,
  site: siteReducer,
  admin: adminReducer,
});

export default reducers;
