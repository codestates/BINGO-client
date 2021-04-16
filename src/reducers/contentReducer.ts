import { SHOW_CONTENT } from "../action/index";
import { SHOW_NEWS_CONTENT } from "../action/index";
import { SHOW_MESSAGE_CONTENT } from "../action/index";
import { initialState } from "./initialState";

const contentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_CONTENT:
      console.log(action.payload);
      return Object.assign({}, state, {
        currentNgoId: action.payload,
      });

      case SHOW_NEWS_CONTENT:
        console.log(action.payload);
        return Object.assign({}, state, {
          currentNewsList: action.payload,
        });

      case SHOW_MESSAGE_CONTENT:
        console.log(action.payload);
        return Object.assign({}, state, {
          currentMessageList: action.payload,
        });
    default:
      return state;
  }
};
export default contentReducer;