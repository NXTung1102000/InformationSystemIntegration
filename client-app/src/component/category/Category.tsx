import { Grid, Typography } from "@mui/material";
import ProductCard, { ICard } from "../card/ProductCard";

export interface ICategory {
  name: string;
  productList: ICard[];
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
              img={card.img}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
