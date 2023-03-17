import { IInputPolicy, TYPE_POLICY } from "../constant/policy/policy";
import { axiosAPI as api } from "./configAPI";

const getPolicyAPI = async () => {
  const result = await api({
    method: "GET",
    url: "/voucher/",
  });
  return result;
};

const changePolicyAPI = async (input: IInputPolicy) => {
  const result = await api({
    method: "PUT",
    url: "/voucher/",
    data: input,
  });
  return result;
};

export { getPolicyAPI, changePolicyAPI };
