import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import testReducer from "./testReducer";
import listReducer from "./listReducer";
import payReducer from "./payReducer";
import contentReducer from "./contentReducer"

const rootReducer = combineReducers({
  loginReducer,
  testReducer,
  listReducer,
  payReducer,
  contentReducer,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
