import { ICreateUser, IInputUser } from "../constant/user/interface";
import { axiosAPI as api } from "./configAPI";

const registerAPI = async (registerInfo: ICreateUser) => {
  const registerResult = await api({
    method: "POST",
    url: "/register",
    data: registerInfo,
  });
  return registerResult;
};

const loginAPI = async (credentials: IInputUser) => {
  const loginResult = await api({
    method: "POST",
    url: "/login",
    data: credentials,
  });
  return loginResult;
};

const forgetPasswordAPI = async (username: string, email: string) => {
  const forgetPasswordResult = await api({
    method: "POST",
    url: "/forget-pw",
    data: { username, email },
  });
  return forgetPasswordResult;
};

export { registerAPI, loginAPI, forgetPasswordAPI };
