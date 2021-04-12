import { combineReducers } from 'redux';
import loginReducer from "./loginReducer"
import testReducer from "./testReducer"

const rootReducer = combineReducers({
  loginReducer, testReducer,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
