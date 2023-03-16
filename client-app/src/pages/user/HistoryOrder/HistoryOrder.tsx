import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrderOfCurrentUser } from "../../../api/order";
import { useAppDispatch } from "../../../app/hooks";
import { changeLoading } from "../../../component/LoadingAndNotice/loadingSlice";
import TableComponent from "../../../component/table/TableComponent";
import { dateToString } from "../../../util/convertDateTime";
import { colorStatus, getAllNameProduct } from "../../../util/utilsForOrder";
import { IResponseHistory } from "./responseData";

const header = ["ID - Order", "Date", "Total (vnd)", "Status", "Detail"];

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
        status: <Box color={colorStatus(item.status)}>{item.status}</Box>,
        detail: (
          <Box
            sx={{
              display: "flex",
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
