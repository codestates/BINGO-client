import { DO_LOGIN, CHANGE_USERINFO, ADD_LOVE, DELETE_LOVE } from "../action/index";
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

    case ADD_LOVE:
      return Object.assign({}, state, {
        userInfo: {
          ...state.userInfo,
          ngoIdOfLoveList: [...state.userInfo.ngoIdOfLoveList, action.payload]
        }
      });

    case DELETE_LOVE:
      return Object.assign({}, state, {
        userInfo: {
          ...state.userInfo,
          ngoIdOfLoveList: state.userInfo.ngoIdOfLoveList.filter(el => el !== action.payload)
        }
      })
      
    default:
      return initialState;
  }
}

export default loginReducer;