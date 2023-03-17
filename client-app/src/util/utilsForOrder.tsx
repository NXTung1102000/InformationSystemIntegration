import { Box } from "@mui/material";
import { USER } from "../constant/order/status";
import { IInputPolicy, TYPE_POLICY } from "../constant/policy/policy";
import { IProduct } from "../pages/user/HistoryOrder/responseData";

export const colorStatus = (status: number) => {
  switch (status as USER) {
    case USER.DELIVERED:
      return "green";
    case USER.REJECTED:
    case USER.CANCEL:
      return "red";
    case USER.DELIVERING:
      return "blue";
    case USER.RETURNED:
      return "orange";
    default:
      return "";
  }
};

export const getNameStatus = (status: number) => {
  switch (status as USER) {
    case USER.DELIVERED:
      return "Delivered";
    case USER.REJECTED:
      return "Rejected";
    case USER.CANCEL:
      return "canceled";
    case USER.DELIVERING:
      return "Delivering";
    case USER.RETURNED:
      return "Returned";
    default:
      return "";
  }
};

export const calculateOrder = (pre_total: number, policy: IInputPolicy) => {
  let res;
  if (pre_total < policy.threshold) res = pre_total;
  else if (policy.voucher_type_id === TYPE_POLICY.FIXED) res = pre_total - policy.value;
  else res = pre_total * (1 - policy.value);

  return res;
};

export const getAllNameProduct = (data: IProduct[]) => {
  // let result = "";
  // data.forEach((product, index) => {
  //   if (index !== data.length) {
  //     result = result + `${product.product_name} x${product.quantity}, `;
  //   } else {
  //     result = result + product.product_name;
  //   }
  // });
  // return result;
  return data?.map((product) => (
    <Box key={product.product_id} sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      {product.product_name}
      <Box sx={{ color: "red", margin: "0 .25rem" }}>{` x${product.quantity}`}</Box>
      {" ; "}
    </Box>
  ));
};
