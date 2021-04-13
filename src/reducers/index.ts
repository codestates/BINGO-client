import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import testReducer from "./testReducer";
import listReducer from "./listReducer";

const rootReducer = combineReducers({
  loginReducer,
  testReducer,
  listReducer,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
