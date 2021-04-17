import { SHOW_MYPAGE } from "../action/index";
import { SHOW_MYPAGE_MODAL } from "../action/index";

import { initialState } from "./initialState";

const mypageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_MYPAGE:
      return Object.assign({}, state, {
        mypageInfo: action.payload,
      });

    case SHOW_MYPAGE_MODAL:
      return Object.assign({}, state, {
        myModalInfo: action.payload,
      });
      
    default:
      return state;
  }
};
export default mypageReducer;