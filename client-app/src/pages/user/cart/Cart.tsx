import { Container, Grid } from "@mui/material";
import CartItem from "../../../component/card/CartItem";
import OrderSummary from "./OrderSummary";
import { selectCart } from "./CartSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ICartItem } from "../../../constant/cart/cart";

export default function Cart() {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const subTotal = cart.itemsList.reduce((total: number, item: ICartItem) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={7} lg={7}>
            <Grid container>
              <Grid item xs>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={5}>
            <OrderSummary subtotal={2000000} shipping={50000} voucher={200000} total={1850000} numItem={5} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
