import axios from "axios";
import { store } from "../Store/store";
import { updateAuth } from "../Store/Reducers/authReducer";
import { useEffect, useState } from "react";

export const logOut = () => {
  store.dispatch(updateAuth({
    token: null,
    refreshToken: null,
    isConnected: false,
    userConnected: null,
  }));
}

export const useAxiosInterceptors = () => {
  const [isInterceptorActive, setIsInterceptorActive] = useState(false)

  useEffect(() => {
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
                if (res.status === 200) {
                  store.dispatch(updateAuth({
                    token: res.data.token,
                  }));
                  originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
                  return axios(originalRequest);
                }
              })
              .catch((err) => {
                logOut();
                return Promise.reject(err);
              })
              .finally(() => refreshTokenRequest = null);
          }
        }
        return Promise.reject(error);
      }
    );
    setIsInterceptorActive(true)
  }, []);
  
  return isInterceptorActive
};