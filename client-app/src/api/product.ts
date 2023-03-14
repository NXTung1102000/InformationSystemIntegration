import { ICreateProduct, IUpdateProduct } from "../constant/product/interface";
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

const createProductAPI = async (product: ICreateProduct) => {
  const result = await api({
    method: "POST",
    url: "/product",
    data: product,
  });
  return result;
};

const updateProductAPI = async (product: IUpdateProduct) => {
  const result = await api({
    method: "PUT",
    url: "/product",
    data: product,
  });
  return result;
};

const deleteProductAPI = async (id: number) => {
  const result = await api({
    method: "PUT",
    url: "/product",
    data: id,
  });
  return result;
};

export { searchProduct, createProductAPI, updateProductAPI, deleteProductAPI };
