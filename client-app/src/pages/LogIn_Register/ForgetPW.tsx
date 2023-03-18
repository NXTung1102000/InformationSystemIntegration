import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { forgetPasswordAPI } from "../../api/auth";
import { useAppDispatch } from "../../app/hooks";
import { changeNotice } from "../../component/LoadingAndNotice/noticeSlice";
import {
  handleChangeState,
  IState,
  messageOfEmail,
  messageOfFieldIsNotEmpty,
  validateState,
} from "../../constant/validate/message";
import { regexForEmail, regexForNotEmpty } from "../../constant/validate/regex";

interface IOpenDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ForgetPW({ open, setOpen }: IOpenDialog) {
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState<IState>({ value: "", isError: false, message: messageOfEmail });
  const [username, setUserName] = React.useState<IState>({
    value: "",
    isError: false,
    message: messageOfFieldIsNotEmpty("Username"),
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const resetState = () => {
    setEmail({ ...email, value: "", isError: false });
    setUserName({ ...username, value: "", isError: false });
    setIsSubmitted(false);
  };

  const handleSubmit = async () => {
    if (!isSubmitted) setIsSubmitted(true);
    const errEmail = validateState(email, setEmail, regexForEmail);
    const errUsername = validateState(username, setUserName, regexForNotEmpty);
    if (errEmail || errUsername) return;
    forgetPasswordAPI(username.value, email.value)
      .then((req) => {
        return req.data;
      })
      .then((response) => {
        if (response.status === 0) {
          setOpen(false);
          dispatch(changeNotice({ message: "New password was sent into your mail", open: true, type: "success" }));
        } else {
          dispatch(changeNotice({ message: response.error, open: true, type: "error" }));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(changeNotice({ message: err.message, open: true, type: "error" }));
      });
  };

  return (
    <>
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
              Forget Password
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={email.isError}
                    helperText={email.isError ? email.message : ""}
                    required
                    fullWidth
                    label="Email Address"
                    value={email.value}
                    onChange={(event) => handleChangeState(email, setEmail, event.target.value, regexForEmail)}
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
              </Grid>
              <Button type="submit" fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 5, mb: 5 }}>
                Send
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
