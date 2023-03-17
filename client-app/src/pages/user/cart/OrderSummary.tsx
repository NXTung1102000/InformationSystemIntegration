import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { clearCart, selectCart } from "./CartSlice";
import { ICartItem } from "../../../constant/cart/cart";
import { changeNotice } from "../../../component/LoadingAndNotice/noticeSlice";
import { selectAuth } from "../../LogIn_Register/AuthSlice";
import { submitOrder, IInputCart } from "../../../api/order";
import { changeLoading } from "../../../component/LoadingAndNotice/loadingSlice";
import { calculateOrder } from "../../../util/utilsForOrder";
import { IInputPolicy, TYPE_POLICY } from "../../../constant/policy/policy";
import React from "react";
import { getPolicyAPI } from "../../../api/policy";

export default function OrderSummary() {
  const dispatch = useAppDispatch();
  const nowCart = useAppSelector(selectCart);
  const auth = useAppSelector(selectAuth);
  const [policy, setPolicy] = React.useState<IInputPolicy>({
    value: 1,
    threshold: 10,
    voucher_type_id: TYPE_POLICY.FIXED,
  });

  const subTotal = nowCart.itemsList.reduce((total: number, item: ICartItem) => {
    return total + item.price * item.quantityInCart;
  }, 0);
  const numTotal = nowCart.itemsList.reduce((total: number, item: ICartItem) => {
    return total + item.quantityInCart;
  }, 0);
  const total = calculateOrder(subTotal, policy);

  React.useEffect(() => {
    getPolicyAPI()
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const { value, threshold, voucher_type_id } = data.data;
        setPolicy({ value, threshold, voucher_type_id });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          <Grid item xs={12} sm={12} md={12} lg={12} mt={"1rem"}>
            <Grid container>
              <Grid item xs={4} sm={4} md={4} lg={4} sx={{ display: "flex", alignItems: "center" }}>
                <Typography>Voucher</Typography>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8}>
                <Grid container>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Typography>Type: </Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography>{policy.voucher_type_id === TYPE_POLICY.FIXED ? "Fixed" : "Percent"}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Typography>Threshold: </Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography>{policy.threshold} vnd</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    Value:
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Typography>
                      {" - " + policy.value + " " + (policy.voucher_type_id === TYPE_POLICY.FIXED ? "vnd" : "%")}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
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
