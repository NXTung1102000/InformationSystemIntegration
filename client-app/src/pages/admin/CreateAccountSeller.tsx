import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { registerAPI } from "../../api/auth";
import { useAppDispatch } from "../../app/hooks";
import { changeNotice } from "../../component/LoadingAndNotice/noticeSlice";

interface IOpenDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateAccountSeller({ open, setOpen }: IOpenDialog) {
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [confirmPassword, setConfirmPassword] = React.useState("");

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

  const validateUserName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate UserName
    setUserName(event.target.value);
  };

  const validatePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate password
    setPassword(event.target.value);
  };

  // const validateConfirmPassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   // validate Confirm Password
  //   setConfirmPassword(event.target.value);
  // };

  const handleSubmit = async () => {
    const credentials = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      username,
      password,
      address,
    };
    // registerAPI(credentials)
    //   .then((req) => {
    //     return req.data;
    //   })
    //   .then((response) => {
    //     if (response.status === 0) {
    //       setOpen(false);
    //       dispatch(changeNotice({ message: "create successfully", open: true, type: "success" }));
    //     } else {
    //       dispatch(changeNotice({ message: response.message, open: true, type: "error" }));
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     dispatch(changeNotice({ message: "error server", open: true, type: "error" }));
    //   });
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography component="h1" variant="h5">
              Create account for seller
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={(event) => validateFirstName(event)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="lastName"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    value={lastName}
                    onChange={(event) => validateLastName(event)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => validateEmail(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="phoneNumber"
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(event) => validatePhoneNumber(event)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="address"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    value={address}
                    onChange={(event) => validateAddress(event)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="username"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    value={username}
                    onChange={(event) => validateUserName(event)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => validatePassword(event)}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => validateConfirmPassword(event)}
                  />
                </Grid> */}
              </Grid>
              <Button type="submit" fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 5, mb: 5 }}>
                Create
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
