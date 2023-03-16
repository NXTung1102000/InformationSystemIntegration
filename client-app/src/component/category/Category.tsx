import { Grid, Typography } from "@mui/material";
import { ICartItem } from "../../constant/cart/cart";
import { NameCategory } from "../../constant/tabRedirect/name";
import ProductCard from "../card/ProductCard";

export interface ICategory {
  name: NameCategory;
  productList: ICartItem[];
}

export default function Category(props: ICategory) {
  return (
    <>
      <Typography variant="h3" component="div" sx={{ margin: "1rem 0 1rem 0", textTransform: "capitalize" }}>
        {props.name}
      </Typography>
      <Grid container sx={{ margin: "0 0 2rem 0" }}>
        {props.productList?.map((card) => (
          <Grid item lg={2} md={4} xs={6} key={card.id}>
            <ProductCard
              id={card.id}
              name={card.name}
              price={card.price}
              description={card.description}
              star={card.star}
              image={`http://localhost:5000/show?filename=${card.image}`}
              category={props.name}
              quantity={card.quantity}
              quantityInCart={card.quantityInCart}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
