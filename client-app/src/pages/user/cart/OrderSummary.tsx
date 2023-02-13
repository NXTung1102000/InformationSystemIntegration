import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions, Grid, Typography } from "@mui/material";

interface IProps {
  subtotal: number;
  shipping: number;
  voucher: number;
  total: number;
  numItem: number;
}

export default function OrderSummary(props: IProps) {
  return (
    <Card sx={{ position: "sticky", top: "1rem", minWidth: "275px" }} elevation={15}>
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
            <Typography>{props.subtotal} vnd</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography>Shipping</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography> + {props.shipping} vnd</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography>Voucher</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography> - {props.voucher} vnd</Typography>
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
            <Typography sx={{ fontWeight: "bold" }}>{props.total} vnd</Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button size="large" color="secondary">
          BUY NOW ({props.numItem})
        </Button>
      </CardActions>
    </Card>
  );
}
