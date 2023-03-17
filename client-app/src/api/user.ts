import { ICreateUser } from "../constant/user/interface";
import { axiosAPI as api } from "./configAPI";

const getInfoUseAPI = async () => {
  const result = await api({
    method: "GET",
    url: "/user/",
  });
  return result;
};

const updateInfoUserAPI = async (updateInfo: ICreateUser) => {
  const updateResult = await api({
    method: "POST",
    url: "/user/",
    data: updateInfo,
  });
  return updateResult;
};

export { getInfoUseAPI, updateInfoUserAPI };
