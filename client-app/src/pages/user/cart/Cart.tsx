
import { Container, Grid } from "@mui/material";
import CartItem from "../../../component/card/CartItem";
import OrderSummary from "./OrderSummary";
import { selectCart } from "./CartSlice";
import { useAppSelector } from "../../../app/hooks";

export default function Cart() {
  const nowCart = useAppSelector(selectCart);

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={7} lg={7}>
            <Grid container>
              <Grid item xs>
                {nowCart.itemsList?.map((card) => (
                  <CartItem
                    key={card.id}
                    id={card.id}
                    category={card.category}
                    description={card.description}
                    image={card.image}
                    name={card.name}
                    price={card.price}
                    quantity={card.quantity}
                    quantityInCart={card.quantityInCart}
                    star={card.star}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={5}>
            <OrderSummary />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
