import { axiosAPI as api } from "./configAPI";

export interface IInputProduct {
  product_id: number | string;
  quantity: number;
}
export interface IInputCart {
  data: IInputProduct[];
}

const getOrderOfCurrentUser = async (order_state_id?: number) => {
  const result = await api({
    method: "GET",
    url: order_state_id ? `/order/?order_state_id=${order_state_id}` : "/order/",
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
    url: "/order/update-state",
    data: { order_id, state: status },
  });
  return result;
};

export { getOrderOfCurrentUser, submitOrder, updateOrder };
