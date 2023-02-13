import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loginAPI, registerAPI } from "../../api/auth";
import { IAuthState, IInputUser } from "../../constant/user/interface";
import { ROLE } from "../../constant/user/role";

const initialState: IAuthState = {
  accessToken: "",
  authority: ROLE.ROLE_UNKNOWN,
  user: {
    id: 0,
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
  },
};

export const LogInAsync = createAsyncThunk("auth/login", async (user: IInputUser) => {
  const response = await loginAPI(user);
  return response.data.data;
});

export const RegisterAsync = createAsyncThunk("auth/register", async (user: IInputUser) => {
  const response = await registerAPI(user);
  return response.data.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LogOut: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(LogInAsync.pending, (state) => {
        // console.log(state)
      })
      .addCase(LogInAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.authority = action.payload.authority;
        state.user = action.payload.user;
        // console.log(state, action);
      })
      .addCase(LogInAsync.rejected, (state) => {
        // console.log(state);
      });

    // register
    builder
      .addCase(RegisterAsync.pending, (state) => {
        // console.log(state);
      })
      .addCase(RegisterAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        // console.log(state, action);
      })
      .addCase(RegisterAsync.rejected, (state) => {
        // console.log(state);
      });
  },
});

export const { LogOut } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
