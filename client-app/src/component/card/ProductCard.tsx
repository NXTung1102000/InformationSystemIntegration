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
    const card = { ...item, quantityInCart: 1 };
    dispatch(addToCart(card));
  };
  return (
    <Card sx={{ margin: "0 1rem 1rem 0" }}>
      <CardActionArea onClick={goToDetailProduct}>
        <CardMedia sx={{ maxWidth: "100%", height: 250 }} component="img" src={props.image} alt={props.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center" }} component="div">
            {`   Quantity:   ${props.quantity}`}
          </Typography>
          <Typography variant="body1" sx={{ color: "#ee4d2d", margin: "0.5rem 0" }}>
            {props.price} vnd
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: "4rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
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
