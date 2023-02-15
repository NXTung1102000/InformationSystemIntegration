import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import { CardActionArea, CardActions } from "@mui/material";
import { Grid, Typography, Button, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ICartItem } from "../../constant/cart/cart";
import { useAppDispatch } from "../../app/hooks";
import { decreaseCount, increaseCount, removeFromCart } from "../../pages/user/cart/CartSlice";

export default function CartItem(props: ICartItem) {
  const dispatch = useAppDispatch();
  return (
    <Card sx={{ display: "flex", margin: "1rem 0 0 0" }}>
      <CardMedia sx={{ flexGrow: 1, maxWidth: "40%", height: "200px" }} component="img" image={props.image} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography>{props.category}</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button color="secondary" startIcon={<DeleteIcon />} onClick={() => dispatch(removeFromCart(props.id))} />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography>{props.name}</Typography>
          </Grid>
        </Grid>
        <Typography variant="subtitle2">
          <hr />
        </Typography>

        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography>Quantity</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => dispatch(decreaseCount(props.id))}>
                <RemoveIcon />
              </IconButton>
              <Typography>{props.quantity}</Typography>
              <IconButton onClick={() => dispatch(increaseCount(props.id))}>
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography sx={{ fontWeight: "bold" }}>Price</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography>{props.price} vnd</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography color="secondary">{props.price * props.quantity} vnd</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
