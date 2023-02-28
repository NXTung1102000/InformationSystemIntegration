import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrderOfCurrentUser } from "../../../api/order";
import { useAppDispatch } from "../../../app/hooks";
import { changeLoading } from "../../../component/LoadingAndNotice/loadingSlice";
import TableComponent from "../../../component/table/TableComponent";
import { USER } from "../../../constant/order/status";
import { dateToString } from "../../../util/convertDateTime";
import { IProduct, IResponseHistory } from "./responseData";

const header = ["ID - Order", "Date", "Total (vnd)", "Status", "Detail"];

const renderStatus = (status: string) => {
  switch (status as USER) {
    case USER.DELIVERED:
      return <Box color="green">{status}</Box>;
    case USER.REJECTED:
      return <Box color="red">{status}</Box>;
    case USER.DELIVERING:
      return <Box color="blue">{status}</Box>;
    case USER.RETURNED:
      return <Box color="orange">{status}</Box>;
    default:
      return <></>;
  }
};

const getAllNameProduct = (data: IProduct[]) => {
  let result = "";
  data.forEach((product, index) => {
    if (index !== data.length) {
      result = result + product.product_name + ", ";
    } else {
      result = result + product.product_name;
    }
  });
  return result;
};

const initData: IResponseHistory[] = [];

export default function HistoryOrder() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState(initData);
  useEffect(() => {
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
  }, [dispatch]);
  const mapData = () => {
    return data?.map((item) => {
      return {
        ID: item.cart_id,
        Date: dateToString(new Date(item.created_at)),
        total: item.total,
        status: renderStatus(item.status),
        detail: (
          <Box
            sx={{
              width: "15rem",
              height: "1.5rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {getAllNameProduct(item.data)}
          </Box>
        ),
      };
    });
  };
  return <TableComponent header={header} data={mapData()} />;
}
