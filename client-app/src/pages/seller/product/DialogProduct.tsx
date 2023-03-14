import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ICreateProduct, IUpdateProduct } from "../../../constant/product/interface";
import { NameCategory } from "../../../constant/tabRedirect/name";
import UploadIcon from "@mui/icons-material/Upload";
import { useAppDispatch } from "../../../app/hooks";
import { changeLoading } from "../../../component/LoadingAndNotice/loadingSlice";
import { createProductAPI, updateProductAPI } from "../../../api/product";

interface IOpenDialog {
  product: IUpdateProduct | ICreateProduct;
  open: boolean;
  setOpen: (open: boolean) => void;
  type: string;
}

export default function DialogProduct({ open, setOpen, type, product }: IOpenDialog) {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<IUpdateProduct | ICreateProduct>(product);
  React.useEffect(() => {
    setData(product);
  }, [product]);

  const handleSubmit = async () => {
    const time = new Date();
    setData({ ...data, update_at: time.toString() });
    switch (type) {
      case "create":
        dispatch(changeLoading(true));
        createProductAPI(data as ICreateProduct)
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
        break;
      case "update":
        dispatch(changeLoading(true));
        updateProductAPI(data as IUpdateProduct)
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
        break;
      default:
        break;
    }
    console.log(data);
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    console.log(file);
    setData({ ...data, image: file?.name as string });
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography component="h1" variant="h5">
              {type + " product"}
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Name of product"
                    autoComplete="name"
                    value={data.name}
                    onChange={(event) => setData({ ...data, name: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Brand"
                    value={data.brand}
                    onChange={(event) => setData({ ...data, brand: event.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={data.category}
                      label="Category"
                      onChange={(event) => setData({ ...data, category: event.target.value })}
                    >
                      <MenuItem value={NameCategory.HEADPHONE}>{NameCategory.HEADPHONE}</MenuItem>
                      <MenuItem value={NameCategory.KEYBOARD}>{NameCategory.KEYBOARD}</MenuItem>
                      <MenuItem value={NameCategory.LAPTOP}>{NameCategory.LAPTOP}</MenuItem>
                      <MenuItem value={NameCategory.MOUSE}>{NameCategory.MOUSE}</MenuItem>
                      <MenuItem value={NameCategory.SMARTPHONE}>{NameCategory.SMARTPHONE}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type={"number"}
                    required
                    fullWidth
                    label="Price (VND)"
                    value={data.price}
                    onChange={(event) => setData({ ...data, price: event.target.value as unknown as number })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type={"number"}
                    required
                    fullWidth
                    label="Quantity"
                    value={data.quantity}
                    onChange={(event) => setData({ ...data, quantity: event.target.value as unknown as number })}
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <Button variant="contained" endIcon={<UploadIcon />} color="success" size="small" component="label">
                    Upload Image
                    <input hidden accept="image/*" type="file" onChange={handleChangeImage} />
                  </Button>
                </Grid>
              </Grid>
              <Button
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 5, mb: 5 }}
              >
                {type}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
