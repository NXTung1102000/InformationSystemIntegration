import { Box, Button, Card, CardActions, CardContent, List, Typography } from "@mui/material";
import { colorStatus, getAllNameProduct } from "../../../util/utilsForOrder";
import { dateToString } from "../../../util/convertDateTime";
import { IResponseHistory } from "../../user/HistoryOrder/responseData";
import React from "react";
import { USER } from "../../../constant/order/status";
import { updateOrder } from "../../../api/order";
import { useAppDispatch } from "../../../app/hooks";
import { changeNotice, INotice } from "../../../component/LoadingAndNotice/noticeSlice";

const exampleData: IResponseHistory[] = [
  {
    cart_id: 1,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 1,
        product_name: "ASUS TUF504",
        quantity: 2,
      },
      {
        product_id: 2,
        product_name: "Rank",
        quantity: 3,
      },
    ],
    first_name: "Tung",
    id: 1,
    last_name: "Nguyen",
    status: "delivered",
    total: 20754330.0,
    user_id: 1,
  },
  {
    cart_id: 2,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 1,
        product_name: "ASUS TUF504",
        quantity: 2,
      },
      {
        product_id: 2,
        product_name: "Rank",
        quantity: 3,
      },
    ],
    first_name: "Tung",
    id: 1,
    last_name: "Nguyen",
    status: "delivering",
    total: 20754330.0,
    user_id: 1,
  },
  {
    cart_id: 3,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 1,
        product_name: "ASUS TUF504",
        quantity: 2,
      },
      {
        product_id: 2,
        product_name: "Rank",
        quantity: 3,
      },
    ],
    first_name: "Tung",
    id: 1,
    last_name: "Nguyen",
    status: "rejected",
    total: 20754330.0,
    user_id: 1,
  },
  {
    cart_id: 4,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 1,
        product_name: "ASUS TUF504",
        quantity: 2,
      },
      {
        product_id: 2,
        product_name: "Rank",
        quantity: 3,
      },
    ],
    first_name: "Tung",
    id: 1,
    last_name: "Nguyen",
    status: "returned",
    total: 20754330.0,
    user_id: 1,
  },
];
const handleChangeStatus = (order_id: number, status: USER, dispatchStatus: (payload: INotice) => void) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  console.log(order_id, status);
  updateOrder(order_id, status as string)
    .then((req) => {
      return req.data;
    })
    .then((response) => {
      if (response.status === 0) {
        dispatchStatus({ message: "update successfully", open: true, type: "success" });
      } else {
        dispatchStatus({ message: response.message, open: true, type: "error" });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatchStatus({ message: "error server", open: true, type: "error" });
    });
};

const renderButton = (order_id: number, pre_status: string, dispatchStatus: (payload: INotice) => void) => {
  switch (pre_status) {
    case USER.DELIVERED:
      return (
        <>
          <Button
            variant="contained"
            color={"warning"}
            onClick={() => handleChangeStatus(order_id, USER.RETURNED, dispatchStatus)}
          >
            {USER.RETURNED}
          </Button>
        </>
      );
    case USER.DELIVERING:
      return (
        <>
          <Button
            variant="contained"
            color={"success"}
            onClick={() => handleChangeStatus(order_id, USER.DELIVERED, dispatchStatus)}
          >
            {USER.DELIVERED}
          </Button>
          <Button
            variant="contained"
            color={"error"}
            onClick={() => handleChangeStatus(order_id, USER.REJECTED, dispatchStatus)}
          >
            {USER.REJECTED}
          </Button>
        </>
      );
    case USER.REJECTED:
      return <></>;
    case USER.RETURNED:
      return <></>;
    default:
      break;
  }
};

const renderOrder = (data: IResponseHistory[], dispatchStatus: (payload: INotice) => void) => {
  return data?.map((item) => {
    return (
      <Card key={item.cart_id} sx={{ margin: "0 0 1rem 0" }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {`${item.first_name} ${item.last_name}`}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {`Date: ${dateToString(new Date(item.created_at))}`}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  height: "1.5rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography sx={{ margin: "0 .5rem 0 0" }}>Variation: </Typography> {getAllNameProduct(item.data)}
              </Box>
            </Box>
            <Box>
              <Typography sx={{ color: `${colorStatus(item.status)}`, textTransform: "uppercase" }}>
                {item.status}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ margin: "0 .5rem 0 0" }}>Total Order: </Typography>{" "}
                <Typography color="red" fontSize={"1.25rem"}>
                  {item.total}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          {renderButton(item.cart_id, item.status, dispatchStatus)}
        </CardActions>
      </Card>
    );
  });
};

export default function DetailOrder() {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<IResponseHistory[]>(exampleData);
  const dispatchStatus = (payload: INotice) => {
    dispatch(changeNotice(payload));
  };

  return <List>{renderOrder(data, dispatchStatus)}</List>;
}
