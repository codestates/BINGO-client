// action types
export const DO_LOGIN = "DO_LOGIN";
export const PUSH_OPTION = "PUSH_OPTION";
export const CHANGE_OPTION_COLOR = "CHANGE_OPTION_COLOR";
export const CHANGE_TEST_VALUE = "CHANGE_OPTION_VALUE";
export const ANIMATE_TEST = "ANIMATE_TEST";
export const SHOW_LIST = "SHOW_LIST";
export const SHOWMODAL_PAY = "SHOWMODAL_PAY";
export const SHOWMESSAGE_PAY = "SHOWMESSAGE_PAY";

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

export const changeTestValue = (index: number, value: number) => {
  return {
    type: CHANGE_TEST_VALUE,
    payload: {
      index,
      value,
    }
  }
}

export const changeOptionColor = (index: number, color: string) => {
  return {
    type: CHANGE_OPTION_COLOR,
    payload: {
      index,
      color,
    },
  };
};

export const pushOption = (array: Array<number>) => {
  return {
    type: PUSH_OPTION,
    payload: {
      array,
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

export const showList = (data: Object) => {
  return {
    type: SHOW_LIST,
    payload: {
      data,
    },
  };
};

export const showPayModal = (modalDisplay: boolean) => {
  return {
    type: SHOWMODAL_PAY,
    payload: {
      modalDisplay,
    }
  }
}

export const showPostMessage = (messageDisplay: boolean) => {
  return {
    type: SHOWMESSAGE_PAY,
    payload: {
      messageDisplay,
    }
  }
}
