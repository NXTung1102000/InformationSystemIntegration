import { ICreateProduct, IUpdateProduct } from "../constant/product/interface";
import { axiosAPI as api } from "./configAPI";

interface IParams {
  keyword: string | null | undefined;
  category: string | null | undefined;
  price_min: string | null | undefined;
  price_max: string | null | undefined;
}

const searchProduct = async (params: IParams) => {
  let url = `/product/search?`;
  const keys = Object.keys(params);
  keys.forEach((key) => {
    const value = params[key as keyof IParams];
    if (value) {
      url += `&${key}=${value}`;
    }
  });
  const result = await api({
    method: "GET",
    url,
  });
  return result;
};

const getProductByID = async (id: string) => {
  const detailProduct = await api({
    method: "GET",
    url: `/product/?id=${id}`,
  });
  return detailProduct;
};

const createProductAPI = async (product: ICreateProduct) => {
  console.log(product);
  const result = await api({
    method: "POST",
    url: "/product/",
    data: product,
  });
  return result;
};

const updateProductAPI = async (product: IUpdateProduct) => {
  console.log(product);
  const result = await api({
    method: "PUT",
    url: "/product/",
    data: product,
  });
  return result;
};

const deleteProductAPI = async (id: number) => {
  const result = await api({
    method: "DELETE",
    url: "/product/",
    data: id,
  });
  return result;
};

export { searchProduct, createProductAPI, updateProductAPI, deleteProductAPI, getProductByID };
