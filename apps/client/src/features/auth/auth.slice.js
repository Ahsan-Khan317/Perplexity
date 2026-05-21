import authThunk from "./auth.thunk";
import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    data: null,
    isloading: false,
    isAuthenticated: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    //signup

    builder.addCase(authThunk.signup.pending, (state) => {
      state.isloading = true;
    });

    builder.addCase(authThunk.signup.fulfilled, (state, action) => {
      state.isloading = false;

      state.data = action.payload.data;
    });

    builder.addCase(authThunk.signup.rejected, (state, action) => {
      state.isloading = false;
    });

    //login

    builder.addCase(authThunk.login.pending, (state) => {
      state.isloading = true;
    });

    builder.addCase(authThunk.login.fulfilled, (state, action) => {
      state.isloading = false;
      state.data = action.payload.data;
      state.isAuthenticated = true;
    });

    builder.addCase(authThunk.login.rejected, (state, action) => {
      state.isloading = false;
    });

    //getme

    builder.addCase(authThunk.get_me.pending, (state) => {
      state.isloading = true;
    });

    builder.addCase(authThunk.get_me.fulfilled, (state, action) => {
      state.isloading = false;

      state.data = action.payload.data;
      state.isAuthenticated = true;
    });

    builder.addCase(authThunk.get_me.rejected, (state, action) => {
      state.isloading = false;
      state.isAuthenticated = false;
    });

    //logout

    builder.addCase(authThunk.logout.pending, (state) => {
      state.isloading = true;
    });

    builder.addCase(authThunk.logout.fulfilled, (state, action) => {
      state.isloading = false;
      state.data = null;
      state.isAuthenticated = false;
    });
  },
});

export default AuthSlice.reducer;
