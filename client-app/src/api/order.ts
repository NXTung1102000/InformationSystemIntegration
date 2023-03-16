import { axiosAPI as api } from "./configAPI";

export interface IInputProduct {
  product_id: number | string;
  quantity: number;
}
export interface IInputCart {
  data: IInputProduct[];
}

const getOrderOfCurrentUser = async () => {
  const result = await api({
    method: "GET",
    url: "/order/",
  });
  return result;
};

const submitOrder = async (inputCart: IInputCart) => {
  const result = await api({
    method: "POST",
    url: "/order/",
    data: inputCart,
  });
  return result;
};

const updateOrder = async (order_id: number, status: number) => {
  const result = await api({
    method: "PUT",
    url: "/order/update-status",
    data: { order_id, status },
  });
  return result;
};

export { getOrderOfCurrentUser, submitOrder, updateOrder };
