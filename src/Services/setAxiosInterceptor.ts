import axios from "axios";
import { store } from "../Store/store";
import { UPDATE_AUTH } from "../Store/Reducers/authReducer";

const updateAuth = (value: Partial<AuthState>) => {
  return {
    type: UPDATE_AUTH,
    value
  }
}

export const logOut = () => {
  store.dispatch(updateAuth({
    token: null,
    refreshToken: null,
    isConnected: false,
    userConnected: null,
  }));
}

export const setupAxiosInterceptors = () => {
  let refreshTokenRequest: Promise<any> | null = null;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error.response?.data?.message;
      const status = error.response?.status;
      if (status === 401 && message === "Expired JWT Token") {
        const originalRequest = error.config;
        originalRequest._retry = true;

        if(!refreshTokenRequest) {
          refreshTokenRequest = axios.post(
            `${import.meta.env.VITE_BASE_URL_API}/api/token/refresh`,
            {
              refresh_token: store.getState().auth.refreshToken
            },
          )
          
          return refreshTokenRequest
            .then((res) => {
              refreshTokenRequest = null;
              if (res.status === 200) {
                store.dispatch(updateAuth({
                  token: res.data.token,
                }));
                originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
                return axios(originalRequest);
              }
            })
            .catch((err) => {
              refreshTokenRequest = null;
              logOut();
              return Promise.reject(err);
            });
        }
      }
      return Promise.reject(error);
    }
  );
};