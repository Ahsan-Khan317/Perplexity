import { LogIn } from "lucide-react";
import Api from "../../shared/Api/axiosInstance.js";
import axios from "axios";

const authApi = {
  signup: async (data) => {
    const response = await Api.post(import.meta.env.VITE_SIGNUP_API, data);
    return response.data;
  },

  login: async (data) => {
    const response = await Api.post(import.meta.env.VITE_LOGIN_API, data);
    return response.data;
  },
  get_me: async () => {
    const response = await Api.get(import.meta.env.VITE_GET_ME_API);
    return response.data;
  },
  logout: async () => {
    const response = await Api.get(import.meta.env.VITE_LOGOUT_API);
    return response.data;
    console.log(response.data);
  },
};

export default authApi;
