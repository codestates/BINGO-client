import { ANIMATE_TEST } from "../action/index";
import { initialState } from "./initialState";

const testReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ANIMATE_TEST:
      return Object.assign({}, state, {
        testList: state.testList.map((el, i) => i === action.payload.index ? { ...el, left: -100, opacity: 0 } : el)
      });
      
    default:
      return state;
  }
}

export default testReducer;