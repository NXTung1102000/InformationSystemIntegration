import { axiosAPI as api } from "./configAPI";

interface IParams {
  keyword: string | null;
  category: string | null;
}

const searchProduct = async (params: IParams) => {
  let url = `/product/search?`;
  const keys = Object.keys(params);
  keys.forEach((key) => {
    const value = params[key as keyof IParams];
    if (value) {
      url += `${key}=${value}`;
    }
  });
  const result = await api({
    method: "GET",
    url,
  });
  return result;
};

export { searchProduct };
