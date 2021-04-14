import { SHOWMODAL_PAY, SHOWMESSAGE_PAY } from "../action/index";
import { initialState } from "./initialState";

const payReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case SHOWMODAL_PAY:
      return Object.assign({}, state, {
        payModalInfo: action.payload,
      });

      case SHOWMESSAGE_PAY:
        return Object.assign({}, state, {
          payMessageInfo: action.payload,
        });

      default:
      return state;
  }
}

export default payReducer;