import axios from "axios";
import { API_BASE_URL } from "../config";
import { getAccessToken } from "../util/localStorage";

const axiosAPI = axios.create({
  baseURL: API_BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300 * 1000,
});

axiosAPI.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    console.log(accessToken);
    if (accessToken !== "null") {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    console.log(config);
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        // store.dispatch(setError(error.response.data));
      } else if (error.response.status === 401) {
      } else if (error.response.status === 404) {
      } else if (error.response.status === 500) {
        // store.dispatch(setError({ code: "SERVER_ERROR" }));
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export { axiosAPI };
