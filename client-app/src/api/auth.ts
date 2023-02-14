import { IInputUser } from "../constant/user/interface";
import { axiosAPI as api } from "./configAPI";

const registerAPI = async (registerInfo: IInputUser) => {
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

export { registerAPI, loginAPI };
