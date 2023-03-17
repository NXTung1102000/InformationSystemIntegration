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
import { regexForNotEmpty, regexForEmail, regexForPW, regexForPhone } from "../../constant/validate/regex";
import {
  messageOfFieldIsNotEmpty,
  messageOfEmail,
  messageOfPassword,
  messageOfPhoneNumber,
  messageOfConfirmPassword,
  IState,
  validateState,
  handleChangeState,
} from "../../constant/validate/message";

interface IOpenDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Register({ open, setOpen }: IOpenDialog) {
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = React.useState<IState>({
    value: "",
    isError: false,
    message: messageOfFieldIsNotEmpty("First name"),
  });
  const [lastName, setLastName] = React.useState<IState>({
    value: "",
    isError: false,
    message: messageOfFieldIsNotEmpty("Last name"),
  });
  const [phoneNumber, setPhoneNumber] = React.useState<IState>({
    value: "",
    isError: false,
    message: messageOfPhoneNumber,
  });
  const [address, setAddress] = React.useState<IState>({
    value: "",
    isError: false,
    message: messageOfFieldIsNotEmpty("Address"),
  });
  const [email, setEmail] = React.useState<IState>({ value: "", isError: false, message: messageOfEmail });
  const [username, setUserName] = React.useState<IState>({
    value: "",
    isError: false,
    message: messageOfFieldIsNotEmpty("Username"),
  });
  const [password, setPassword] = React.useState<IState>({ value: "", isError: false, message: messageOfPassword });
  const [confirmPassword, setConfirmPassword] = React.useState<IState>({
    value: "",
    isError: false,
    message: messageOfConfirmPassword,
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const resetState = () => {
    setFirstName({ ...firstName, value: "", isError: false });
    setLastName({ ...lastName, value: "", isError: false });
    setPhoneNumber({ ...phoneNumber, value: "", isError: false });
    setAddress({ ...address, value: "", isError: false });
    setEmail({ ...email, value: "", isError: false });
    setUserName({ ...username, value: "", isError: false });
    setPassword({ ...password, value: "", isError: false });
    setConfirmPassword({ ...confirmPassword, value: "", isError: false });
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (!isSubmitted) setIsSubmitted(true);
    const errFirstName = validateState(firstName, setFirstName, regexForNotEmpty);
    const errLastName = validateState(lastName, setLastName, regexForNotEmpty);
    const errEmail = validateState(email, setEmail, regexForEmail);
    const errPhone = validateState(phoneNumber, setPhoneNumber, regexForPhone);
    const errAddress = validateState(address, setAddress, regexForNotEmpty);
    const errUsername = validateState(username, setUserName, regexForNotEmpty);
    const errPW = validateState(password, setPassword, regexForPW);
    const errConfirmPW = validateState(confirmPassword, setConfirmPassword, regexForPW);
    if (errFirstName || errLastName || errEmail || errPhone || errAddress || errUsername || errPW || errConfirmPW)
      return;
    register();
  };

  const register = () => {
    const credentials = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      phone_number: phoneNumber.value,
      username: username.value,
      password: password.value,
      address: address.value,
    };
    registerAPI(credentials)
      .then((req) => {
        return req.data;
      })
      .then((response) => {
        if (response.status === 0) {
          setOpen(false);
          dispatch(changeNotice({ message: "sign up successfully", open: true, type: "success" }));
        } else {
          dispatch(changeNotice({ message: response.message, open: true, type: "error" }));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(changeNotice({ message: err.message, open: true, type: "error" }));
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          resetState();
        }}
      >
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
              Welcome to E - Commerce
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={firstName.isError}
                    helperText={firstName.isError ? firstName.message : ""}
                    required
                    fullWidth
                    label="First Name"
                    value={firstName.value}
                    onChange={(event) =>
                      handleChangeState(firstName, setFirstName, event.target.value, regexForNotEmpty)
                    }
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={lastName.isError}
                    helperText={lastName.isError ? lastName.message : ""}
                    required
                    fullWidth
                    label="Last Name"
                    value={lastName.value}
                    onChange={(event) => handleChangeState(lastName, setLastName, event.target.value, regexForNotEmpty)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={email.isError}
                    helperText={email.isError ? email.message : ""}
                    required
                    fullWidth
                    label="Email"
                    value={email.value}
                    onChange={(event) => handleChangeState(email, setEmail, event.target.value, regexForEmail)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={phoneNumber.isError}
                    helperText={phoneNumber.isError ? phoneNumber.message : ""}
                    required
                    fullWidth
                    label="Phone Number"
                    value={phoneNumber.value}
                    onChange={(event) =>
                      handleChangeState(phoneNumber, setPhoneNumber, event.target.value, regexForPhone)
                    }
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={address.isError}
                    helperText={address.isError ? address.message : ""}
                    required
                    fullWidth
                    label="Address"
                    value={address.value}
                    onChange={(event) => handleChangeState(address, setAddress, event.target.value, regexForNotEmpty)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={username.isError}
                    helperText={username.isError ? username.message : ""}
                    required
                    fullWidth
                    label="User Name"
                    value={username.value}
                    onChange={(event) => handleChangeState(username, setUserName, event.target.value, regexForNotEmpty)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={password.isError}
                    helperText={password.isError ? password.message : ""}
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password.value}
                    onChange={(event) => handleChangeState(password, setPassword, event.target.value, regexForPW)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={confirmPassword.isError || confirmPassword.value !== password.value}
                    helperText={
                      confirmPassword.isError || confirmPassword.value !== password.value ? confirmPassword.message : ""
                    }
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword.value}
                    onChange={(event) =>
                      handleChangeState(confirmPassword, setConfirmPassword, event.target.value, regexForPW)
                    }
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 5, mb: 5 }}>
                Sign Up
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
