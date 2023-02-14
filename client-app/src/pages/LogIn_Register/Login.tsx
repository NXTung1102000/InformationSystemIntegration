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
interface openLogIn {
  openLogin: boolean;
  setOpenLogin: (open: boolean) => void;
}

export default function LogIn({ openLogin, setOpenLogin }: openLogIn) {
  const dispatch = useAppDispatch();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);

  const [openRegister, setOpenRegister] = React.useState(false);
  const [openForgetPW, setOpenForgetPW] = React.useState(false);

  const validateUsername = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate username
    setUsername(event.target.value);
  };

  const validatePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // validate password
    setPassword(event.target.value);
  };

  const handleRemember = (event: React.ChangeEvent<HTMLInputElement>) => {
    // validate password
    setRemember(event.target.checked);
  };

  const handleSubmit = async () => {
    const credentials = { username, password };
    loginAPI(credentials)
      .then((req) => {
        return req.data;
      })
      .then((response) => {
        if (response.status === 0) {
          const user = { token: response.data.token };
          dispatch(LogInUser(user));
          setOpenLogin(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Register openRegister={openRegister} setOpenRegister={setOpenRegister} />
      <ForgetPW openForgetPW={openForgetPW} setOpenForgetPW={setOpenForgetPW} />
      <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
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
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(event) => validateUsername(event)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => validatePassword(event)}
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
