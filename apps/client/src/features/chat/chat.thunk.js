import chatApi from "./chat.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const chatThunk = {
  allchat: createAsyncThunk("allchat", async (_, thunkApi) => {
    try {
      const response = await chatApi.allchat();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }),
  getMessage: createAsyncThunk("getMessage", async (chatid, thunkApi) => {
    try {
      const response = await chatApi.getMessage(chatid);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }),

  sendMessage: createAsyncThunk("sendMessage", async (data, thunkApi) => {
    try {
      const response = await chatApi.sendMessage(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }),

  deletechat: createAsyncThunk("delete/chat", async (id, thunkApi) => {
    try {
      const response = await chatApi.deletechat(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data?.message);
    }
  }),
};

export default chatThunk;
