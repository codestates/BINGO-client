import { SHOW_LIST, CHANGE_LIST_CATEGORY } from "../action/index";
import { initialState } from "./initialState";

const listReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_LIST:
      console.log(action.payload);
      return Object.assign({}, state, {
        listInfo: action.payload,
      });

      case CHANGE_LIST_CATEGORY:
        return Object.assign({}, state, {
          listInfoCategory: action.payload
        })

    default:
      return state;
  }
};
export default listReducer;
