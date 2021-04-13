// action types
export const DO_LOGIN = "DO_LOGIN";
export const ANIMATE_TEST = "ANIMATE_TEST";
export const SHOW_LIST = "SHOW_LIST";

// actions creator functions
export const doLogin = (accessToken: string) => {
  return {
    type: DO_LOGIN,
    payload: {
      isLogin: true,
      accessToken,
    },
  };
};

export const animateCard = (index: number) => {
  return {
    type: ANIMATE_TEST,
    payload: {
      index,
    },
  };
};

export const showList = (id: string) => {
  return {
    payload: {
      id,
    },
  };
};
