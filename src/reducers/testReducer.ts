import { ANIMATE_TEST, PUSH_OPTION, CHANGE_OPTION_COLOR, CHANGE_TEST_VALUE } from "../action/index";
import { initialState } from "./initialState";

const testReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PUSH_OPTION:
      return Object.assign({}, state, {
        selectedOptions: action.payload.array
      });

    case CHANGE_TEST_VALUE:
      return Object.assign({}, state, {
        testList: state.testList.map((el, i) => i === action.payload.index ? { ...el, value: action.payload.value } : el)
      });

    case CHANGE_OPTION_COLOR:
      return Object.assign({}, state, {
        optionList: state.optionList.map((el, i) => i === action.payload.index ? { ...el, color: action.payload.color } : el)
      });

    case ANIMATE_TEST:
      return Object.assign({}, state, {
        testList: state.testList.map((el, i) => i === action.payload.index ? { ...el, left: -100, opacity: 0 } : el)
      });
      
    default:
      return initialState;
  }
}

export default testReducer;