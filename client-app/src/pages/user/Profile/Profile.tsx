import React, { useEffect } from "react";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Grid } from "@mui/material";
import ChangePassword from "./ChangePW";
import {
  handleChangeState,
  IState,
  messageOfEmail,
  messageOfFieldIsNotEmpty,
  messageOfPhoneNumber,
  validateState,
} from "../../../constant/validate/message";
import { regexForEmail, regexForNotEmpty, regexForPhone } from "../../../constant/validate/regex";
import { getInfoUseAPI, updateInfoUserAPI } from "../../../api/user";
import { useAppDispatch } from "../../../app/hooks";
import { changeNotice } from "../../../component/LoadingAndNotice/noticeSlice";

export default function Profile() {
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

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [openChangePW, setOpenChangePW] = React.useState(false);

  const handleSubmit = () => {
    if (!isSubmitted) setIsSubmitted(true);
    const errFirstName = validateState(firstName, setFirstName, regexForNotEmpty);
    const errLastName = validateState(lastName, setLastName, regexForNotEmpty);
    const errEmail = validateState(email, setEmail, regexForEmail);
    const errPhone = validateState(phoneNumber, setPhoneNumber, regexForPhone);
    const errAddress = validateState(address, setAddress, regexForNotEmpty);
    if (errFirstName || errLastName || errEmail || errPhone || errAddress) return;
    updateInformation();
  };

  useEffect(() => {
    getInfoUseAPI()
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.status !== 0) {
          const result = response.data[0];
          setFirstName({ ...firstName, value: result.first_name });
          setLastName({ ...lastName, value: result.last_name });
          setAddress({ ...address, value: result.address });
          setEmail({ ...email, value: result.email });
          setPhoneNumber({ ...phoneNumber, value: result.phone });
        } else {
          dispatch(changeNotice({ message: response.message, open: true, type: "error" }));
        }
      })
      .catch((err) => {
        dispatch(changeNotice({ message: err.message, open: true, type: "error" }));
        console.log(err);
      });
  }, [dispatch]);

  const updateInformation = () => {
    const credentials = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      phone_number: phoneNumber.value,
      address: address.value,
    };
    updateInfoUserAPI(credentials)
      .then((req) => {
        return req.data;
      })
      .then((response) => {
        if (response.status === 0) {
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
    <>
      <ChangePassword open={openChangePW} setOpen={setOpenChangePW} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "60%" }}>
          <CardHeader subheader="The information can be edited" title="Profile" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  error={firstName.isError}
                  helperText={firstName.isError ? firstName.message : ""}
                  fullWidth
                  label="First name"
                  name="firstName"
                  onChange={(event) => handleChangeState(firstName, setFirstName, event.target.value, regexForNotEmpty)}
                  required
                  value={firstName.value}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  error={lastName.isError}
                  helperText={lastName.isError ? lastName.message : ""}
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={(event) => handleChangeState(lastName, setLastName, event.target.value, regexForNotEmpty)}
                  required
                  value={lastName.value}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={email.isError}
                  helperText={email.isError ? email.message : ""}
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={(event) => handleChangeState(email, setEmail, event.target.value, regexForEmail)}
                  required
                  value={email.value}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={phoneNumber.isError}
                  helperText={phoneNumber.isError ? phoneNumber.message : ""}
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={(event) =>
                    handleChangeState(phoneNumber, setPhoneNumber, event.target.value, regexForPhone)
                  }
                  value={phoneNumber.value}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={address.isError}
                  helperText={address.isError ? address.message : ""}
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={(event) => handleChangeState(address, setAddress, event.target.value, regexForNotEmpty)}
                  required
                  value={address.value}
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
