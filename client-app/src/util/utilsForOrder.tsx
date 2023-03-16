import { Box, Typography } from "@mui/material";
import { USER } from "../constant/order/status";
import { IProduct } from "../pages/user/HistoryOrder/responseData";

export const colorStatus = (status: string) => {
  switch (status as USER) {
    case USER.DELIVERED:
      return "green";
    case USER.REJECTED:
      return "red";
    case USER.DELIVERING:
      return "blue";
    case USER.RETURNED:
      return "orange";
    default:
      return "";
  }
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
