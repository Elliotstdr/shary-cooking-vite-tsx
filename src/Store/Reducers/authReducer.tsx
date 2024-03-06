const INITIAL_STATE: AuthState = {
  isConnected: false,
  token: null,
  refreshToken: null,
  userConnected: null,
  toast: null,
};

export const UPDATE_AUTH = "UPDATE_AUTH";

const authReducer = (state = INITIAL_STATE, action: any): AuthState => {
  switch (action.type) {
    case UPDATE_AUTH: {
      return {
        ...state,
        ...action.value,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
