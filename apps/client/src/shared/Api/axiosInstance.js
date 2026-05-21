import axios from "axios";

import authApi from "../../features/auth/auth.api.js";

const Api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
const RefreshApi = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const refreshToken = async () => {
  const response = await RefreshApi.get(import.meta.env.VITE_Refresh_TOKEN_API);
  console.log(response?.data?.data?.accessToken);
  return response?.data?.data?.accessToken;
};

let accessToken = null;

export const SetAccessToken = (token) => {
  accessToken = token;
};

Api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

Api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();

        SetAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return Api(originalRequest);
      } catch (err) {
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default Api;
