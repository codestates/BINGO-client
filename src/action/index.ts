import { access } from "node:fs";

// action types
export const DO_LOGIN = "DO_LOGIN";

// actions creator functions
export const isLogin = (accessToken: string) => {
  return {
    type: DO_LOGIN,
    payload: {
      isLogin: true,
      accessToken,
    }
  }
}