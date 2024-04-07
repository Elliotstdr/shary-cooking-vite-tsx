import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isConnected: false,
  token: null,
  refreshToken: null,
  userConnected: null,
  toast: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logOut: (state) => {
      return {
        ...initialState,
        toast: state.toast
      }
    }
  }
})

export const { updateAuth, logOut } = authSlice.actions
export default authSlice.reducer;
