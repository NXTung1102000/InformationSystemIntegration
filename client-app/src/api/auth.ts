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

const changePasswordAPI = async (oldPW: string, newPW: string) => {
  const result = await api({
    method: "POST",
    url: "/forget-pw",
    data: { oldPW, newPW },
  });
  return result;
};

export { registerAPI, loginAPI, forgetPasswordAPI, changePasswordAPI };
