import { IUpdateUser } from "./../constant/user/interface";
import { axiosAPI as api } from "./configAPI";

const getInfoUseAPI = async () => {
  const result = await api({
    method: "GET",
    url: "/user/",
  });
  return result;
};

const updateInfoUserAPI = async (updateInfo: IUpdateUser) => {
  const updateResult = await api({
    method: "PUT",
    url: "/user/",
    data: updateInfo,
  });
  return updateResult;
};

export { getInfoUseAPI, updateInfoUserAPI };
