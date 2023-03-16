import { axiosAPI as api } from "./configAPI";

const getPolicyAPI = async () => {
  const result = await api({
    method: "GET",
    url: "/policy",
  });
  return result;
};

const changePolicyAPI = async () => {
  const result = await api({
    method: "PUT",
    url: "/policy",
    data: {},
  });
  return result;
};

export { getPolicyAPI, changePolicyAPI };
