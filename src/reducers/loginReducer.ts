import { DO_LOGIN, CHANGE_USERINFO } from "../action/index";
import { initialState } from "./initialState";

const loginReducer = (state = initialState, action: any) => {
  
  switch (action.type) {
    case DO_LOGIN:
      return Object.assign({}, state, {
        loginInfo: action.payload,
      });

    case CHANGE_USERINFO:
      return Object.assign({}, state, {
        userInfo: action.payload,
      });
      
    default:
      return state;
  }
}

export default loginReducer;