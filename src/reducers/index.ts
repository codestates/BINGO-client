import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import testReducer from "./testReducer";
import listReducer from "./listReducer";
import payReducer from "./payReducer";
import contentReducer from "./contentReducer"
import mypageReducer from "./mypageReducer"

const rootReducer = combineReducers({
  loginReducer,
  testReducer,
  listReducer,
  payReducer,
  contentReducer,
  mypageReducer,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
