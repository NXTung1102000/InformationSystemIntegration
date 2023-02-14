import { axiosAPI as api } from "./configAPI";

const getAllCategory = async () => {
  const registerResult = await api({
    method: "GET",
    url: "/product",
  });
  return registerResult;
};

export { getAllCategory };
