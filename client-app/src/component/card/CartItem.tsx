import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import { CardActionArea, CardActions } from "@mui/material";
import { Grid, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartItem() {
  return (
    <Card sx={{ display: "flex", margin: "1rem 0 0 0" }}>
      <CardMedia
        sx={{ flexGrow: 1, maxWidth: "40%", height: "auto" }}
        component="img"
        image="https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gold-600x600.jpg"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography>Category</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button color="secondary" startIcon={<DeleteIcon />} />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography>Item Name</Typography>
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
            <Typography>1</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography sx={{ fontWeight: "bold" }}>Price</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography>{20000000} vnd</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography color="secondary">{20000000} vnd</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
