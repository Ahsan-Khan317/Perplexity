import { createSlice } from "@reduxjs/toolkit";
import chatThunk from "./chat.thunk.js";
const chatSlice = createSlice({
  name: "chats",
  initialState: {
    isloading: false,
    issuccess: false,
    titles: null,
    messages: [],
  },

  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    newchat: (state) => {
      state.messages = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(chatThunk.allchat.pending, (state) => {
      state.isloading = true;
      state.issuccess = false;
    });

    builder.addCase(chatThunk.allchat.fulfilled, (state, action) => {
      state.isloading = false;
      state.issuccess = true;
      state.titles = action.payload;
    });

    builder.addCase(chatThunk.allchat.rejected, (state) => {
      state.isloading = false;
      state.issuccess = false;
    });

    builder.addCase(chatThunk.getMessage.pending, (state) => {
      state.isloading = true;
      state.issuccess = false;
    });

    builder.addCase(chatThunk.getMessage.fulfilled, (state, action) => {
      state.isloading = false;
      state.issuccess = true;
      state.messages = [];
      state.messages = action?.payload;
    });

    builder.addCase(chatThunk.getMessage.rejected, (state) => {
      state.isloading = false;
      state.issuccess = false;
    });
  },
});

export const { addMessage, newchat } = chatSlice.actions;
export default chatSlice.reducer;
