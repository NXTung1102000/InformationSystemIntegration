import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Rating } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../pages/user/cart/CartSlice";
import { ICartItem } from "../../constant/cart/cart";

export default function ProductCard(props: ICartItem) {
  const dispatch = useAppDispatch();

  const goToDetailProduct = async () => {
    console.log(props);
  };

  const addToYourCart = (item: ICartItem) => {
    const card = { ...item, quantity: 1 };
    dispatch(addToCart(card));
    console.log(`add item ${item.name} to your cart`);
  };
  return (
    <Card sx={{ margin: "0 1rem 1rem 0" }}>
      <CardActionArea onClick={goToDetailProduct}>
        <CardMedia sx={{ maxWidth: "100%" }} component="img" image={props.img} alt={props.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Rating value={props.star} readOnly size="small" precision={0.5} />
          <Typography variant="body1" sx={{ color: "#ee4d2d", margin: "0.5rem 0" }}>
            {props.price} vnd
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => addToYourCart(props)}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
