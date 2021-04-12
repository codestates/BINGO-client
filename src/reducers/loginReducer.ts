import { DO_LOGIN } from "../action/index";
import { initialState } from "./initialState";

const loginReducer = (state = initialState, action: any) => {
  
  switch (action.type) {
    case DO_LOGIN:
      console.log(action.payload)
      return Object.assign({}, state, {
        loginInfo: action.payload,
      });
      
    default:
      return state;
  }
}

export default loginReducer;