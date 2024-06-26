import axios, { AxiosError, AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { store } from "../Store/store";

/**
 * @template { Object | Object[] } T
 * @param { string } url
 * @return { FetchGetReturn<T> }
 */
export const useFetchGet = <T extends object | object[]>(
  url: string
): UseFetchGetResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const token = store.getState().auth.token;

  useEffect(() => {
    url &&
      axios
        .get(`${import.meta.env.VITE_BASE_URL_API}/api${url}`, headers(token))
        .then((response: AxiosResponse) => {
          setData(response.data);
        })
        .catch((error: AxiosError) => setError(error.message))
        .finally(() => setLoaded(true));
  }, [url]);
  return { data, error, loaded };
};

export const fetchDelete = async (url: string): Promise<FetchResponse> => {
  let data = null;
  let error = null;
  const token = store.getState().auth.token;

  await axios
    .delete(`${import.meta.env.VITE_BASE_URL_API}/api${url}`, headers(token))
    .then((response) => (data = response.data))
    .catch((e) => (error = e));
  return { data, error };
};

export const fetchPost = async (
  url: string,
  payload: any,
  multipart = false,
  withCredentials = false
): Promise<FetchResponse> => {
  let data: any = null;
  let error: any = null;
  const token = store.getState().auth.token;

  await axios
    .post(
      `${import.meta.env.VITE_BASE_URL_API}/api${url}`,
      payload,
      headers(token, multipart, withCredentials)
    )
    .then((response: AxiosResponse) => {
      data = response.data;
    })
    .catch((e: AxiosError) => (error = e));
  return { data, error };
};

export const fetchGet = async (
  url: string,
  forcedToken: string | null = null
): Promise<FetchResponse> => {
  let data: any = null;
  let error: any = null;
  const token = forcedToken ?? store.getState().auth.token;

  await axios
    .get(`${import.meta.env.VITE_BASE_URL_API}/api${url}`, headers(token))
    .then((response: AxiosResponse) => {
      data = response.data;
    })
    .catch((e: AxiosError) => (error = e));
  return { data, error };
};

export const fetchPut = async (
  url: string,
  payload: any,
  multipart = false
): Promise<FetchResponse> => {
  let data = null;
  let error: any = null;
  const token = store.getState().auth.token;

  await axios
    .patch(
      `${import.meta.env.VITE_BASE_URL_API}/api${url}`,
      payload,
      headers(token, multipart)
    )
    .then((response: AxiosResponse) => {
      data = response.data;
    })
    .catch((e: AxiosError) => (error = e));
  return { data, error };
};

const headers = (
  token: string | null,
  multipart: boolean = false,
  withCredentials: boolean = false
) => {
  return {
    headers: token
      ? {
          accept: multipart ? "multipart/form-data" : "application/json",
          Authorization: `Bearer ${token}`,
        }
      : {
          accept: multipart ? "multipart/form-data" : "application/json",
        },
    withCredentials: withCredentials,
  };
};
