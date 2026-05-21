import { configureStore } from "@reduxjs/toolkit";
import Authslice from "../../features/auth/auth.slice.js";
import chatslice from "../../features/chat/chat.slice.js";
export const store = configureStore({
  reducer: {
    Auth: Authslice,
    Chat: chatslice,
  },
});
