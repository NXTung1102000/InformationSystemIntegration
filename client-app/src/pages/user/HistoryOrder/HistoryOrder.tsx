import { Box } from "@mui/material";
import TableComponent from "../../../component/table/TableComponent";
import { USER } from "../../../constant/order/status";
import { dateToString } from "../../../util/convertDateTime";

const header = ["ID - Order", "Date", "Total (vnd)", "Status", "Detail"];
const randomDate = (start: Date, end: Date) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return dateToString(date);
};
const data = [
  {
    id: "laptop-1",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "success",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-2",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "rejected",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-3",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "delivering",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-4",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "returned",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-5",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "returned",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-6",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "success",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-7",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "success",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-8",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "success",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-9",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "success",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-11",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "rejected",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-12",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "success",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-13",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "success",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-14",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "rejected",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-15",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "rejected",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-16",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "success",
    detail: "ss note20, macbook, key, returnedre turnedreturne dreturnedreturn edreturned",
  },
  {
    id: "laptop-17",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "rejected",
    detail: "ss note20, macbook, key, returnedret urnedreturned returnedretur nedreturned",
  },
  {
    id: "laptop-18",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "success",
    detail: "ss note20, macbook, key",
  },
  {
    id: "laptop-19",
    date: randomDate(new Date(2022, 12, 30), new Date()),
    total: (Math.floor(Math.random() * 100) + 1) * 100000,
    status: "success",
    detail: "ss note20, macbook, key",
  },
];

const renderStatus = (status: string) => {
  switch (status as USER) {
    case USER.SUCCESS:
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

export default function HistoryOrder() {
  const mapData = () => {
    return data.map((item) => {
      return {
        ...item,
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
            {item.detail}
          </Box>
        ),
      };
    });
  };
  return <TableComponent header={header} data={mapData()} />;
}
