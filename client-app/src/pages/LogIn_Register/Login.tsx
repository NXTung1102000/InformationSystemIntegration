import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Register from "./Register";
import ForgetPW from "./ForgetPW";
import { FormControlLabel } from "@mui/material";
import { loginAPI } from "../../api/auth";
import { useAppDispatch } from "../../app/hooks";
import { LogInUser } from "./AuthSlice";
import { changeNotice } from "../../component/LoadingAndNotice/noticeSlice";
import { handleChangeState, IState, messageOfFieldIsNotEmpty, validateState } from "../../constant/validate/message";
import { regexForNotEmpty } from "../../constant/validate/regex";
interface IOpenDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function LogIn({ open, setOpen }: IOpenDialog) {
  const dispatch = useAppDispatch();
  const [username, setUserName] = React.useState<IState>({
    value: "",
    isError: false,
    message: messageOfFieldIsNotEmpty("Username"),
  });
  const [password, setPassword] = React.useState<IState>({
    value: "",
    isError: false,
    message: messageOfFieldIsNotEmpty("Password"),
  });
  const [remember, setRemember] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [openRegister, setOpenRegister] = React.useState(false);
  const [openForgetPW, setOpenForgetPW] = React.useState(false);

  const handleRemember = (event: React.ChangeEvent<HTMLInputElement>) => {
    // validate password
    setRemember(event.target.checked);
  };

  const resetState = () => {
    setUserName({ ...username, value: "", isError: false });
    setPassword({ ...password, value: "", isError: false });
    setIsSubmitted(false);
  };

  const handleSubmit = async () => {
    if (!isSubmitted) setIsSubmitted(true);
    const errUsername = validateState(username, setUserName, regexForNotEmpty);
    const errPW = validateState(password, setPassword, regexForNotEmpty);
    if (errUsername || errPW) return;
    const credentials = { username: username.value, password: password.value };
    loginAPI(credentials)
      .then((req) => {
        return req.data;
      })
      .then((response) => {
        if (response.status === 0) {
          const user = response.data;
          dispatch(LogInUser(user));
          setOpen(false);
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
      <Register open={openRegister} setOpen={setOpenRegister} />
      <ForgetPW open={openForgetPW} setOpen={setOpenForgetPW} />
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
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                error={username.isError}
                helperText={username.isError ? username.message : ""}
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoFocus
                value={username.value}
                onChange={(event) => handleChangeState(username, setUserName, event.target.value, regexForNotEmpty)}
              />
              <TextField
                error={password.isError}
                helperText={password.isError ? password.message : ""}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password.value}
                onChange={(event) => handleChangeState(password, setPassword, event.target.value, regexForNotEmpty)}
              />
              <FormControlLabel
                control={<Checkbox value={remember} color="primary" onChange={handleRemember} />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={() => setOpenForgetPW(true)}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={() => setOpenRegister(true)}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
