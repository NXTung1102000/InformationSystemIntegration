import { Box, Button, Card, CardActions, CardContent, List, Typography } from "@mui/material";
import { colorStatus, getAllNameProduct, getNameStatus } from "../../../util/utilsForOrder";
import { dateToString } from "../../../util/convertDateTime";
import { IResponseHistory } from "../../user/HistoryOrder/responseData";
import React from "react";
import { USER } from "../../../constant/order/status";
import { getOrderOfCurrentUser, updateOrder } from "../../../api/order";
import { useAppDispatch } from "../../../app/hooks";
import { changeNotice, INotice } from "../../../component/LoadingAndNotice/noticeSlice";
import { changeLoading } from "../../../component/LoadingAndNotice/loadingSlice";

const handleChangeStatus = (order_id: number, status: USER, dispatchStatus: (payload: INotice) => void) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  updateOrder(order_id, status)
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

const renderButton = (order_id: number, pre_status: number, dispatchStatus: (payload: INotice) => void) => {
  switch (pre_status) {
    case USER.DELIVERED:
      return (
        <>
          <Button
            variant="contained"
            color={"warning"}
            onClick={() => handleChangeStatus(order_id, USER.RETURNED, dispatchStatus)}
          >
            {getNameStatus(USER.RETURNED)}
          </Button>
          <Button
            variant="contained"
            color={"success"}
            onClick={() => handleChangeStatus(order_id, USER.RETURNED, dispatchStatus)}
          >
            {getNameStatus(USER.SUCCESS)}
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
            {getNameStatus(USER.DELIVERED)}
          </Button>
          <Button
            variant="contained"
            color={"error"}
            onClick={() => handleChangeStatus(order_id, USER.REJECTED, dispatchStatus)}
          >
            {getNameStatus(USER.REJECTED)}
          </Button>
        </>
      );
    case USER.REJECTED:
    case USER.RETURNED:
    case USER.CANCEL:
      return <></>;
    default:
      break;
  }
};

const renderOrder = (data: IResponseHistory[], dispatchStatus: (payload: INotice) => void) => {
  return data?.map((item) => {
    return (
      <Card key={item.id} sx={{ margin: "0 0 1rem 0" }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {`${item.first_name} ${item.last_name}`}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {`Date: ${dateToString(new Date(item.created_date))}`}
              </Typography>
              <Box>
                <Typography sx={{ margin: "0.5rem .5rem 0 0" }}>Detail: </Typography> {getAllNameProduct(item.data)}
              </Box>
            </Box>
            <Box>
              <Typography sx={{ color: `${colorStatus(item.order_state_id)}`, textTransform: "uppercase" }}>
                {getNameStatus(item.order_state_id)}
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
          {renderButton(item.id, item.order_state_id, dispatchStatus)}
        </CardActions>
      </Card>
    );
  });
};

export default function DetailOrder({ status }: { status: number }) {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<IResponseHistory[]>([]);
  const dispatchStatus = (payload: INotice) => {
    dispatch(changeNotice(payload));
  };

  React.useEffect(() => {
    dispatch(changeLoading(true));
    getOrderOfCurrentUser(status)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        setData(response.data);
        dispatch(changeLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(changeLoading(false));
      });
  }, [dispatch, status]);

  return <List>{renderOrder(data, dispatchStatus)}</List>;
}
