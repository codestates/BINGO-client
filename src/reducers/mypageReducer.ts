import { SHOW_MYPAGE } from "../action/index";

import { initialState } from "./initialState";

const mypageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_MYPAGE:
      return Object.assign({}, state, {
        mypageInfo: action.payload,
      });
      
    default:
      return state;
  }
};
export default mypageReducer;