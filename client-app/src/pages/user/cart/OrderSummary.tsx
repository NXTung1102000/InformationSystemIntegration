import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { clearCart, selectCart } from "./CartSlice";
import { ICartItem } from "../../../constant/cart/cart";
import { calculateShipping, calculateVoucher } from "../../../constant/policy/policy";
import { changeNotice } from "../../../component/LoadingAndNotice/noticeSlice";
import { selectAuth } from "../../LogIn_Register/AuthSlice";
import { submitOrder, IInputCart } from "../../../api/order";
import { changeLoading } from "../../../component/LoadingAndNotice/loadingSlice";
const distance = 1;

export default function OrderSummary() {
  const dispatch = useAppDispatch();
  const nowCart = useAppSelector(selectCart);
  const auth = useAppSelector(selectAuth);

  const subTotal = nowCart.itemsList.reduce((total: number, item: ICartItem) => {
    return total + item.price * item.quantityInCart;
  }, 0);
  const numTotal = nowCart.itemsList.reduce((total: number, item: ICartItem) => {
    return total + item.quantityInCart;
  }, 0);
  const shippingFee = calculateShipping(distance);
  const voucher = calculateVoucher(subTotal);
  const total = subTotal + shippingFee - voucher;

  const submit = () => {
    if (!auth.token) {
      dispatch(
        changeNotice({
          message: "sorry, You need to be logged in to continue ",
          open: true,
          type: "error",
        })
      );
    } else {
      dispatch(changeLoading(true));
      const inputCart: IInputCart = {
        data: [],
      };
      nowCart.itemsList.forEach((item) => {
        const product = {
          product_id: item.id,
          quantity: item.quantityInCart,
        };
        inputCart.data.push(product);
      });
      submitOrder(inputCart)
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          if (response.status === 0) {
            dispatch(changeNotice({ message: "successfully", open: true, type: "success" }));
            dispatch(changeLoading(false));
            dispatch(clearCart());
          } else {
            dispatch(changeLoading(false));
            dispatch(changeNotice({ message: response.message, open: true, type: "error" }));
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(changeLoading(false));
          dispatch(changeNotice({ message: "error server ... ", open: true, type: "error" }));
        });
    }
  };

  return (
    <Card sx={{ position: "sticky", top: "1rem" }} elevation={5}>
      <CardContent>
        <Typography>Shopping Cart</Typography>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Order Summary
        </Typography>
        <Typography variant="subtitle2">
          <hr />
        </Typography>
        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography>SubTotal</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography>{subTotal} vnd</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography>Shipping</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography> + {shippingFee} vnd</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography>Voucher</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography> - {voucher} vnd</Typography>
          </Grid>
        </Grid>
        <Typography variant="subtitle2">
          <hr />
        </Typography>
        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Total
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography sx={{ fontWeight: "bold" }}>{total} vnd</Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button size="large" color="secondary" onClick={submit}>
          BUY NOW ({numTotal})
        </Button>
      </CardActions>
    </Card>
  );
}
