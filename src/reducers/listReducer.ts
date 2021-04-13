import { SHOW_LIST } from "../action/index";
import { initialState } from "./initialState";

const listReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_LIST:
      console.log(action.payload);
      return Object.assign({}, state, {
        listInfo: action.payload,
      });
    default:
      return state;
  }
};
export default listReducer;
