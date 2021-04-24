// action types
export const DO_LOGIN = "DO_LOGIN";
export const PUSH_OPTION = "PUSH_OPTION";
export const CHANGE_OPTION_COLOR = "CHANGE_OPTION_COLOR";
export const CHANGE_TEST_VALUE = "CHANGE_OPTION_VALUE";
export const ANIMATE_TEST = "ANIMATE_TEST";
export const SHOW_LIST = "SHOW_LIST";
export const SHOWMODAL_PAY = "SHOWMODAL_PAY";
export const SHOWMESSAGE_PAY = "SHOWMESSAGE_PAY";
export const SHOW_CONTENT = "SHOW_CONTENT"
export const SHOW_NEWS_CONTENT = "SHOW_NEWS_CONTENT"
export const SHOW_MESSAGE_CONTENT = "SHOW_MESSAGE_CONTENT"
export const SHOWMODAL_CONTENT = "SHOWMODAL_CONTENT";
export const CHANGE_LIST_CATEGORY = "CHANGE_LIST_CATEGORY";
export const SHOW_MYPAGE = "SHOW_MYPAGE"
export const SHOW_MYPAGE_MODAL = "SHOW_MYPAGE_MODAL"
export const CHANGE_USERINFO = "CHANGE_USERINFO";
export const SHOW_MY_PROFILE_EDIT_MODAL = "SHOW_MY_PROFILE_EDIT_MODAL";
export const ADD_LOVE = "ADD_LOVE";
export const DELETE_LOVE = "DELETE_LOVE";
export const LOGOUT = "LOGOUT";


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

export const changeList = (category: string) => {
  return {
    type: CHANGE_LIST_CATEGORY,
    payload: {
      category,
    }
  }
}

export const showPayModal = (modalDisplay: boolean, money: number) => {
  return {
    type: SHOWMODAL_PAY,
    payload: {
      modalDisplay,
      money,
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

export const showContent = (ngoId: number) => {
  return {
    type: SHOW_CONTENT,
    payload: {
      ngoId,
    }
  }
}

export const showNewsContent = (newsList: Array<Object>) => {
  return {
    type: SHOW_NEWS_CONTENT,
    payload: {
      newsList,
    }
  }
}


export const showMessageContent = (messageList: Array<Object>) => {
  return {
    type: SHOW_MESSAGE_CONTENT,
    payload: {
      messageList,
    }
  }
}

export const showcontentModal = (modalDisplay: boolean) => {
  return {
    type: SHOWMODAL_CONTENT,
    payload: {
      modalDisplay,

    }
  }
}

export const showMypage = (mypageInfo: Object) => {
  return {
    type: SHOW_MYPAGE,
    payload: {
      mypageInfo,
    }
  }
}

export const showMypageModal = (modalDisplay: boolean, ngoName: string, donateId: number) => {
  return {
    type: SHOW_MYPAGE_MODAL,
    payload: {
      modalDisplay,
      ngoName,
      donateId,
    }
  }
}

export const changeUserInfo = (userData: any) => {
  return {
    type: CHANGE_USERINFO,
    payload: userData,
  };
};

export const showMyProfileEditModal = (modalDisplay: boolean) => {
  return {
    type: SHOW_MY_PROFILE_EDIT_MODAL,
    payload: {
      modalDisplay,
    }
  }
}

export const addLove = (ngoId: number) => {
  return {
    type: ADD_LOVE,
    payload: ngoId,
  };
};

export const deleteLove = (ngoId: number) => {
  return {
    type: DELETE_LOVE,
    payload: ngoId,
  };
};

export const logoutState = () => {
  return {
    type: LOGOUT,
  };
};