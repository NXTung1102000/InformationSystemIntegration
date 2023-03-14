import { Box, Button } from "@mui/material";
import React from "react";
import { deleteProductAPI, searchProduct } from "../../../api/product";
import { useAppDispatch } from "../../../app/hooks";
import { changeLoading } from "../../../component/LoadingAndNotice/loadingSlice";
import TableComponent from "../../../component/table/TableComponent";
import { dateToString } from "../../../util/convertDateTime";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import DialogProduct from "./DialogProduct";
import { ICreateProduct, IUpdateProduct } from "../../../constant/product/interface";
import { NameCategory } from "../../../constant/tabRedirect/name";

const header = ["ID - Product", "Name", "Category", "Brand", "Update at", "Price (vnd)", "Quantity", "Action"];

const createProduct: ICreateProduct = {
  brand: "",
  category: "",
  image: "",
  description: "",
  name: "",
  update_at: "",
  price: 0,
  quantity: 0,
};

const initData: IUpdateProduct[] = [
  {
    id: 1,
    name: "PC Dell TUF504",
    category: NameCategory.LAPTOP,
    brand: "PC Dell",
    description: "máy tính",
    image: "",
    price: 1000000.0,
    quantity: 100,
    update_at: "Wed Mar 15 2023 02:09:21",
  },
  {
    id: 2,
    brand: "PC Dell",
    category: NameCategory.LAPTOP,
    description: "máy tính",
    image: "",
    name: "PC Dell TUF504",
    price: 1000000.0,
    quantity: 100,
    update_at: "Wed Mar 15 2023 02:09:21",
  },
  {
    id: 3,
    brand: "PC Dell",
    category: NameCategory.LAPTOP,
    description: "máy tính",
    image: "",
    name: "PC Dell TUF504",
    price: 1000000.0,
    quantity: 100,
    update_at: "Wed Mar 15 2023 02:09:21",
  },
];

export default function Product() {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<IUpdateProduct[]>(initData);

  const [openDialogProduct, setOpenDialogProduct] = React.useState(false);
  const [typeDialogProduct, setTypeDialogProduct] = React.useState("create");
  const [checkedProduct, setCheckedProduct] = React.useState<IUpdateProduct | ICreateProduct>(createProduct);

  const handleEditProduct = (item: IUpdateProduct | ICreateProduct, type: "create" | "update") => {
    setTypeDialogProduct(type);
    setCheckedProduct(item);
    setOpenDialogProduct(true);
  };

  const handleDeleteProduct = async (id: number) => {
    dispatch(changeLoading(true));
    deleteProductAPI(id)
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

  // React.useEffect(() => {
  //   dispatch(changeLoading(true));
  //   searchProduct({ category: null, keyword: null })
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .then((data) => {
  //       setData(data.data);
  //       dispatch(changeLoading(false));
  //     })
  //     .catch((error) => {
  //       dispatch(changeLoading(false));
  //       console.log(error);
  //     });
  // }, [dispatch]);

  const mapData = () => {
    return data?.map((item) => {
      return {
        ID: item.id,
        Name: item.name,
        Category: item.category,
        Brand: item.brand,
        update_at: dateToString(new Date(item.update_at)),
        price: item.price,
        quantity: item.quantity,
        action: (
          <Box>
            <Button
              variant="contained"
              color="warning"
              size="small"
              sx={{ margin: "0 .25rem 0 0" }}
              onClick={() => handleEditProduct(item, "update")}
            >
              <EditIcon />
            </Button>
            <Button variant="contained" color="error" size="small" onClick={() => handleDeleteProduct(item.id)}>
              <DeleteIcon />
            </Button>
          </Box>
        ),
      };
    });
  };

  return (
    <>
      <DialogProduct
        open={openDialogProduct}
        setOpen={setOpenDialogProduct}
        type={typeDialogProduct}
        product={checkedProduct}
      />
      <Box>
        <Button
          variant="contained"
          size="large"
          sx={{ margin: "0 0 1rem 0" }}
          onClick={() => handleEditProduct(createProduct, "create")}
        >
          Create product
        </Button>
        <TableComponent header={header} data={mapData()} />
      </Box>
    </>
  );
}
