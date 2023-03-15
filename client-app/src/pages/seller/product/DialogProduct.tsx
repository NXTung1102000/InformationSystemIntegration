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
import { createProductAPI, updateProductAPI } from "../../../api/product";
import { regexForNotEmpty } from "../../../constant/validate/regex";
import { changeNotice } from "../../../component/LoadingAndNotice/noticeSlice";
import { messageOfFieldIsNotEmpty } from "../../../constant/validate/message";

interface IOpenDialog {
  product: IUpdateProduct | ICreateProduct;
  open: boolean;
  setOpen: (open: boolean) => void;
  type: string;
}

interface ILocalState {
  isErr: boolean;
  message: string;
}

export default function DialogProduct({ open, setOpen, type, product }: IOpenDialog) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<IUpdateProduct | ICreateProduct>(product);
  React.useEffect(() => {
    setData(product);
  }, [product]);

  const [errName, setErrName] = React.useState<ILocalState>({
    isErr: false,
    message: messageOfFieldIsNotEmpty("Name of product"),
  });
  const [errBrand, setErrBrand] = React.useState<ILocalState>({
    isErr: false,
    message: messageOfFieldIsNotEmpty("Brand"),
  });
  const [errCategory, setErrCategory] = React.useState<ILocalState>({
    isErr: false,
    message: messageOfFieldIsNotEmpty("Category"),
  });
  const [errDescription, setErrDescription] = React.useState<ILocalState>({
    isErr: false,
    message: messageOfFieldIsNotEmpty("Description"),
  });

  const setErrorField = (state: ILocalState, setState: (state: ILocalState) => void, value: string, regex: RegExp) => {
    setState({ ...state, isErr: !regex.test(value) });
    return !regex.test(value);
  };

  const handleSubmit = async () => {
    console.log(data);
    if (!isSubmitted) setIsSubmitted(true);
    const isErrName = setErrorField(errName, setErrName, data.name, regexForNotEmpty);
    const isErrBrand = setErrorField(errBrand, setErrBrand, data.brand, regexForNotEmpty);
    const isErrCategory = setErrorField(errCategory, setErrCategory, data.category, regexForNotEmpty);
    const isErrDescription = setErrorField(errDescription, setErrDescription, data.description, regexForNotEmpty);
    if (isErrName || isErrBrand || isErrCategory || isErrDescription) return;
    await submit();
  };

  const resetState = () => {
    setErrName({ ...errName, isErr: false });
    setErrBrand({ ...errBrand, isErr: false });
    setErrCategory({ ...errCategory, isErr: false });
    setErrDescription({ ...errDescription, isErr: false });
    if (!isSubmitted) setIsSubmitted(false);
  };

  const handlePositiveNumber = (value: number) => {
    if (value < 1) return 1;
    return value;
  };

  const submit = async () => {
    const time = new Date();
    setData({ ...data, update_at: time.toString() });
    switch (type) {
      case "create":
        createProductAPI(data as ICreateProduct)
          .then((response) => {
            return response.data;
          })
          .then((response) => {
            if (response.status === 0) {
              setOpen(false);
              dispatch(changeNotice({ message: "create product successfully", open: true, type: "success" }));
            } else {
              dispatch(changeNotice({ message: response.message, open: true, type: "error" }));
            }
          })
          .catch((err) => {
            console.log(err);
            dispatch(changeNotice({ message: "error server", open: true, type: "error" }));
          });
        break;
      case "update":
        updateProductAPI(data as IUpdateProduct)
          .then((response) => {
            return response.data;
          })
          .then((response) => {
            if (response.status === 0) {
              setOpen(false);
              dispatch(changeNotice({ message: "update successfully", open: true, type: "success" }));
            } else {
              dispatch(changeNotice({ message: response.message, open: true, type: "error" }));
            }
          })
          .catch((err) => {
            console.log(err);
            dispatch(changeNotice({ message: "error server", open: true, type: "error" }));
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
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          resetState();
        }}
      >
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
                    error={errName.isErr}
                    helperText={errName.isErr ? errName.message : ""}
                    required
                    fullWidth
                    label="Name of product"
                    autoComplete="name"
                    value={data.name}
                    onChange={(event) => {
                      setData({ ...data, name: event.target.value });
                      setErrorField(errName, setErrName, event.target.value, regexForNotEmpty);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={errBrand.isErr}
                    helperText={errBrand.isErr ? errBrand.message : ""}
                    required
                    fullWidth
                    label="Brand"
                    value={data.brand}
                    onChange={(event) => {
                      setData({ ...data, brand: event.target.value });
                      setErrorField(errBrand, setErrBrand, event.target.value, regexForNotEmpty);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      error={errCategory.isErr}
                      value={data.category}
                      label="Category"
                      onChange={(event) => {
                        setData({ ...data, category: event.target.value });
                        setErrorField(errCategory, setErrCategory, event.target.value, regexForNotEmpty);
                      }}
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
                    error={errDescription.isErr}
                    helperText={errDescription.isErr ? errDescription.message : ""}
                    required
                    fullWidth
                    label="Description"
                    value={data.description}
                    onChange={(event) => {
                      setData({ ...data, description: event.target.value });
                      setErrorField(errDescription, setErrDescription, event.target.value, regexForNotEmpty);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type={"number"}
                    required
                    fullWidth
                    label="Price (VND)"
                    value={data.price}
                    onChange={(event) =>
                      setData({ ...data, price: handlePositiveNumber(event.target.value as unknown as number) })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type={"number"}
                    required
                    fullWidth
                    label="Quantity"
                    value={data.quantity}
                    onChange={(event) =>
                      setData({ ...data, quantity: handlePositiveNumber(event.target.value as unknown as number) })
                    }
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
