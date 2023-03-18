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

const header = ["ID - Product", "Name", "Category", "Brand", "Update at", "Price (vnd)", "Quantity", "Action"];

const createProduct: ICreateProduct = {
  brand: "",
  category: "",
  image: "",
  description: "",
  name: "",
  created_date: "",
  price: 1,
  quantity: 1,
  detail: "",
  specification: "",
};

export default function Product() {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<IUpdateProduct[]>([]);

  const [openDialogProduct, setOpenDialogProduct] = React.useState(false);
  const [typeDialogProduct, setTypeDialogProduct] = React.useState("create");
  const [checkedProduct, setCheckedProduct] = React.useState<IUpdateProduct | ICreateProduct>({ ...createProduct });

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
        dispatch(changeLoading(false));
      })
      .catch((error) => {
        dispatch(changeLoading(false));
        console.log(error);
      });
    refreshData();
  };

  const refreshData = () => {
    dispatch(changeLoading(true));
    searchProduct({ category: null, keyword: null, price_max: null, price_min: null })
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

  React.useEffect(() => {
    refreshData();
  }, [dispatch]);

  const mapData = () => {
    return data?.map((item) => {
      return {
        ID: item.id,
        Name: item.name,
        Category: item.category,
        Brand: item.brand,
        update_at: dateToString(new Date(item.created_date)),
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
        refreshData={refreshData}
      />
      <Box>
        <Button
          variant="contained"
          size="large"
          sx={{ margin: "0 0 1rem 0" }}
          onClick={() => handleEditProduct({ ...createProduct }, "create")}
        >
          Create product
        </Button>
        <TableComponent header={header} data={mapData()} />
      </Box>
    </>
  );
}
