import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrderOfCurrentUser } from "../../../api/order";
import TableComponent from "../../../component/table/TableComponent";
import { USER } from "../../../constant/order/status";
import { dateToString } from "../../../util/convertDateTime";

const header = ["ID - Order", "Date", "Total (vnd)", "Status", "Detail"];
const testData = [
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
        product_id: 5,
        product_name: "Hatity",
        quantity: 1,
      },
      {
        product_id: 8,
        product_name: "Asoka",
        quantity: 1,
      },
      {
        product_id: 7,
        product_name: "It",
        quantity: 1,
      },
    ],
    first_name: "Tung",
    id: 2,
    last_name: "Nguyen",
    status: "delivered",
    total: 67750900.0,
    user_id: 1,
  },
  {
    cart_id: 3,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 2,
        product_name: "Rank",
        quantity: 1,
      },
      {
        product_id: 6,
        product_name: "Andalax",
        quantity: 1,
      },
      {
        product_id: 19,
        product_name: "Viva",
        quantity: 1,
      },
    ],
    first_name: "Tung",
    id: 3,
    last_name: "Nguyen",
    status: "rejected",
    total: 34780870.0,
    user_id: 1,
  },
  {
    cart_id: 4,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 5,
        product_name: "Hatity",
        quantity: 1,
      },
      {
        product_id: 18,
        product_name: "Trippledex",
        quantity: 1,
      },
      {
        product_id: 13,
        product_name: "Y-Solowarm",
        quantity: 1,
      },
    ],
    first_name: "Tung",
    id: 4,
    last_name: "Nguyen",
    status: "rejected",
    total: 69947600.0,
    user_id: 1,
  },
  {
    cart_id: 5,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 10,
        product_name: "Biodex",
        quantity: 1,
      },
      {
        product_id: 20,
        product_name: "Aerified",
        quantity: 2,
      },
      {
        product_id: 16,
        product_name: "Bamity",
        quantity: 3,
      },
    ],
    first_name: "Tung",
    id: 5,
    last_name: "Nguyen",
    status: "delivering",
    total: 136505100.0,
    user_id: 1,
  },
  {
    cart_id: 6,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 4,
        product_name: "Wrapsafe",
        quantity: 1,
      },
      {
        product_id: 21,
        product_name: "Span",
        quantity: 2,
      },
      {
        product_id: 16,
        product_name: "Bamity",
        quantity: 1,
      },
    ],
    first_name: "Tung",
    id: 6,
    last_name: "Nguyen",
    status: "delivering",
    total: 38125420.0,
    user_id: 1,
  },
  {
    cart_id: 7,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 4,
        product_name: "Wrapsafe",
        quantity: 1,
      },
      {
        product_id: 21,
        product_name: "Span",
        quantity: 2,
      },
    ],
    first_name: "Tung",
    id: 7,
    last_name: "Nguyen",
    status: "delivering",
    total: 16196120.0,
    user_id: 1,
  },
  {
    cart_id: 8,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 11,
        product_name: "Veribet",
        quantity: 3,
      },
    ],
    first_name: "Tung",
    id: 8,
    last_name: "Nguyen",
    status: "delivered",
    total: 19141680.0,
    user_id: 1,
  },
  {
    cart_id: 9,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 11,
        product_name: "Veribet",
        quantity: 1,
      },
      {
        product_id: 4,
        product_name: "Wrapsafe",
        quantity: 1,
      },
      {
        product_id: 20,
        product_name: "Aerified",
        quantity: 2,
      },
      {
        product_id: 14,
        product_name: "Zoolab",
        quantity: 1,
      },
    ],
    first_name: "Tung",
    id: 9,
    last_name: "Nguyen",
    status: "rejected",
    total: 80188090.0,
    user_id: 1,
  },
  {
    cart_id: 10,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 5,
        product_name: "Hatity",
        quantity: 1,
      },
      {
        product_id: 8,
        product_name: "Asoka",
        quantity: 2,
      },
      {
        product_id: 12,
        product_name: "Sonair",
        quantity: 1,
      },
      {
        product_id: 13,
        product_name: "Y-Solowarm",
        quantity: 2,
      },
    ],
    first_name: "Tung",
    id: 10,
    last_name: "Nguyen",
    status: "rejected",
    total: 129795400.0,
    user_id: 1,
  },
  {
    cart_id: 11,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 5,
        product_name: "Hatity",
        quantity: 3,
      },
      {
        product_id: 8,
        product_name: "Asoka",
        quantity: 2,
      },
      {
        product_id: 12,
        product_name: "Sonair",
        quantity: 1,
      },
    ],
    first_name: "Tung",
    id: 11,
    last_name: "Nguyen",
    status: "delivering",
    total: 141489600.0,
    user_id: 1,
  },
  {
    cart_id: 12,
    created_at: "Thu, 16 Feb 2023 00:17:21 GMT",
    data: [
      {
        product_id: 2,
        product_name: "Rank",
        quantity: 1,
      },
      {
        product_id: 7,
        product_name: "It",
        quantity: 2,
      },
      {
        product_id: 14,
        product_name: "Zoolab",
        quantity: 2,
      },
    ],
    first_name: "Tung",
    id: 12,
    last_name: "Nguyen",
    status: "delivering",
    total: 67831170.0,
    user_id: 1,
  },
];

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
interface product {
  product_id: number;
  product_name: string;
  quantity: number;
}
const getAllNameProduct = (data: product[]) => {
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

export default function HistoryOrder() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getOrderOfCurrentUser()
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .then((data) => {
        // setData(data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const mapData = () => {
    return testData.map((item) => {
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
