import React from "react";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Grid } from "@mui/material";
import ChangePassword from "./ChangePW";

export default function Profile() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [openChangePW, setOpenChangePW] = React.useState(false);

  const validateFirstName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate first name
    setFirstName(event.target.value);
  };

  const validateLastName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate Last name
    setLastName(event.target.value);
  };

  const validateEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate email
    setEmail(event.target.value);
  };

  const validatePhoneNumber = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate PhoneNumber
    setPhoneNumber(event.target.value);
  };

  const validateAddress = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate PhoneNumber
    setAddress(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <>
      <ChangePassword open={openChangePW} setOpen={setOpenChangePW} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "60%" }}>
          <CardHeader subheader="The information can be edited" title="Profile" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  onChange={validateFirstName}
                  required
                  value={firstName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={validateLastName}
                  required
                  value={lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={validateEmail}
                  required
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={validatePhoneNumber}
                  type="number"
                  value={phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={validateAddress}
                  required
                  value={address}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Update Information
            </Button>
            <Button variant="contained" onClick={() => setOpenChangePW(true)}>
              Change password
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
