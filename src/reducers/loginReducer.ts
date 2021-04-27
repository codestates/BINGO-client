import { DO_LOGIN, CHANGE_USERINFO, ADD_LOVE, DELETE_LOVE, LOGOUT } from "../action/index";
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

    case LOGOUT:
      return Object.assign({}, state, {
        userInfo: {
          userId: 1,
          username: "체험 유저",
          profileImage: "https://i.imgur.com/FP3hraO.png",
          level: "새싹",
          accessToken: "accessToken",
          ngoIdOfLoveList: []
        }
      })
      
    default:
      return state;
  }
}

export default loginReducer;