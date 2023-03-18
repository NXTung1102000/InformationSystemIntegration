import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrderOfCurrentUser, updateOrder } from "../../../api/order";
import { useAppDispatch } from "../../../app/hooks";
import { changeLoading } from "../../../component/LoadingAndNotice/loadingSlice";
import TableComponent from "../../../component/table/TableComponent";
import { dateToString } from "../../../util/convertDateTime";
import { colorStatus, getAllNameProduct, getNameStatus } from "../../../util/utilsForOrder";
import { IResponseHistory } from "./responseData";
import { USER } from "../../../constant/order/status";
import { changeNotice } from "../../../component/LoadingAndNotice/noticeSlice";
import CancelOrderDialog from "./CancelOrderDialog";
const header = ["ID - Order", "Date", "Total (vnd)", "Status", "Detail", "Action"];

const initData: IResponseHistory[] = [];

export default function HistoryOrder() {
  const [openCancel, setOpenCancel] = useState(false);
  const dispatch = useAppDispatch();
  const [data, setData] = useState(initData);
  const [orderIsClick, setOrderIdClick] = useState(0);

  const refreshData = () => {
    dispatch(changeLoading(true));
    getOrderOfCurrentUser()
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setData(data.data);
        dispatch(changeLoading(false));
      })
      .catch((error) => {
        dispatch(changeLoading(false));
        console.log(error);
      });
  };
  useEffect(() => {
    refreshData();
  }, [dispatch]);

  const renderAction = (status: number, order_id: number) => {
    if ((status as USER) === USER.DELIVERING) {
      return (
        <>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => {
              setOpenCancel(true);
              setOrderIdClick(order_id);
            }}
          >
            Cancel
          </Button>
        </>
      );
    }
    return <></>;
  };

  const handleReturnProduct = (order_id: number) => {
    console.log("in delete", order_id);

    updateOrder(order_id, USER.CANCEL)
      .then((response) => {
        console.log("res", response);
        return response.data;
      })
      .then((response) => {
        if (response.status === 0) {
          console.log("res", response);
          dispatch(changeNotice({ message: "update successfully", open: true, type: "success" }));
        } else {
          dispatch(changeNotice({ message: response.error, open: true, type: "error" }));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(changeNotice({ message: err.message, open: true, type: "error" }));
      });

    refreshData();
    setOpenCancel(false);
  };

  const mapData = () => {
    return data?.map((item) => {
      return {
        ID: item.id,
        Date: dateToString(new Date(item.created_date)),
        total: item.total,
        status: <Box color={colorStatus(item.order_state_id)}>{getNameStatus(item.order_state_id)}</Box>,
        detail: <Box>{getAllNameProduct(item.data)}</Box>,
        action: <Box>{renderAction(item.order_state_id, item.id)}</Box>,
      };
    });
  };
  return (
    <>
      <TableComponent header={header} data={mapData()} />

      <CancelOrderDialog
        open={openCancel}
        setOpen={setOpenCancel}
        id_order={orderIsClick}
        handleCancelOrder={handleReturnProduct}
      />
    </>
  );
}
