import authApi from "./auth.api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

const authThunk = {
  signup: createAsyncThunk("signup", async (data, thunkApi) => {
    try {
      const response = await authApi.signup(data);
      return response;
    } catch (err) {
      return thunkApi?.rejectWithValue(err?.response?.data?.message || "signup failed");
    }
  }),

  login: createAsyncThunk(
    "login",

    async (data, thunkApi) => {
      try {
        const response = await authApi.login(data);

        return response;
      } catch (err) {
        console.log(err);
        return thunkApi.rejectWithValue(err?.response?.data?.message);
      }
    },
  ),

  get_me: createAsyncThunk("get_me", async (_, thunkApi) => {
    try {
      const response = await authApi.get_me();
      return response;
    } catch (err) {
      return thunkApi.rejectWithValue(err?.response?.data?.message);
    }
  }),
  logout: createAsyncThunk("logout", async (_, thunkApi) => {
    try {
      const response = await authApi.logout();
      return response;
    } catch (err) {
      return thunkApi.rejectWithValue(err?.response?.data?.message);
    }
  }),
};

export default authThunk;
