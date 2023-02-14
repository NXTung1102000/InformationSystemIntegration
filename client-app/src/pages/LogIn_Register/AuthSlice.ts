import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loginAPI, registerAPI } from "../../api/auth";
import { IAuthState, IInputUser } from "../../constant/user/interface";
import { ROLE } from "../../constant/user/role";

const initialState: IAuthState = {
  token: null,
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
    LogInUser: (state, action) => {
      state.token = action.payload.token;
    },
    LogOutUser: () => {
      return initialState;
    },
  },
});

export const { LogOutUser, LogInUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
